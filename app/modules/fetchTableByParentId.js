import { transaction } from 'mobx'
import axios from 'axios'
import app from 'ampersand-app'

import apiBaseUrl from './apiBaseUrl'
import tables from './tables'

const writeToStore = (store, data, tableName, idField, parentId) => {
  const { valuesForWhichTableDataWasFetched } = store
  transaction(() => {
    data.forEach(d =>
      store.table[tableName].set(d[idField], d)
    )
  })
  store.table[`${tableName}Loading`] = false
  // record that data was fetched for this value
  if (!valuesForWhichTableDataWasFetched[tableName]) {
    valuesForWhichTableDataWasFetched[tableName] = {}
  }
  if (!valuesForWhichTableDataWasFetched[tableName][idField]) {
    valuesForWhichTableDataWasFetched[tableName][idField] = []
  }
  if (!valuesForWhichTableDataWasFetched[tableName][idField].includes(parentId)) {
    valuesForWhichTableDataWasFetched[tableName][idField].push(parentId)
  }
}

export default (store, schemaNamePassed, tableName, parentId) => {
  if (!tableName) {
    return new Error(`action fetchTableByParentId: tableName must be passed`)
  }
  if (!parentId) {
    return new Error(`action fetchTableByParentId: parentId must be passed`)
  }
  const schemaName = schemaNamePassed || `apflora`
  const idField = tables.find(t => t.table === tableName).idField
  const parentIdField = tables.find(t => t.table === tableName).parentIdField

  // only fetch if not yet fetched
  const { valuesForWhichTableDataWasFetched } = store
  if (
    valuesForWhichTableDataWasFetched[tableName] &&
    valuesForWhichTableDataWasFetched[tableName][idField] &&
    valuesForWhichTableDataWasFetched[tableName][idField].includes(parentId)
  ) {
    return
  }

  const url = `${apiBaseUrl}/schema/${schemaName}/table/${tableName}/field/${parentIdField}/value/${parentId}`
  store.table[`${tableName}Loading`] = true

  app.db[tableName]
    .toArray()
    .then((data) => {
      if (data.length > 0) {
        writeToStore(store, data, tableName, idField, parentId)
      }
    })
    .then(() => axios.get(url))
    .then(({ data }) => {
      writeToStore(store, data, tableName, idField, parentId)
      app.db[tableName].bulkPut(data)
    })
    .catch(error => new Error(`error fetching data for table ${tableName}:`, error))
}
