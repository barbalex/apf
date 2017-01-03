import localforage from 'localforage'
import tableNames from './tableStoreNames'

export default (tableClass) => {
  tableNames.forEach((tableName) => {
    localforage.getItem(tableName)
      .then((value) => {
        const isValue = value && Object.keys(value).length > 0
        if (isValue) {
          console.log(`initializing value for table ${tableName} in state:`, value)
          tableClass[tableName] = value
        }
      })
      .catch(() => {
        // ignore
      })
  })
}
