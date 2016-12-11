/**
 * Note: we are using singleton to make sure that it's one instance only,
 * because the store can be used outside react components, eg. routes.js
 * from: http://stackoverflow.com/questions/35850871/how-to-connect-state-to-props-with-mobx-js-observer-when-use-es6-class/36164488#36164488
 */
/* eslint-disable no-console, no-param-reassign */

import { action, autorun, transaction, computed, observable } from 'mobx'
import singleton from 'singleton'
import axios from 'axios'
import objectValues from 'lodash/values'
import clone from 'lodash/clone'
import isEqual from 'lodash/isEqual'
import isString from 'lodash/isString'
import createHistory from 'history/createBrowserHistory'
import queryString from 'query-string'

import fetchTableModule from '../modules/fetchTable'
import fetchTableByParentId from '../modules/fetchTableByParentId'
// import getNodeByPath from '../modules/getNodeByPath'
import apiBaseUrl from '../modules/apiBaseUrl'
// import fetchDataset from '../modules/fetchDataset'
import tables from '../modules/tables'
// import countRowsAboveActiveNode from '../modules/countRowsAboveActiveNode'
import getActiveDatasetFromUrl from '../modules/getActiveDatasetFromUrl'
import getActiveUrlElements from '../modules/getActiveUrlElements'
import fetchDataForActiveUrlElements from '../modules/fetchDataForActiveUrlElements'

import buildRootNodes from '../modules/nodes/root'
import buildApberuebersichtNodes from '../modules/nodes/apberuebersicht'
import buildProjektNodes from '../modules/nodes/projekt'
import buildApNodes from '../modules/nodes/ap'

import NodeStore from './node'
import UiStore from './ui'
import AppStore from './app'
import TableStore from './table'

class Store extends singleton {
  constructor() {
    super()
    this.fetchFields = this.fetchFields.bind(this)
    this.updateProperty = this.updateProperty.bind(this)
    this.updatePropertyInDb = this.updatePropertyInDb.bind(this)
    this.fetchTable = this.fetchTable.bind(this)
    this.toggleNode = this.toggleNode.bind(this)
  }

  @observable history = createHistory()
  node = NodeStore
  ui = UiStore
  app = AppStore
  table = TableStore

  /**
   * url paths are used to control tree and forms
   */
  @computed get url() {
    const pathNamePassed = this.history.location.pathname
    const pathName = pathNamePassed.replace(`/`, ``)
    const pathElements = pathName.split(`/`)
    if (pathElements[0] === ``) {
      // get rid of empty element(s) at start
      pathElements.shift()
    }
    // convert numbers to numbers
    // http://stackoverflow.com/questions/175739/is-there-a-built-in-way-in-javascript-to-check-if-a-string-is-a-valid-number
    pathElements.forEach((e, index) => {
      if (!isNaN(e)) {
        pathElements[index] = +e
      }
    })
    return pathElements
  }

  /**
   * urlQueries are used to control tabs
   * for instance: Entwicklung or Biotop in tpopfeldkontr
   */
  @computed get urlQuery() {
    const urlQuery = queryString.parse(this.history.location.search)
    /**
     * arrays are converted to strings in url if only one element is contained
     * need to convert it to array
     */
    if (urlQuery.projekteTabs && isString(urlQuery.projekteTabs)) {
      urlQuery.projekteTabs = [urlQuery.projekteTabs]
    }
    return urlQuery
  }

  manipulateUrl = autorun(
    `manipulateUrl`,
    () => {
      const url = clone(this.url)
      // forward apflora.ch to Projekte
      if (url.length === 0) {
        url.push(`Projekte`)
      }

      // if new store set projekte tabs
      const urlQuery = clone(this.urlQuery)
      if ((url.length === 0 || url[0] === `Projekte`) && !urlQuery.projekteTabs) {
        urlQuery.projekteTabs = [`strukturbaum`, `daten`]
      }
      const search = queryString.stringify(urlQuery)
      if (!isEqual(url, this.url) || !isEqual(urlQuery, this.urlQuery)) {
        this.history.push(`/${url.join(`/`)}${Object.keys(urlQuery).length > 0 ? `?${search}` : ``}`)
      }
    }
  )

  updateActiveUrlElements = autorun(
    `updateActiveUrlElements`,
    () => {
      this.activeUrlElements = getActiveUrlElements(this.url)
    }
  )

  @observable activeUrlElements
  @observable previousActiveUrlElements

  // make sure all data needed for this url is fetched
  updateData = autorun(
    `updateData`,
    () => fetchDataForActiveUrlElements(this)
  )

  @action
  fetchFields = () => {
      // only fetch if not yet done
    if (this.app.fields.length === 0 && !this.app.fieldsLoading) {
      this.app.fieldsLoading = true
      axios.get(`${apiBaseUrl}/felder`)
        .then(({ data }) => {
          transaction(() => {
            this.app.fields = data
            this.app.fieldsLoading = false
          })
        })
        .catch(error => console.log(`error fetching fields:`, error))
    }
  }

  @action
  updateLabelFilter = (table, value) => {
    if (!table) return console.log(`nodeLabelFilter cant be updated: no table passed`)
    this.node.nodeLabelFilter.set(table, value)
  }

  // updates data in store
  @action
  updateProperty = (key, valuePassed) => {
    const { table, row } = this.activeDataset
    let value = valuePassed
    // ensure primary data exists
    if (!key || !table || !row) {
      return console.log(`change was not saved: field: ${key}, table: ${table}, value: ${value}`)
    }
    // ensure numbers saved as numbers
    if (value && !isNaN(value)) {
      value = +value
    }
    row[key] = value
  }

  // updates data in database
  @action
  updatePropertyInDb = (key, valuePassed) => {
    const { row, valid } = this.activeDataset
    const tablePassed = this.activeDataset.table
    let value = valuePassed
    let table = tablePassed

    // ensure primary data exists
    if (!key || !table || !row) {
      return
    }

    // ensure numbers saved as numbers
    if (value && !isNaN(value)) {
      value = +value
    }

    // ensure derived data exists
    const tabelle = tables.find(t =>
      t.table === table
    )
    // in tpopfeldkontr and tpopfreiwkontr need to find dbTable
    if (tabelle.dbTable) {
      table = tabelle.dbTable
    }
    const idField = tabelle ? tabelle.idField : undefined
    if (!idField) {
      return console.log(`change was not saved: field: ${key}, table: ${table}, value: ${value}`)
    }
    const tabelleId = row[idField] || undefined
    if (!tabelleId) {
      return console.log(`change was not saved: field: ${key}, table: ${table}, value: ${value}`)
    }

    // some fields contain 1 for true, 0 for false
    // not necessary: done by RadioButton component
    /*
    const booleanFields = [`TPopKontrJungPflJN`, `TPopKontrPlan`]
    if (booleanFields.includes(key)) {
      value = value === 1
    }*/

    // update if no validation messages exist
    const combinedValidationMessages = objectValues(valid).join(``)
    if (combinedValidationMessages.length === 0) {
      const { user } = this.app
      const oldValue = row[key]
      row[key] = value
      axios.put(`${apiBaseUrl}/update/apflora/tabelle=${table}/tabelleIdFeld=${idField}/tabelleId=${tabelleId}/feld=${key}/wert=${value}/user=${user}`)
        .catch((error) => {
          row[key] = oldValue
          this.app.errors.unshift(error)
          setTimeout(() => {
            this.app.errors.pop()
          }, 1000 * 10)
          console.log(`change was not saved: field: ${key}, table: ${table}, value: ${value}`)
        })
    }
  }

  // fetch all data of a table
  // primarily used for werte (domain) tables
  @action
  fetchTable = (schemaName, tableName) =>
    fetchTableModule(this, schemaName, tableName)

  // fetch data of table for id of parent table
  // used for actual apflora data
  @action
  fetchTableByParentId = (schemaName, tableName, parentId) =>
    fetchTableByParentId(this, schemaName, tableName, parentId)

  // action when user clicks on a node in the tree
  @action
  toggleNode = (node) => {
    if (node) {
      const newUrl = node.url
      if (node.expanded) {
        newUrl.pop()
      }
      this.history.push(`/${newUrl.join(`/`)}`)
      node.expanded = !node.expanded
    }
  }

  /**
   * urlQueries are used to control tabs
   * for instance: Entwicklung or Biotop in tpopfeldkontr
   * or: strukturbaum, daten and karte in projekte
   */
  @action
  setUrlQuery = (key, value) => {
    const urlQuery = clone(this.urlQuery)
    if (!value && value !== 0) {
      delete urlQuery[key]
    } else {
      urlQuery[key] = value
    }
    const search = queryString.stringify(urlQuery)
    this.history.push(`/${this.url.join(`/`)}${Object.keys(urlQuery).length > 0 ? `?${search}` : ``}`)
  }

  @observable activeNode
  @observable activeDataset
  updateActiveDataset = autorun(
    `updateActiveDataset`,
    () => {
      const { activeDataset, activeNode } = getActiveDatasetFromUrl(this)
      this.activeDataset = activeDataset
      this.activeNode = activeNode
    }
  )

  @computed get projektNodes() {
    return buildProjektNodes(this)
  }

  // TODO: make these called from higher level nodes?
  // drawback: harder to find active node of level
  // watch zieljahre, that was where computed did not work
  @computed get apberuebersichtNodes() {
    return buildApberuebersichtNodes(this)
  }

  @computed get apNodes() {
    return buildApNodes(this)
  }
}

export default Store.get()
