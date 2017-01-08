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
}

export default (store, schemaNamePassed, tableName) => {
  // console.log(`module fetchTable: tableName:`, tableName)
  if (!tableName) {
    return new Error(`action fetchTable: tableName must be passed`)
  }
  const schemaName = schemaNamePassed || `apflora`
  // only fetch if not yet fetched
  if (store.table[tableName].size === 0 && !store.table[`${tableName}Loading`]) {
    const idField = tables.find(t => t.table === tableName).idField
    store.table[`${tableName}Loading`] = true
    let url = `${apiBaseUrl}/schema/${schemaName}/table/${tableName}`
    if (tableName === `adb_lr`) {
      url = `${apiBaseUrl}/lrDelarze`
    }

    // console.log(`fetchTable: tableName:`, tableName)
    // console.log(`fetchTable: app.db[tableName]:`, app.db[tableName])

    app.db[tableName]
      .toArray()
      .then((data) => {
        writeToStore(store, data, tableName, idField)
        store.table[`${tableName}Loading`] = false
      })
      .then(() => axios.get(url))
      .then(({ data }) => {
        // leave ui react before this happens
        setTimeout(() => writeToStore(store, data, tableName, idField))
        setTimeout(() => app.db[tableName].bulkPut(data))
      })
      .catch(error => new Error(`error fetching data for table ${tableName}:`, error))
  }
}
