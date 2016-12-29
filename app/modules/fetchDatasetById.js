import { transaction } from 'mobx'
import axios from 'axios'
import apiBaseUrl from './apiBaseUrl'
import tables from './tables'

export default ({ store, schemaNamePassed, tableName, id }) => {
  if (!tableName) {
    return new Error(`action fetchDatasetById: tableName must be passed`)
  }
  if (!id) {
    return new Error(`action fetchDatasetById: id must be passed`)
  }
  const schemaName = schemaNamePassed || `apflora`

  const idField = tables.find(t => t.table === tableName).idField
  const url = `${apiBaseUrl}/schema/${schemaName}/table/${tableName}/field/${idField}/value/${id}`
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
