import sortBy from 'lodash/sortBy'
import zieljahreNodes from './zieljahre'
import erfkritNodes from './erfkrit'
import apberNodes from './apber'
import berNodes from './ber'
import assozartNodes from './assozart'
import popNodes from './pop'

export default (store) => {
  const { activeUrlElements } = store
  // grab ape as array and sort them by name
  let ap = Array.from(store.table.ap.values())
  // show only ap of active projekt
  const activeProjekt = store.activeUrlElements.projekt
  ap = ap.filter(a => a.ProjId === activeProjekt)
  // map through all ap and create array of nodes
  let nodes = ap.map((el) => {
    let label = `...`
    const { adb_eigenschaften } = store.table
    if (adb_eigenschaften.size > 0) {
      label = adb_eigenschaften.get(el.ApArtId).Artname
    }
    const ziele = Array.from(store.table.ziel.values()).filter(a => a.ApArtId === el.ApArtId)
    const myErfkritNodes = erfkritNodes(store, el.ApArtId)
    const myZieljahreNodes = zieljahreNodes(store, el.ApArtId)
    const myApberNodes = apberNodes(store, el.ApArtId)
    const myBerNodes = berNodes(store, el.ApArtId)
    const myAssozartNodes = assozartNodes(store, el.ApArtId)
    const myPopNodes = popNodes(store, el.ApArtId)
    return {
      nodeType: `table`,
      menuType: `ap`,
      id: el.ApArtId,
      parentId: el.ProjId,
      label,
      expanded: el.ApArtId === activeUrlElements.ap,
      url: [`Projekte`, el.ProjId, `Arten`, el.ApArtId],
      children: [
        // pop folder
        {
          nodeType: `folder`,
          menuType: `popFolder`,
          id: el.ApArtId,
          label: `Populationen (${myPopNodes.length})`,
          expanded: activeUrlElements.popFolder,
          url: [`Projekte`, el.ProjId, `Arten`, el.ApArtId, `Populationen`],
          children: myPopNodes,
        },
        // ziel folder
        {
          nodeType: `folder`,
          menuType: `zielFolder`,
          id: el.ApArtId,
          label: `AP-Ziele (${ziele.length})`,
          expanded: activeUrlElements.zielFolder,
          url: [`Projekte`, el.ProjId, `Arten`, el.ApArtId, `AP-Ziele`],
          children: myZieljahreNodes,
        },
        // erfkrit folder
        {
          nodeType: `folder`,
          menuType: `erfkritFolder`,
          id: el.ApArtId,
          label: `AP-Erfolgskriterien (${myErfkritNodes.length})`,
          expanded: activeUrlElements.erfkritFolder,
          url: [`Projekte`, el.ProjId, `Arten`, el.ApArtId, `AP-Erfolgskriterien`],
          children: myErfkritNodes,
        },
        // apber folder
        {
          nodeType: `folder`,
          menuType: `apberFolder`,
          id: el.ApArtId,
          label: `AP-Berichte (${myApberNodes.length})`,
          expanded: activeUrlElements.apberFolder,
          url: [`Projekte`, el.ProjId, `Arten`, el.ApArtId, `AP-Berichte`],
          children: myApberNodes,
        },
        // ber folder
        {
          nodeType: `folder`,
          menuType: `berFolder`,
          id: el.ApArtId,
          label: `Berichte (${myBerNodes.length})`,
          expanded: activeUrlElements.berFolder,
          url: [`Projekte`, el.ProjId, `Arten`, el.ApArtId, `Berichte`],
          children: myBerNodes,
        },
        // beobNichtBeurteilt folder
        {
          nodeType: `folder`,
          menuType: `beobzuordnungFolder`,
          id: el.ApArtId,
          label: `nicht beurteilte Beobachtungen. TODO: add number`,
          expanded: activeUrlElements.beobzuordnungFolder,
          url: [`Projekte`, el.ProjId, `Arten`, el.ApArtId, `nicht-beurteilte-Beobachtungen`],
          children: [],
        },
        // beobNichtZuzuordnen folder
        {
          nodeType: `folder`,
          menuType: `beobNichtZuzuordnenFolder`,
          id: el.ApArtId,
          label: `nicht zuzuordnende Beobachtungen. TODO: add number`,
          expanded: activeUrlElements.beobNichtZuzuordnenFolder,
          url: [`Projekte`, el.ProjId, `Arten`, el.ApArtId, `nicht-zuzuordnende-Beobachtungen`],
          children: [],
        },
        // idealbiotop folder
        {
          nodeType: `folder`,
          menuType: `idealbiotopFolder`,
          id: el.ApArtId,
          label: `Idealbiotop`,
          expanded: activeUrlElements.idealbiotopFolder,
          url: [`Projekte`, el.ProjId, `Arten`, el.ApArtId, `Idealbiotop`],
        },
        // assozarten folder
        {
          nodeType: `folder`,
          menuType: `assozartFolder`,
          id: el.ApArtId,
          label: `assoziierte Arten (${myAssozartNodes.length})`,
          expanded: activeUrlElements.assozartFolder,
          url: [`Projekte`, el.ProjId, `Arten`, el.ApArtId, `assoziierte-Arten`],
          children: myAssozartNodes,
        },
        // qk folder
        {
          nodeType: `folder`,
          menuType: `qkFolder`,
          id: el.ApArtId,
          label: `Qualitätskontrollen`,
          expanded: false,
          url: [`Projekte`, el.ProjId, `Arten`, el.ApArtId, `Qualitaetskontrollen`],
        },
      ],
    }
  })
  // filter by node.nodeLabelFilter
  const filterString = store.node.nodeLabelFilter.get(`ap`)
  if (filterString) {
    nodes = nodes.filter(p =>
      p.label.toLowerCase().includes(filterString.toLowerCase())
    )
  }
  // sort by label and return
  return sortBy(nodes, `label`)
}
