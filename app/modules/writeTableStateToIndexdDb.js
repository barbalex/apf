import { toJS, transaction } from 'mobx'
import forEach from 'lodash/forEach'
import app from 'ampersand-app'

export default (store) => {
  transaction(() => {
    forEach(store.table, (val, key) => {
      const value = toJS(val)
      if (value && Object.keys(value).length > 0) {
        app.db[key].bulkPut(Object.values(value))
      }
    })
  })
}
