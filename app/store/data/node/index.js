import { observable, computed } from 'mobx'
// import tables from '../../../modules/tables'
// import store from '../index'

class Node {
  @observable nodeId = null
  @observable folder = null
  @observable table = null
  @observable row = null
  folderLabel = null
  /*
  @computed get label() {
    if (this.folderLabel) {
      return this.folderLabel
    }
    const table = tables.find(t => t.tabelleInDb === this.table)
    if (!table) return ``
    const label = table.label(this.row, store)
    if (!label) return ``
    return label
  }*/
  @observable valid = null
  @observable expanded = false
  @observable urlPath = null
  @observable nodeIdPath = null
  children = []
}

export default new Node()
