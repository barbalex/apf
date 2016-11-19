import { observable, computed, toJS } from 'mobx'

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
  @observable fields = []
  @observable fieldsLoading = false
  @observable activeNode = null
  @observable nodeLabelFilter = {}
  @observable nrOfRowsAboveActiveNode = 0
  @computed get artname() {
    const aeEigenschaften = toJS(this.aeEigenschaften)
    let artname = ``
    if (this.activeNode.row && this.activeNode.row.ApArtId && aeEigenschaften.length > 0) {
      artname = aeEigenschaften.find(e => e.id === this.activeNode.row.ApArtId).label
    }
    return artname
  }
  @observable nodes2 = [placeholderNode]
  @observable map = null
}

export default new Data()
