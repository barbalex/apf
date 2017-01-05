import { toJS } from 'mobx'

export default (store) => {
  Object.keys(store.table).forEach((key) => {
    const value = toJS(store.table[key])
    if (value && Object.keys(value).length > 0) {
      store.db[key].bulkPut(Object.values(value))
    }
  })
}
