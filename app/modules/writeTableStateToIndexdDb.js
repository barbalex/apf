import localforage from 'localforage'
import { toJS } from 'mobx'

export default (tableState) => {
  // dont know why but next line is needed for loop to work
  localforage.setItem(`projekt`, toJS(tableState.projekt))
  Object.keys(tableState).forEach((key) => {
    if (key !== `projekt`) {
      localforage.setItem(key, toJS(tableState[key]))
    }
  })
}
