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
  @observable activeNodeChildrenLabelFilter = {
    table: `ap`,
    value: `abi`,
  }
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
  @observable aeEigenschaften = []
  @observable aeEigenschaftenLoading = false
  @observable aeLr = []
  @observable aeLrLoading = false
  @observable aeFloraStatus = []
  @observable aeFloraStatusLoading = false
  @observable apStatus = []
  @observable apStatusLoading = null
  @observable apErfbeurtkrit = []
  @observable apErfbeurtkritLoading = false
  @observable apErfkrit = []
  @observable apErfkritLoading = false
  @observable apUmsetzung = []
  @observable apUmsetzungLoading = false
  @observable apErfkritWerte = []
  @observable apErfkritWerteLoading = false
  @observable popEntwicklung = []
  @observable popEntwicklungLoading = false
  @observable popStatus = []
  @observable popStatusLoading = false
  @observable tpopApberrelevant = []
  @observable tpopApberrelevantLoading = false
  @observable tpopEntwicklung = []
  @observable tpopEntwicklungLoading = false
  @observable tpopkontrIdbiotopuebereinst = []
  @observable tpopkontrIdbiotopuebereinstLoading = false
  @observable tpopkontrTyp = []
  @observable tpopkontrTypLoading = false
  @observable tpopkontrzaehlEinheit = []
  @observable tpopkontrzaehlEinheitLoading = false
  @observable tpopkontrzaehlMethode = []
  @observable tpopkontrzaehlMethodeLoading = false
  @observable tpopmassnErfbeurt = []
  @observable tpopmassnErfbeurtLoading = false
  @observable tpopmassnTyp = []
  @observable tpopmassnTypLoading = false
  @observable zielTyp = []
  @observable zielTypLoading = false
  @observable adresse = []
  @observable adresseLoading = false
  @observable gemeinde = []
  @observable gemeindeLoading = false
}

export default new Data()
