import { observable, asMap } from 'mobx'

class Node {
  @observable loadingAllNodes = false
  @observable activeNode = null
  @observable nodeLabelFilter = asMap({})
  @observable nrOfRowsAboveActiveNode = 0
}

export default new Node()
