import sortBy from 'lodash/sortBy'
import zieljahreFolderNode from './zieljahreFolder'
import erfkritFolderNode from './erfkritFolder'
import apberFolderNode from './apberFolder'
import berFolderNode from './berFolder'
import assozartNodes from './assozart'
import popFolderNode from './popFolder'
import beobzuordnungFolderNode from './beobzuordnungFolder'
import beobNichtZuzuordnenFolderNode from './beobNichtZuzuordnenFolder'

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
    const myAssozartNodes = assozartNodes(store, el.ApArtId)
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
        berFolderNode(store, el.ProjId, el.ApArtId),
        beobzuordnungFolderNode(store, el.ProjId, el.ApArtId),
        beobNichtZuzuordnenFolderNode(store, el.ProjId, el.ApArtId),
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
