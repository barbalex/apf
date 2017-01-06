import sortBy from 'lodash/sortBy'
import zieljahreFolderNode from './zieljahreFolder'
import erfkritFolderNode from './erfkritFolder'
import apberFolderNode from './apberFolder'
import berNodes from './ber'
import assozartNodes from './assozart'
import popFolderNode from './popFolder'
import beobzuordnungNodes from './beobzuordnung'
import beobNichtZuzuordnenNodes from './beobNichtZuzuordnen'

export default (store, projId) => {
  const { activeUrlElements } = store
  // grab ape as array and sort them by name
  let ap = Array.from(store.table.ap.values())
  // show only ap of active projekt
  ap = ap.filter(a => a.ProjId === projId)
  // map through all ap and create array of nodes
  let nodes = ap.map((el) => {
    let label = `...`
    const { adb_eigenschaften } = store.table
    if (adb_eigenschaften.size > 0) {
      const ae = adb_eigenschaften.get(el.ApArtId)
      label = ae ? ae.Artname : `(keine Art gewählt)`
    }
    const myBerNodes = berNodes(store, el.ApArtId)
    const myAssozartNodes = assozartNodes(store, el.ApArtId)
    const myBeobzuordnungNodes = beobzuordnungNodes(store, el.ApArtId)
    const myBeobNichtZuzuordnenNodes = beobNichtZuzuordnenNodes(store, el.ApArtId)
    return {
      nodeType: `table`,
      menuType: `ap`,
      id: el.ApArtId,
      parentId: el.ProjId,
      label,
      expanded: el.ApArtId === activeUrlElements.ap,
      url: [`Projekte`, el.ProjId, `Arten`, el.ApArtId],
      children: [
        popFolderNode(store, el.ProjId, el.ApArtId),
        zieljahreFolderNode(store, el.ProjId, el.ApArtId),
        erfkritFolderNode(store, el.ProjId, el.ApArtId),
        apberFolderNode(store, el.ProjId, el.ApArtId),
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
          label: `nicht beurteilte Beobachtungen (${myBeobzuordnungNodes.length})`,
          expanded: activeUrlElements.beobzuordnungFolder,
          url: [`Projekte`, el.ProjId, `Arten`, el.ApArtId, `nicht-beurteilte-Beobachtungen`],
          children: myBeobzuordnungNodes,
        },
        // beobNichtZuzuordnen folder
        {
          nodeType: `folder`,
          menuType: `beobNichtZuzuordnenFolder`,
          id: el.ApArtId,
          label: `nicht zuzuordnende Beobachtungen (${myBeobNichtZuzuordnenNodes.length})`,
          expanded: activeUrlElements.beobNichtZuzuordnenFolder,
          url: [`Projekte`, el.ProjId, `Arten`, el.ApArtId, `nicht-zuzuordnende-Beobachtungen`],
          children: myBeobNichtZuzuordnenNodes,
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
