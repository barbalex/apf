import { observable, computed, toJS } from 'mobx'
import Node from './node'
import tables from '../../modules/tables'

// TODO: remove noNode
const noNode = {
  nodeId: `none`,
  name: `this seems to be needed for mobx`,
  expanded: false,
  children: [],
}

const NodeTest = {
  nodeId: null,
  folder: null,
  table: null,
  row: null,
  folderLabel: null,
  label() {
    if (this.folderLabel) {
      return this.folderLabel
    }
    const table = tables.find(t => t.tabelleInDb === this.table)
    if (!table) return ``
    const label = table.label(this.row, this)
    if (!label) return ``
    return label
  },
  valid: null,
  expanded: false,
  urlPath: null,
  nodeIdPath: null,
  children: [],
}

// TODO: setting Node instead of noNode in nodes and nodes2 creates bad error in mobx
class Data {
  @observable nodes = [NodeTest]
  @observable loadingAllNodes = false
  @observable fields = []
  @observable fieldsLoading = false
  @observable activeNode = null
  @observable nrOfRowsAboveActiveNode = 0
  @observable treeHeight = 0
  activeNode = Node
  @computed get artname() {
    const aeEigenschaften = toJS(this.aeEigenschaften)
    let artname = ``
    if (this.activeNode.row && this.activeNode.row.ApArtId && aeEigenschaften.length > 0) {
      artname = aeEigenschaften.find(e => e.id === this.activeNode.row.ApArtId).label
    }
    return artname
  }
  @observable nodes2 = [NodeTest]
  @observable map = null
  @observable aeEigenschaften = []
  @observable aeEigenschaftenLoading = false
  @observable aeLr = null
  @observable aeFloraStatus = []
  @observable aeFloraStatusLoading = false
  @observable apStatus = []
  @observable apStatusLoading = null
  @observable apErfbeurtkrit = []
  @observable apErfkrit = []
  @observable apUmsetzung = []
  @observable apUmsetzungLoading = false
  @observable apErfkritWerte = []
  @observable apErfkritWerteLoading = false
  @observable popEntwicklung = []
  @observable popStatus = []
  @observable tpopApberrelevant = []
  @observable tpopEntwicklung = []
  @observable tpopkontrIdbiotopuebereinst = []
  @observable tpopkontrTyp = []
  @observable tpopkontrzaehlEinheit = []
  @observable tpopkontrzaehlMethode = []
  @observable tpopmassnErfbeurt = []
  @observable tpopmassnTyp = []
  @observable zielTyp = []
  @observable adresse = []
  @observable adresseLoading = false
  @observable gemeinde = null
}

export default new Data()
