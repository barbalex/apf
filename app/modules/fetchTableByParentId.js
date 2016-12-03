import { transaction } from 'mobx'
import axios from 'axios'
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

  const idField = tables.find(t => t.table === tableName).idField
  const parentIdField = tables.find(t => t.table === tableName).parentIdField
  store.table[`${tableName}Loading`] = true
  const url = `${apiBaseUrl}/schema/${schemaName}/table/${tableName}/field/${parentIdField}/value/${parentId}`
  return axios.get(url)
    .then(({ data }) => {
      transaction(() => {
        data.forEach(d =>
          store.table[`${tableName}`].set(d[idField], d)
        )
      })
    })
    .catch(error => new Error(`error fetching data for table ${tableName}:`, error))
}
