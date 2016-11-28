import { observable } from 'mobx'

class Node {
  @observable loadingAllNodes = false
  @observable activeNode = null
  @observable nodeLabelFilter = {}
  @observable nrOfRowsAboveActiveNode = 0
}

export default new Node()
