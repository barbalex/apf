import { observable } from 'mobx'

class ActiveDataset {
  @observable table = null
  @observable row = null
  @observable valid = null
}

export default new ActiveDataset()
