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
    const fetchDataFromIdb = store.db[tableName]
      .then((values) => {
        if (values) {
          console.log(`fetchTable: values for ${tableName}:`, values)
          const mapInStore = store.table[tableName]
          values.forEach((v) => {
            const key = v[idField]
            if (!mapInStore.get(key)) {
              mapInStore.set(key, v)
            }
          })
        }
      })
      .catch(error => new Error(`error fetching data for table ${tableName} from idb:`, error))
    /*
    const fetchDataFromIdb = localforage.getItem(tableName)
      .then((map) => {
        // console.log(`map from localforage:`, map)
        // set map from idb
        const isMap = map && Object.keys(map).length > 0
        if (isMap) {
          // console.log(`fetchTable: setting table ${tableName} from idb`)
          forEach(map, (value, key) => {
            const mapInStore = store.table[tableName]
            if (!mapInStore.get(key)) {
              mapInStore.set(key, value)
            }
          })
        }
      })
      .catch(error => new Error(`error fetching table ${tableName} from idb:`, error))*/
    const fetchDataFromServer = axios.get(url)
      .then(({ data }) => {
        transaction(() => {
          data.forEach(d =>
            store.table[tableName].set(d[idField], d)
          )
          store.table[`${tableName}Loading`] = false
        })
      })
      .catch(error => new Error(`error fetching table ${tableName} from Server:`, error))

    Promise.all([fetchDataFromIdb, fetchDataFromServer])
  }
  // ignore that was not loaded
}
