import app from 'ampersand-app'

import tableNames from './tableStoreNames'
import tables from './tables'

export default (store) => {
  tableNames.forEach((tableName) => {
    const metadata = tables.find(t => t.table === tableName)
    if (metadata) {
      const idField = metadata.idField
      if (idField) {
        app.db[tableName]
          .toArray()
          .then((values) => {
            if (values.length > 0) {
              console.log(`initializing values for table ${tableName} in state`)
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
      }
    }
  })
}
