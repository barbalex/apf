import { transaction } from 'mobx'
import axios from 'axios'
import app from 'ampersand-app'

import apiBaseUrl from './apiBaseUrl'
import tables from './tables'

const writeToStore = (store, data, tableName, idField) => {
  transaction(() => {
    data.forEach(d =>
      store.table[tableName].set(d[idField], d)
    )
  })
  store.table[`${tableName}Loading`] = false
}

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
  const url = `${apiBaseUrl}/schema/${schemaName}/table/${tableName}/field/${parentIdField}/value/${parentId}`
  store.table[`${tableName}Loading`] = true

  app.db[tableName]
    .toArray()
    .then((data) => {
      if (data.length > 0) {
        writeToStore(store, data, tableName, idField)
      }
    })
    .then(() => axios.get(url))
    .then(({ data }) => {
      writeToStore(store, data, tableName, idField)
      app.db[tableName].bulkPut(data)
    })
    .catch(error => new Error(`error fetching data for table ${tableName}:`, error))
}
