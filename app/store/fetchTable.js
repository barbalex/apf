import { transaction } from 'mobx'
import axios from 'axios'
import apiBaseUrl from '../modules/apiBaseUrl'
import tables from '../modules/tables'

export default (store, schemaNamePassed, tableName) => {
  console.log(`module fetchTable: store:`, store)
  console.log(`module fetchTable: schemaNamePassed:`, schemaNamePassed)
  console.log(`module fetchTable: tableName:`, tableName)
  if (!tableName) {
    return new Error(`action fetchTable: tableName must be passed`)
  }
  const schemaName = schemaNamePassed || `apflora`
  // only fetch if not yet fetched
  if (store.table[tableName].size === 0 && !store.table[`${tableName}Loading`]) {
    const idField = tables.find(t => t.table === tableName).idField
    store.table[`${tableName}Loading`] = true
    return axios.get(`${apiBaseUrl}/schema/${schemaName}/table/${tableName}`)
      .then(({ data }) => {
        transaction(() => {
          data.forEach(d =>
            store.table[`${tableName}`].set(d[idField], d)
          )
          store.table[`${tableName}Loading`] = false
        })
      })
      .catch(error => new Error(`error fetching table ${tableName}:`, error))
  }
  return new Error(`table not fetched`)
}
