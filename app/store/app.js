import { observable } from 'mobx'

class App {
  constructor(store) {
    this.store = store
  }
  @observable errors = []
  @observable user = null
  @observable fields = []
  @observable fieldsLoading = false
  @observable map = null
}

export default new App()
