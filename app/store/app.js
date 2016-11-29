import { observable, computed } from 'mobx'
import getActiveUrlElements from '../modules/getActiveUrlElements'

class App {
  @observable errors = []
  @observable user = null
  @observable fields = []
  @observable fieldsLoading = false
  @observable map = null
  @observable url = []
  @computed get activeUrlElements() {
    return getActiveUrlElements(this.url)
  }
}

export default new App()
