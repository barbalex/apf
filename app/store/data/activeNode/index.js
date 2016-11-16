import { observable, computed } from 'mobx'
import tables from '../../../modules/tables'
import store '../index'

class ActiveNode {
  @observable nodeId = null
  @observable folder = null
  @observable table = null
  @observable row = null
  @computed get label() {
    if (this.folderLabel) {
      return this.folderLabel
    }
    const table = tables.find(t => t.tabelleInDb === this.table)
    const label = table.label(this.row, store)
    return tables.find(t => t.tabelleInDb === this.table).label(this.row)
  }
  @observable valid = null
  @observable expanded = false
  @observable urlPath = null
  @observable nodeIdPath = null
}

export default new ActiveNode()
