import { toJS } from 'mobx'
import forEach from 'lodash/forEach'

export default (store) => {
  forEach(store.table, (val, key) => {
    const value = toJS(val)
    if (value && Object.keys(value).length > 0) {
      store.db[key].bulkPut(Object.values(value))
    }
  })
}
