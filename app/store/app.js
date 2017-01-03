import { observable } from 'mobx'

class App {
  @observable errors = []
  // TODO: get user else
  @observable user = `z`
  @observable fields = []
  @observable fieldsLoading = false
  @observable map = null
}

export default new App()
