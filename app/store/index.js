/* eslint-disable no-console, no-param-reassign */

import { extendObservable, action, autorun, autorunAsync, computed, observable } from 'mobx'
import $ from 'jquery'

import fetchTable from '../modules/fetchTable'
import fetchBeobzuordnungModule from '../modules/fetchBeobzuordnung'
import fetchTableByParentId from '../modules/fetchTableByParentId'
import fetchTpopForAp from '../modules/fetchTpopForAp'
import fetchDatasetById from '../modules/fetchDatasetById'
import fetchBeobBereitgestellt from '../modules/fetchBeobBereitgestellt'
import updateActiveDatasetFromUrl from '../modules/updateActiveDatasetFromUrl'
import getActiveUrlElements from '../modules/getActiveUrlElements'
import fetchDataForActiveUrlElements from '../modules/fetchDataForActiveUrlElements'
import buildProjektNodes from '../modules/nodes/projekt'
import updateProperty from '../modules/updateProperty'
import updatePropertyInDb from '../modules/updatePropertyInDb'
import manipulateUrl from '../modules/manipulateUrl'
import getUrl from '../modules/getUrl'
import getUrlQuery from '../modules/getUrlQuery'
import fetchFields from '../modules/fetchFields'
import insertDataset from '../modules/insertDataset'
import deleteDatasetDemand from '../modules/deleteDatasetDemand'
import deleteDatasetExecute from '../modules/deleteDatasetExecute'
import toggleNode from '../modules/toggleNode'
import listError from '../modules/listError'
import setUrlQuery from '../modules/setUrlQuery'

import TableStore from './table'
import ObservableHistory from './ObservableHistory'

function Store() {
  this.history = ObservableHistory
  this.node = {
    loadingAllNodes: observable(false),
    nodeLabelFilter: observable.map({}),
    nrOfRowsAboveActiveNode: observable(0),
  }
  this.ui = {
    windowWidth: observable($(window).width()),
    windowHeight: observable($(window).height()),
    treeHeight: observable(0),
    lastClickY: observable(0),
    treeTopPosition: observable(0),
  }
  this.app = {
    errors: observable([]),
    // TODO: get user else
    user: observable(`z`),
    fields: observable([]),
    fieldsLoading: observable(true),
    map: observable(null),
  }
  this.table = TableStore
  this.valuesForWhichTableDataWasFetched = {}
  extendObservable(this, {
    datasetToDelete: {},
    fetchFields: action(() =>
      fetchFields(MyStore)
    ),
    updateLabelFilter: action((table, value) => {
      if (!table) {
        return MyStore.listError(
          new Error(`nodeLabelFilter cant be updated: no table passed`)
        )
      }
      MyStore.node.nodeLabelFilter.set(table, value)
    }),
    insertDataset: action((table, parentId, baseUrl) =>
      insertDataset(MyStore, table, parentId, baseUrl)
    ),
    deleteDatasetDemand: action((table, id, url, label) =>
      deleteDatasetDemand(MyStore, table, id, url, label)
    ),
    deleteDatasetAbort: action(() => {
      MyStore.datasetToDelete = {}
    }),
    deleteDatasetExecute: action(() =>
      deleteDatasetExecute(MyStore)
    ),
    listError: action(error =>
      listError(MyStore, error)
    ),
    // updates data in store
    updateProperty: action((key, value) =>
      updateProperty(MyStore, key, value)
    ),
    // updates data in database
    updatePropertyInDb: action((key, value) =>
      updatePropertyInDb(MyStore, key, value)
    ),
    // fetch all data of a table
    // primarily used for werte (domain) tables
    // and projekt
    fetchTable: action((schemaName, tableName) =>
      fetchTable(MyStore, schemaName, tableName)
    ),
    fetchBeobzuordnung: action(apArtId =>
      fetchBeobzuordnungModule(MyStore, apArtId)
    ),
    // fetch data of table for id of parent table
    // used for actual apflora data (but projekt)
    fetchTableByParentId: action((schemaName, tableName, parentId) =>
      fetchTableByParentId(MyStore, schemaName, tableName, parentId)
    ),
    fetchTpopForAp: action(apArtId =>
      fetchTpopForAp(MyStore, apArtId)
    ),
    fetchDatasetById: action(({ schemaName, tableName, id }) =>
      fetchDatasetById({ store: MyStore, schemaName, tableName, id })
    ),
    fetchBeobBereitgestellt: action(apArtId =>
      fetchBeobBereitgestellt(MyStore, apArtId)
    ),
    // action when user clicks on a node in the tree
    toggleNode: action(node =>
      toggleNode(MyStore, node)
    ),
    /**
     * urlQueries are used to control tabs
     * for instance: Entwicklung or Biotop in tpopfeldkontr
     * or: strukturbaum, daten and karte in projekte
     */
    setUrlQuery: action((key, value) =>
      setUrlQuery(MyStore, key, value)
    ),
    /**
     * url paths are used to control tree and forms
     */
    url: computed(() =>
      getUrl(MyStore.history.location.pathname)
    ),
    /**
     * urlQueries are used to control tabs
     * for instance: Entwicklung or Biotop in tpopfeldkontr
     */
    urlQuery: computed(() =>
      getUrlQuery(MyStore.history.location.search)
    ),
    projektNodes: computed(() =>
      buildProjektNodes(MyStore)
    ),
    activeDataset: computed(() =>
      updateActiveDatasetFromUrl(MyStore)
    ),
    activeUrlElements: computed(() =>
      getActiveUrlElements(MyStore.url)
    ),
  })
}

const MyStore = new Store()

// don't know why but combining this with last extend call
// creates an error in an autorun
// maybe needed actions are not part of Store yet?
extendObservable(
  MyStore,
  {
    manipulateUrl: autorun(
      `manipulateUrl`,
      () => manipulateUrl(MyStore)
    ),
    reactWhenUrlHasChanged: autorunAsync(
      `reactWhenUrlHasChanged`,
      () => {
        fetchDataForActiveUrlElements(MyStore)
      }
    ),
  }
)

export default MyStore
