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
      type: `row`,
      label,
      table: `ap`,
      row: el,
      expanded: el.ApArtId === activeUrlElements.ap,
      url: [`Projekte`, el.ProjId, `Arten`, el.ApArtId],
      children: [
        // pop folder
        {
          type: `folder`,
          label: `Populationen (${myPopNodes.length})`,
          table: `ap`,
          row: el,
          id: el.ApArtId,
          expanded: activeUrlElements.popFolder,
          url: [`Projekte`, el.ProjId, `Arten`, el.ApArtId, `Populationen`],
          children: myPopNodes,
        },
        // ziel folder
        {
          type: `folder`,
          label: `AP-Ziele (${ziele.length})`,
          table: `ap`,
          row: el,
          id: el.ApArtId,
          expanded: activeUrlElements.zielFolder,
          url: [`Projekte`, el.ProjId, `Arten`, el.ApArtId, `AP-Ziele`],
          children: myZieljahreNodes,
        },
        // erfkrit folder
        {
          type: `folder`,
          label: `AP-Erfolgskriterien (${myErfkritNodes.length})`,
          table: `ap`,
          row: el,
          id: el.ApArtId,
          expanded: activeUrlElements.erfkritFolder,
          url: [`Projekte`, el.ProjId, `Arten`, el.ApArtId, `AP-Erfolgskriterien`],
          children: myErfkritNodes,
        },
        // apber folder
        {
          type: `folder`,
          label: `AP-Berichte (${myApberNodes.length})`,
          table: `ap`,
          row: el,
          id: el.ApArtId,
          expanded: activeUrlElements.apberFolder,
          url: [`Projekte`, el.ProjId, `Arten`, el.ApArtId, `AP-Berichte`],
          children: myApberNodes,
        },
        // ber folder
        {
          type: `folder`,
          label: `Berichte (${myBerNodes.length})`,
          table: `ap`,
          row: el,
          id: el.ApArtId,
          expanded: activeUrlElements.berFolder,
          url: [`Projekte`, el.ProjId, `Arten`, el.ApArtId, `Berichte`],
          children: myBerNodes,
        },
        // beobNichtBeurteilt folder
        {
          type: `folder`,
          label: `nicht beurteilte Beobachtungen. TODO: add number`,
          table: `ap`,
          row: el,
          id: el.ApArtId,
          expanded: activeUrlElements.beobzuordnungFolder,
          url: [`Projekte`, el.ProjId, `Arten`, el.ApArtId, `nicht-beurteilte-Beobachtungen`],
          children: [],
        },
        // beobNichtZuzuordnen folder
        {
          type: `folder`,
          label: `nicht zuzuordnende Beobachtungen. TODO: add number`,
          table: `ap`,
          row: el,
          id: el.ApArtId,
          expanded: activeUrlElements.beobNichtZuzuordnenFolder,
          url: [`Projekte`, el.ProjId, `Arten`, el.ApArtId, `nicht-zuzuordnende-Beobachtungen`],
          children: [],
        },
        // idealbiotop folder
        {
          type: `folder`,
          label: `Idealbiotop`,
          table: `idealbiotop`,
          row: el,
          id: el.ApArtId,
          expanded: activeUrlElements.idealbiotopFolder,
          url: [`Projekte`, el.ProjId, `Arten`, el.ApArtId, `Idealbiotop`],
        },
        // assozarten folder
        {
          type: `folder`,
          label: `assoziierte Arten (${myAssozartNodes.length})`,
          table: `ap`,
          row: el,
          id: el.ApArtId,
          expanded: activeUrlElements.assozartFolder,
          url: [`Projekte`, el.ProjId, `Arten`, el.ApArtId, `assoziierte-Arten`],
          children: myAssozartNodes,
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
