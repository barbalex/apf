import { observable } from 'mobx'

class Node {
  @observable loadingAllNodes = false
  nodeLabelFilter = observable.map({})
  @observable nrOfRowsAboveActiveNode = 0
}

export default new Node()
