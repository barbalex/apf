/**
 * Note: we are using singleton to make sure that it's one instance only,
 * because the store can be used outside react components, eg. routes.js
 * from: http://stackoverflow.com/questions/35850871/how-to-connect-state-to-props-with-mobx-js-observer-when-use-es6-class/36164488#36164488
 */
/* eslint-disable no-console, no-param-reassign */

import { action, autorun, autorunAsync, computed, observable } from 'mobx'
import singleton from 'singleton'
import clone from 'lodash/clone'
import queryString from 'query-string'
import Dexie from 'dexie'

import fetchTableModule from '../modules/fetchTable'
import fetchBeobzuordnungModule from '../modules/fetchBeobzuordnung'
import fetchTableByParentId from '../modules/fetchTableByParentId'
import fetchTpopForAp from '../modules/fetchTpopForAp'
import fetchDatasetById from '../modules/fetchDatasetById'
import fetchBeobBereitgestellt from '../modules/fetchBeobBereitgestellt'
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
import insertDataset from '../modules/insertDataset'
import deleteDatasetDemand from '../modules/deleteDatasetDemand'
import deleteDatasetExecute from '../modules/deleteDatasetExecute'
import toggleNode from '../modules/toggleNode'

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
  fetchFields = () =>
    fetchFields(this)

  @action
  updateLabelFilter = (table, value) => {
    if (!table) return console.log(`nodeLabelFilter cant be updated: no table passed`)
    this.node.nodeLabelFilter.set(table, value)
  }

  @action
  insertDataset = (table, parentId, baseUrl) =>
    insertDataset(this, table, parentId, baseUrl)

  @action
  deleteDatasetDemand = (table, id, url, label) =>
    deleteDatasetDemand(this, table, id, url, label)

  @action
  deleteDatasetAbort = () => {
    this.datasetToDelete = {}
  }

  @action
  deleteDatasetExecute = () => deleteDatasetExecute(this)

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
  toggleNode = node => toggleNode(this, node)

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
