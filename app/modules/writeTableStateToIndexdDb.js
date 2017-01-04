import localforage from 'localforage'
import { toJS } from 'mobx'

export default (tableState) => {
  Object.keys(tableState).forEach((key) => {
    const value = toJS(tableState[key])
    if (value && Object.keys(value).length > 0) {
      // console.log(`writing state for table ${key} to idb:`, value)
      localforage.setItem(key, value)
    }
  })
}
