import { observable } from 'mobx'

const placeholderNode = {
  nodeId: `none`,
  folder: null,
  table: null,
  row: null,
  label: null,
  valid: null,
  expanded: false,
  urlPath: null,
  nodeIdPath: null,
  children: [],
  childrenFilteredByLabel: [],
}

class Data {
  @observable nodes = [placeholderNode]
  @observable loadingAllNodes = false
  @observable activeNode = null
  @observable nodeLabelFilter = {}
  @observable nrOfRowsAboveActiveNode = 0
  @observable nodes2 = [placeholderNode]
}

export default new Data()
