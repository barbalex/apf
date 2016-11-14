import { observable } from 'mobx'

class App {
  @observable errors = []
}

export default new App()
