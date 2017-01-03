import localforage from 'localforage'
import { toJS } from 'mobx'

export default (tableState) => {
  // dont know why but next line is needed for loop to work
  console.log(`writing table state to idb`)
  localforage.setItem(`projekt`, toJS(tableState.projekt))
  Object.keys(tableState).forEach((key) => {
    const value = toJS(tableState[key])
    if (key !== `projekt` && value && Object.keys(value).length > 0) {
      console.log(`writing state for table ${key} to idb:`, value)
      localforage.setItem(key, value)
    }
  })
}
