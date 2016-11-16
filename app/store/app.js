import { observable } from 'mobx'

class App {
  @observable errors = []
  @observable user = null
}

export default new App()
