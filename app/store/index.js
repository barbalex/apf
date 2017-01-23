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

const Store = {
  history: ObservableHistory,
  node: {
    loadingAllNodes: observable(false),
    nodeLabelFilter: observable.map({}),
    nrOfRowsAboveActiveNode: observable(0),
  },
  ui: {
    windowWidth: observable($(window).width()),
    windowHeight: observable($(window).height()),
    treeHeight: observable(0),
    lastClickY: observable(0),
    treeTopPosition: observable(0),
  },
  app: {
    errors: observable([]),
    // TODO: get user else
    user: observable(`z`),
    fields: observable([]),
    fieldsLoading: observable(true),
    map: observable(null),
  },
  table: TableStore,
  valuesForWhichTableDataWasFetched: {},
  datasetToDelete: observable({}),
  activeUrlElements: observable({}),
}

extendObservable(
  Store,
  {
    fetchFields: action(() =>
      fetchFields(Store)
    ),
    updateLabelFilter: action((table, value) => {
      if (!table) {
        return Store.listError(
          new Error(`nodeLabelFilter cant be updated: no table passed`)
        )
      }
      Store.node.nodeLabelFilter.set(table, value)
    }),
    insertDataset: action((table, parentId, baseUrl) =>
      insertDataset(Store, table, parentId, baseUrl)
    ),
    deleteDatasetDemand: action((table, id, url, label) =>
      deleteDatasetDemand(Store, table, id, url, label)
    ),
    deleteDatasetAbort: action(() => {
      Store.datasetToDelete = {}
    }),
    deleteDatasetExecute: action(() =>
      deleteDatasetExecute(Store)
    ),
    listError: action(error =>
      listError(Store, error)
    ),
    // updates data in store
    updateProperty: action((key, value) =>
      updateProperty(Store, key, value)
    ),
    // updates data in database
    updatePropertyInDb: action((key, value) =>
      updatePropertyInDb(Store, key, value)
    ),
    // fetch all data of a table
    // primarily used for werte (domain) tables
    // and projekt
    fetchTable: action((schemaName, tableName) =>
      fetchTable(Store, schemaName, tableName)
    ),
    fetchBeobzuordnung: action(apArtId =>
      fetchBeobzuordnungModule(Store, apArtId)
    ),
    // fetch data of table for id of parent table
    // used for actual apflora data (but projekt)
    fetchTableByParentId: action((schemaName, tableName, parentId) =>
      fetchTableByParentId(Store, schemaName, tableName, parentId)
    ),
    fetchTpopForAp: action(apArtId =>
      fetchTpopForAp(Store, apArtId)
    ),
    fetchDatasetById: action(({ schemaName, tableName, id }) =>
      fetchDatasetById({ store: Store, schemaName, tableName, id })
    ),
    fetchBeobBereitgestellt: action(apArtId =>
      fetchBeobBereitgestellt(Store, apArtId)
    ),
    // action when user clicks on a node in the tree
    toggleNode: action(node =>
      toggleNode(Store, node)
    ),
    /**
     * urlQueries are used to control tabs
     * for instance: Entwicklung or Biotop in tpopfeldkontr
     * or: strukturbaum, daten and karte in projekte
     */
    setUrlQuery: action((key, value) =>
      setUrlQuery(Store, key, value)
    ),
    /**
     * url paths are used to control tree and forms
     */
    url: computed(() =>
      getUrl(Store.history.location.pathname)
    ),
    /**
     * urlQueries are used to control tabs
     * for instance: Entwicklung or Biotop in tpopfeldkontr
     */
    urlQuery: computed(() =>
      getUrlQuery(Store.history.location.search)
    ),
    projektNodes: computed(() =>
      buildProjektNodes(Store)
    ),
    activeDataset: computed(() =>
      updateActiveDatasetFromUrl(Store)
    ),
    activeUrlElements: computed(() =>
      getActiveUrlElements(Store.url)
    ),
  }
)

// don't know why but combining this with last extend call
// creates an error in an autorun
// well, probably because needed actions are not part of Store yet
extendObservable(
  Store,
  {
    manipulateUrl: autorun(
      `manipulateUrl`,
      () => manipulateUrl(Store)
    ),
    reactWhenUrlHasChanged: autorunAsync(
      `reactWhenUrlHasChanged`,
      () => {
        fetchDataForActiveUrlElements(Store)
      }
    ),
  }
)

export default Store
