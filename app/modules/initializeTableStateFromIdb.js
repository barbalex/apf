import localforage from 'localforage'
import forEach from 'lodash/forEach'
import tableNames from './tableStoreNames'

export default (store) => {
  tableNames.forEach((tableName) => {
    localforage.getItem(tableName)
      .then((map) => {
        const isValue = map && Object.keys(map).length > 0
        if (isValue) {
          console.log(`initializing map for table ${tableName} in state`)
          forEach(map, (value, key) => {
            // console.log(`key:`, key)
            // console.log(`value:`, value)
            // console.log(`store:`, store)
            // console.log(`store.table:`, store.table)
            // console.log(`tableName:`, tableName)
            // console.log(`store.table[tableName]:`, store.table[tableName])
            store.table[tableName].set(key, value)
          })
        }
      })
      .catch(() => {
        // ignore
      })
  })
}
