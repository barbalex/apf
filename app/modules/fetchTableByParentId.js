import { transaction } from 'mobx'
import axios from 'axios'
import localforage from 'localforage'
import forEach from 'lodash/forEach'
import apiBaseUrl from './apiBaseUrl'
import tables from './tables'

export default (store, schemaNamePassed, tableName, parentId) => {
  if (!tableName) {
    return new Error(`action fetchTableByParentId: tableName must be passed`)
  }
  if (!parentId) {
    return new Error(`action fetchTableByParentId: parentId must be passed`)
  }
  const schemaName = schemaNamePassed || `apflora`

  // only fetch if not yet fetched
  const parentTableTable = tables.find(t => t.table === tableName)
  const parentTable = parentTableTable ? parentTableTable.parentTable : null
  if (
    parentTable &&
    store.previousActiveUrlElements &&
    store.previousActiveUrlElements[parentTable] &&
    store.previousActiveUrlElements[parentTable] === parentId
  ) {
    return
  }
  const dataFromIdb = localforage.getItem(tableName)
    .then((map) => {
      // set map from idb
      const isValue = map && Object.keys(map).length > 0
      if (isValue) {
        // console.log(`fetchTableByParentId: setting table ${tableName} from idb before fetching from server`)
        forEach(map, (value, key) => {
          const mapInStore = store.table[tableName]
          if (!mapInStore.get(key)) {
            mapInStore.set(key, value)
          }
        })
      }
    })
    .catch(error => new Error(`error fetching data for table ${tableName} from idb:`, error))

  const idField = tables.find(t => t.table === tableName).idField
  const parentIdField = tables.find(t => t.table === tableName).parentIdField
  const url = `${apiBaseUrl}/schema/${schemaName}/table/${tableName}/field/${parentIdField}/value/${parentId}`
  const dataFromServer = axios.get(url)
    .then(({ data }) => {
      transaction(() => {
        data.forEach(d =>
          store.table[tableName].set(d[idField], d)
        )
      })
    })
    .catch(error => new Error(`error fetching data for table ${tableName} from server:`, error))

  return Promise.all([dataFromIdb, dataFromServer])
}
