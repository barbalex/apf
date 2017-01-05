/**
 * Note: we are using singleton to make sure that it's one instance only,
 * because the store can be used outside react components, eg. routes.js
 * from: http://stackoverflow.com/questions/35850871/how-to-connect-state-to-props-with-mobx-js-observer-when-use-es6-class/36164488#36164488
 */
/* eslint-disable no-console, no-param-reassign */

import { action, autorun, autorunAsync, computed, observable } from 'mobx'
import singleton from 'singleton'
import axios from 'axios'
import clone from 'lodash/clone'
import queryString from 'query-string'
import Dexie from 'dexie'

import fetchTableModule from '../modules/fetchTable'
import fetchBeobzuordnungModule from '../modules/fetchBeobzuordnung'
import fetchTableByParentId from '../modules/fetchTableByParentId'
import fetchTpopForAp from '../modules/fetchTpopForAp'
import fetchDatasetById from '../modules/fetchDatasetById'
import fetchBeobBereitgestellt from '../modules/fetchBeobBereitgestellt'
// import getNodeByPath from '../modules/getNodeByPath'
import apiBaseUrl from '../modules/apiBaseUrl'
// import fetchDataset from '../modules/fetchDataset'
import tables from '../modules/tables'
// import countRowsAboveActiveNode from '../modules/countRowsAboveActiveNode'
import getActiveDatasetFromUrl from '../modules/getActiveDatasetFromUrl'
import getActiveUrlElements from '../modules/getActiveUrlElements'
import fetchDataForActiveUrlElements from '../modules/fetchDataForActiveUrlElements'
import buildProjektNodes from '../modules/nodes/projekt'
import updateProperty from '../modules/updateProperty'
import updatePropertyInDb from '../modules/updatePropertyInDb'
import manipulateUrl from '../modules/manipulateUrl'
import writeTableStateToIndexdDb from '../modules/writeTableStateToIndexdDb'
import initializeTableStateFromIdb from '../modules/initializeTableStateFromIdb'
import initializeDb from '../modules/initializeDb'
import getUrl from '../modules/getUrl'
import getUrlQuery from '../modules/getUrlQuery'
import fetchFields from '../modules/fetchFields'

import NodeStore from './node'
import UiStore from './ui'
import AppStore from './app'
import TableStore from './table'
import ObservableHistory from './ObservableHistory'

class Store extends singleton {
  constructor() {
    super()
    this.db = new Dexie(`apflora`)
    initializeDb(this.db)
    // initializeTableStateFromIdb(this)
    this.fetchFields = this.fetchFields.bind(this)
    this.updateProperty = this.updateProperty.bind(this)
    this.updatePropertyInDb = this.updatePropertyInDb.bind(this)
    this.fetchTable = this.fetchTable.bind(this)
    this.toggleNode = this.toggleNode.bind(this)
    this.insertDataset = this.insertDataset.bind(this)
    this.deleteDatasetDemand = this.deleteDatasetDemand.bind(this)
    this.deleteDatasetAbort = this.deleteDatasetAbort.bind(this)
    this.deleteDatasetExecute = this.deleteDatasetExecute.bind(this)
  }

  db
  history = ObservableHistory
  node = NodeStore
  ui = UiStore
  app = AppStore
  table = TableStore
  @observable datasetToDelete = {}

  /**
   * url paths are used to control tree and forms
   */
  @computed get url() {
    return getUrl(this)
  }

  /**
   * urlQueries are used to control tabs
   * for instance: Entwicklung or Biotop in tpopfeldkontr
   */
  @computed get urlQuery() {
    return getUrlQuery(this)
  }

  saveState = autorunAsync(
    `saveTableState`,
    () => {
      // save table store
      writeTableStateToIndexdDb(this)
    },
    1000
  )

  manipulateUrl = autorun(
    `manipulateUrl`,
    () => manipulateUrl(this)
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
  fetchFields = () => fetchFields(this)

  @action
  updateLabelFilter = (table, value) => {
    if (!table) return console.log(`nodeLabelFilter cant be updated: no table passed`)
    this.node.nodeLabelFilter.set(table, value)
  }

  @action
  insertDataset = (tablePassed, parentId, baseUrl) => {
    let table = tablePassed
    if (!table) {
      return console.log(`Error in action insertDataset: no table passed`)
    }
    // insert new dataset in db and fetch id
    const tableMetadata = tables.find(t => t.table === table)
    if (!tableMetadata) {
      return console.log(`Error in action insertDataset: no table meta data found for table "${table}"`)
    }
    // some tables need to be translated, i.e. tpopfreiwkontr
    if (tableMetadata.dbTable) {
      table = tableMetadata.dbTable
    }
    const parentIdField = tableMetadata.parentIdField
    const idField = tableMetadata.idField
    if (!idField) {
      return console.log(`new dataset not created as no idField could be found`)
    }
    axios.post(`${apiBaseUrl}/apflora/${table}/${parentIdField}/${parentId}`)
      .then((result) => {
        const row = result.data
        // insert this dataset in store.table
        this.table[table].set(row[idField], row)
        // set new url
        baseUrl.push(row[idField])
        this.history.push(`/${baseUrl.join(`/`)}${Object.keys(this.urlQuery).length > 0 ? `?${queryString.stringify(this.urlQuery)}` : ``}`)
        // if zieljahr, need to update ZielJahr
        if (this.activeUrlElements.zieljahr) {
          this.updateProperty(`ZielJahr`, this.activeUrlElements.zieljahr)
          this.updatePropertyInDb(`ZielJahr`, this.activeUrlElements.zieljahr)
        }
        // if tpopfreiwkontr need to update TPopKontrTyp
        if (tablePassed === `tpopfreiwkontr`) {
          this.updateProperty(`TPopKontrTyp`, `Freiwilligen-Erfolgskontrolle`)
          this.updatePropertyInDb(`TPopKontrTyp`, `Freiwilligen-Erfolgskontrolle`)
        }
      })
      .catch(error => this.listError(error))
  }

  @action
  deleteDatasetDemand = (table, id, url, label) => {
    if (!table) {
      return console.log(`Error in action deleteDatasetDemand: no table passed`)
    }
    const tableMetadata = tables.find(t => t.table === table)
    if (!tableMetadata) {
      return console.log(`Error in action deleteDatasetDemand: no table meta data found for table "${table}"`)
    }
    const idField = tableMetadata.idField
    if (!idField) {
      return console.log(`dataset vsmz nr deleted as no idField could be found`)
    }
    this.datasetToDelete = { table, id, idField, url, label }
  }

  @action
  deleteDatasetAbort = () => {
    this.datasetToDelete = {}
  }

  @action
  deleteDatasetExecute = () => {
    // deleteDatasetDemand checks variables
    const { table: tablePassed, id, idField, url } = this.datasetToDelete
    let table = tablePassed
    const tableMetadata = tables.find(t => t.table === table)
    if (!tableMetadata) {
      return console.log(`Error in action deleteDatasetDemand: no table meta data found for table "${table}"`)
    }
    // some tables need to be translated, i.e. tpopfreiwkontr
    if (tableMetadata.dbTable) {
      table = tableMetadata.dbTable
    }
    axios.delete(`${apiBaseUrl}/apflora/tabelle=${table}/tabelleIdFeld=${idField}/tabelleId=${id}`)
      .then(() => {
        // remove this dataset in store.table
        this.table[table].delete(id)
        // set new url
        url.pop()
        this.history.push(`/${url.join(`/`)}${Object.keys(this.urlQuery).length > 0 ? `?${queryString.stringify(this.urlQuery)}` : ``}`)
        this.datasetToDelete = {}
        // if zieljahr is active, need to pop again, if there is no other ziel left in same year
        if (this.activeUrlElements.zieljahr && !this.activeUrlElements.zielber) {
          // see if there are ziele left with this zieljahr
          const zieleWithActiveZieljahr = Array.from(this.table.ziel.values())
            .filter(ziel =>
              ziel.ApArtId === this.activeUrlElements.ap && ziel.ZielJahr === this.activeUrlElements.zieljahr
            )
          if (zieleWithActiveZieljahr.length === 0) {
            url.pop()
            this.history.push(`/${url.join(`/`)}${Object.keys(this.urlQuery).length > 0 ? `?${queryString.stringify(this.urlQuery)}` : ``}`)
          }
        }
      })
      .catch((error) => {
        this.listError(error)
        this.datasetToDelete = {}
      })
  }

  @action
  listError = (error) => {
    this.app.errors.unshift(error)
    setTimeout(() => {
      this.app.errors.pop()
    }, 1000 * 10)
    console.log(`Error:`, error)
  }

  // updates data in store
  @action
  updateProperty = (key, value) =>
    updateProperty(this, key, value)

  // updates data in database
  @action
  updatePropertyInDb = (key, value) =>
    updatePropertyInDb(this, key, value)

  // fetch all data of a table
  // primarily used for werte (domain) tables
  // and projekt
  @action
  fetchTable = (schemaName, tableName) =>
    fetchTableModule(this, schemaName, tableName)

  @action
  fetchBeobzuordnung = apArtId =>
    fetchBeobzuordnungModule(this, apArtId)

  // fetch data of table for id of parent table
  // used for actual apflora data (but projekt)
  @action
  fetchTableByParentId = (schemaName, tableName, parentId) =>
    fetchTableByParentId(this, schemaName, tableName, parentId)

  @action
  fetchTpopForAp = apArtId =>
    fetchTpopForAp(this, apArtId)

  @action
  fetchDatasetById = ({ schemaName, tableName, id }) =>
    fetchDatasetById({ store: this, schemaName, tableName, id })

  @action
  fetchBeobBereitgestellt = apArtId =>
    fetchBeobBereitgestellt(this, apArtId)

  // action when user clicks on a node in the tree
  @action
  toggleNode = (node) => {
    if (node) {
      const newUrl = node.url
      if (node.expanded) {
        newUrl.pop()
      }
      this.history.push(`/${newUrl.join(`/`)}${Object.keys(this.urlQuery).length > 0 ? `?${queryString.stringify(this.urlQuery)}` : ``}`)
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

  @observable activeDataset
  updateActiveDataset = autorun(
    `updateActiveDataset`,
    () => {
      this.activeDataset = getActiveDatasetFromUrl(this)
    }
  )

  @computed get projektNodes() {
    return buildProjektNodes(this)
  }
}

export default Store.get()
