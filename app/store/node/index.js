import { observable, computed, toJS } from 'mobx'
import sortBy from 'lodash/sortBy'
import getActiveUrlElements from '../../modules/getActiveUrlElements'

const activeElements = getActiveUrlElements()

class Node {
  constructor(store) {
    this.store = store
    console.log(`store/node, constructor, store:`, store)
  }

  @computed get projektNodes() {
    // grab projekte as array and sort them by name
    const projekte = sortBy(this.store.table.projekt.values(), `ProjName`)
    // map through all projekt and create array of nodes
    return projekte.map(el => ({
      type: `row`,
      label: el.ProjName || `(kein Name)`,
      table: `projekt`,
      row: el,
      expanded: el.projId === activeElements.projekt,
      url: [`Projekte`, el.ProjId],
      children: [
        {
          type: `folder`,
          label: `Arten (${this.apNodes.length})`,
          folder: `ap`,
          table: `projekt`,
          row: el,
          expanded: activeElements.apFolder,
          url: [`Projekte`, el.ProjId, `Arten`],
          children: this.apNodes,
        },
        {
          type: `folder`,
          label: `AP-Berichte ${this.apberuebersichtNodes.length}`,
          folder: `apberuebersicht`,
          table: `projekt`,
          row: el,
          id: el.ProjId,
          expanded: activeElements.apberuebersichtFolder,
          url: [`Projekte`, el.ProjId `AP-Berichte`],
          children: this.apberuebersichtNodes,
        },
      ],
    }))
  }

  @computed get apNodes() {
    // grab ape as array and sort them by name
    const ap = this.store.table.ap.values()
    // map through all ap and create array of nodes
    const nodes = ap.map(el => ({
      type: `row`,
      label() {
        let artname = `(kein Name)`
        const aeEigenschaften = toJS(this.store.data.adb_eigenschaften)
        if (aeEigenschaften.size > 0) {
          artname = aeEigenschaften.get(el.ApArtId).Artname
        }
        return artname
      },
      table: `ap`,
      row: el,
      expanded: el.ApArtId === activeElements.ap,
      url: [`Projekte`, el.ProjId, `Arten`, el.ApArtId],
      children: [
        // pop folder
        {
          type: `folder`,
          label: `Populationen. TODO: add number`,
          table: `ap`,
          row: el,
          id: el.ApArtId,
          expanded: activeElements.popFolder,
          url: [`Projekte`, el.ProjId, `Arten`, el.ApArtId, `Populationen`],
          children: [],
        },
        // ziel folder
        {
          type: `folder`,
          label: `AP-Ziele. TODO: add number`,
          table: `ap`,
          row: el,
          id: el.ApArtId,
          expanded: activeElements.zielFolder,
          url: [`Projekte`, el.ProjId, `Arten`, el.ApArtId, `AP-Ziele`],
          children: [],
        },
        // erfkrit folder
        {
          type: `folder`,
          label: `AP-Erfolgskriterien. TODO: add number`,
          table: `ap`,
          row: el,
          id: el.ApArtId,
          expanded: activeElements.erfkritFolder,
          url: [`Projekte`, ap.ProjId, `Arten`, ap.ApArtId, `AP-Erfolgskriterien`],
          children: [],
        },
        // apber folder
        {
          type: `folder`,
          label: `AP-Berichte. TODO: add number`,
          table: `ap`,
          row: el,
          id: el.ApArtId,
          expanded: activeElements.apberFolder,
          url: [`Projekte`, ap.ProjId, `Arten`, ap.ApArtId, `AP-Berichte`],
          children: [],
        },
        // ber folder
        {
          type: `folder`,
          label: `Berichte. TODO: add number`,
          table: `ap`,
          row: el,
          id: el.ApArtId,
          expanded: activeElements.berFolder,
          url: [`Projekte`, ap.ProjId, `Arten`, ap.ApArtId, `Berichte`],
          children: [],
        },
        // beobNichtBeurteilt folder
        {
          type: `folder`,
          label: `nicht beurteilte Beobachtungen. TODO: add number`,
          table: `ap`,
          row: el,
          id: el.ApArtId,
          expanded: activeElements.beobzuordnungFolder,
          url: [`Projekte`, ap.ProjId, `Arten`, ap.ApArtId, `nicht-beurteilte-Beobachtungen`],
          children: [],
        },
        // beobNichtZuzuordnen folder
        {
          type: `folder`,
          label: `nicht zuzuordnende Beobachtungen. TODO: add number`,
          table: `ap`,
          row: el,
          id: el.ApArtId,
          expanded: activeElements.beobNichtZuzuordnenFolder,
          url: [`Projekte`, ap.ProjId, `Arten`, ap.ApArtId, `nicht-zuzuordnende-Beobachtungen`],
          children: [],
        },
        // idealbiotop folder
        {
          type: `folder`,
          label: `Idealbiotop`,
          table: `idealbiotop`,
          row: el,
          id: el.ApArtId,
          expanded: activeElements.idealbiotopFolder,
          url: [`Projekte`, ap.ProjId, `Arten`, ap.ApArtId, `Idealbiotop`],
          children: [],
        },
        // assozarten folder
        {
          type: `folder`,
          label: `assoziierte Arten. TODO: add number`,
          table: `ap`,
          row: el,
          id: el.ApArtId,
          expanded: activeElements.assozartFolder,
          url: [`Projekte`, ap.ProjId, `Arten`, ap.ApArtId, `assoziierte-Arten`],
          children: [],
        },
        // qk folder
        {
          type: `folder`,
          label: `Qualitätskontrollen`,
          table: `ap`,
          row: el,
          id: el.ApArtId,
          expanded: false,
          url: [`Projekte`, el.ProjId, `Arten`, el.ApArtId, `Qualitätskontrollen`],
        },
      ],
    }))
    // sort by label and return
    return sortBy(nodes, `label`)
  }

  @computed get apberuebersichtNodes() {
    // grab apberuebersicht as array and sort them by year
    const apberuebersicht = sortBy(this.store.table.apberuebersicht.values(), `JbuJahr`)
    // map through all projekt and create array of nodes
    return apberuebersicht.map(el => ({
      type: `row`,
      label: el.JbuJahr,
      table: `apberuebersicht`,
      row: el,
      expanded: el.JbuJahr === activeElements.apberuebersicht,
      url: [`Projekte`, el.ProjId `AP-Berichte`, el.JbuJahr],
    }))
  }

  @observable loadingAllNodes = false
  @observable activeNode = null
  @observable nodeLabelFilter = {}
  @observable nrOfRowsAboveActiveNode = 0
}

export default store => new Node(store)
