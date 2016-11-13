import { observable } from 'mobx'
import ActiveDataset from './activeDataset'

const noNode = {
  nodeId: `none`,
  name: `this seems to be needed for mobx`,
  expanded: false,
  children: [],
}

class Data {
  @observable nodes = [noNode]
  @observable loadingAllNodes = false
  @observable fields = []
  @observable fieldsLoading = false
  @observable activeNode = null
  @observable nrOfRowsAboveActiveNode = 0
  @observable treeHeight = 0
  activeDataset = ActiveDataset
  @observable nodes2 = [noNode]
  @observable map = null
  @observable user = null
  @observable aeEigenschaften = []
  @observable aeEigenschaftenLoading = false
  @observable aeLr = null
  @observable aeFloraStatus = []
  @observable aeFloraStatusLoading = false
  @observable apStatus = []
  @observable apStatusLoading = null
  @observable apErfbeurtkrit = null
  @observable apErfkrit = null
  @observable apUmsetzung = []
  @observable apUmsetzungLoading = false
  @observable popEntwicklung = null
  @observable popStatus = null
  @observable tpopApberrelevant = null
  @observable tpopEntwicklung = null
  @observable tpopkontrIdbiotopuebereinst = null
  @observable tpopkontrTyp = null
  @observable tpopkontrzaehlEinheit = null
  @observable tpopkontrzaehlMethode = null
  @observable tpopmassnErfbeurt = null
  @observable tpopmassnTyp = null
  @observable zielTyp = null
  @observable adresse = []
  @observable adresseLoading = false
  @observable gemeinde = null
}

export default new Data()
