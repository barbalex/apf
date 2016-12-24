import sortBy from 'lodash/sortBy'

export default (store, apArtId) => {
  const { activeUrlElements } = store
  // grab beobNichtZuzuordnen as array and sort them by year
  let beobNichtZuzuordnen = Array.from(store.table.beobzuordnung.values()).filter(b => b.BeobNichtZuordnen === 1)
  // show only nodes of active ap
  beobNichtZuzuordnen = beobNichtZuzuordnen.filter(a => a.NO_SISF === apArtId)
  // map through all and create array of nodes
  let nodes = beobNichtZuzuordnen.map((el) => {
    let label = `${row.Datum || `(kein Datum)`}: ${row.Autor || `(kein Autor)`} (${row.Quelle})`
    const projId = store.table.ap.get(el.AaApArtId).ProjId
    return {
      nodeType: `table`,
      menuType: `beobNichtZuzuordnen`,
      id: el.AaId,
      parentId: el.AaApArtId,
      label,
      expanded: el.AaId === activeUrlElements.beobNichtZuzuordnen,
      url: [`Projekte`, projId, `Arten`, el.AaApArtId, `assoziierte-Arten`, el.AaId],
    }
  })
  // filter by node.nodeLabelFilter
  const filterString = store.node.nodeLabelFilter.get(`beobNichtZuzuordnen`)
  if (filterString) {
    nodes = nodes.filter(p =>
      p.label.toLowerCase().includes(filterString.toLowerCase())
    )
  }
  // sort by label and return
  return sortBy(nodes, `label`)
}
