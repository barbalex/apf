import { observable } from 'mobx'

class App {
  @observable errors = []
  @observable user = null
  @observable fields = []
  @observable fieldsLoading = false
  @observable map = null
}

export default new App()
