import { observable, asMap } from 'mobx'

class Node {
  @observable loadingAllNodes = false
  @observable nodeLabelFilter = asMap({})
  @observable nrOfRowsAboveActiveNode = 0
}

export default new Node()
