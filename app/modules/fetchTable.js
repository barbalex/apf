import { transaction } from 'mobx'
import axios from 'axios'
import localforage from 'localforage'
import forEach from 'lodash/forEach'

import apiBaseUrl from './apiBaseUrl'
import tables from './tables'

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
    /*
    return localforage.getItem(tableName)
      .then((value) => {
        // set value from idb
        const isValue = value && Object.keys(value).length > 0
        if (isValue) {
          console.log(`fetchTable: setting table ${tableName} from idb before fetching from server`)
          forEach(value, (val, key) => {
            store.table[tableName].set(key, val)
          })
        }
        return true
      })
      .then(() => axios.get(url))*/
    return axios.get(url)
      .then(({ data }) => {
        transaction(() => {
          data.forEach(d =>
            store.table[tableName].set(d[idField], d)
          )
          store.table[`${tableName}Loading`] = false
        })
      })
      .catch(error => new Error(`error fetching table ${tableName}:`, error))
  }
  // ignore that was not loaded
}
