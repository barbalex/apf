import { transaction } from 'mobx'
import axios from 'axios'
import app from 'ampersand-app'

import apiBaseUrl from './apiBaseUrl'
import tables from './tables'
import recordValuesForWhichTableDataWasFetched from './recordValuesForWhichTableDataWasFetched'

const writeToStore = (store, data, tableName, id) => {
  transaction(() => {
    data.forEach(d =>
      store.table[tableName].set(id, d)
    )
  })
}

export default ({ store, schemaName, tableName, id }) => {
  if (!tableName) {
    return new Error(`action fetchDatasetById: tableName must be passed`)
  }
  if (!id) {
    return new Error(`action fetchDatasetById: id must be passed`)
  }
  schemaName = schemaName || `apflora`  // eslint-disable-line no-param-reassign

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
    .then(data =>
      writeToStore(store, data, tableName, id)
    )
    .then(() => axios.get(url))
    .then(({ data }) => {
      // leave ui react before this happens
      setTimeout(() => writeToStore(store, data, tableName, id))
      recordValuesForWhichTableDataWasFetched({ store, table: tableName, field: idField, value: id })
      setTimeout(() => app.db[tableName].bulkPut(data))
    })
    .catch(error => new Error(`error fetching data for table ${tableName}:`, error))
}
