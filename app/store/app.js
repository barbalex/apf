import { observable } from 'mobx'

class App {
  constructor(store) {
    this.store = store
  }
  @observable errors = []
  // TODO: get user else
  @observable user = `z`
  @observable fields = []
  @observable fieldsLoading = false
  @observable map = null
}

export default new App()
