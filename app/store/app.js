import { observable } from 'mobx'

class App {
  @observable errors = []
  @observable user = null
  @observable fields = []
  @observable fieldsLoading = false
}

export default new App()
