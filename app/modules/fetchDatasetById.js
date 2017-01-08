import { transaction } from 'mobx'
import axios from 'axios'
import app from 'ampersand-app'

import apiBaseUrl from './apiBaseUrl'
import tables from './tables'

const writeToStore = (store, data, tableName, idField, id) => {
  transaction(() => {
    data.forEach(d =>
      store.table[tableName].set(id, d)
    )
  })
  // record that data was fetched for this value
  const { valuesForWhichTableDataWasFetched } = store
  if (!valuesForWhichTableDataWasFetched[tableName]) {
    valuesForWhichTableDataWasFetched[tableName] = {}
  }
  if (!valuesForWhichTableDataWasFetched[tableName][idField]) {
    valuesForWhichTableDataWasFetched[tableName][idField] = []
  }
  if (!valuesForWhichTableDataWasFetched[tableName][idField].includes(id)) {
    valuesForWhichTableDataWasFetched[tableName][idField].push(id)
  }
}

export default ({ store, schemaName, tableName, id }) => {
  if (!tableName) {
    return new Error(`action fetchDatasetById: tableName must be passed`)
  }
  if (!id) {
    return new Error(`action fetchDatasetById: id must be passed`)
  }
  schemaName = schemaName || `apflora`

  const idField = tables.find(t => t.table === tableName).idField

  // only fetch if not yet fetched
  const { valuesForWhichTableDataWasFetched } = store
  if (
    valuesForWhichTableDataWasFetched[tableName] &&
    valuesForWhichTableDataWasFetched[tableName][idField] &&
    valuesForWhichTableDataWasFetched[tableName][idField].includes(id)
  ) {
    return
  }

  const url = `${apiBaseUrl}/schema/${schemaName}/table/${tableName}/field/${idField}/value/${id}`

  app.db[tableName]
    .toArray()
    .then((data) => {
      if (data.length > 0) {
        writeToStore(store, data, tableName, idField, id)
      }
    })
    .then(() => axios.get(url))
    .then(({ data }) => {
      writeToStore(store, data, tableName, idField, id)
      // leave ui react before this happens
      setTimeout(() => app.db[tableName].bulkPut(data), 0)
    })
    .catch(error => new Error(`error fetching data for table ${tableName}:`, error))
}
