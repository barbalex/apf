import sortBy from 'lodash/sortBy'

export default (store) => {
  const { activeUrlElements } = store
  // grab pop as array and sort them by year
  let pop = Array.from(store.table.pop.values())
  // show only nodes of active ap
  const activeAp = store.activeUrlElements.ap
  pop = pop.filter(a => a.ApArtId === activeAp)
  pop = sortBy(pop, `PopNr`)
  // map through all projekt and create array of nodes
  let nodes = pop.map((el) => {
    const projId = store.table.ap.get(el.ApArtId).ProjId
    return {
      type: `row`,
      label: `${el.PopNr || `(keine Nr)`}: ${el.PopName || `(kein Name)`}`,
      table: `pop`,
      row: el,
      expanded: el.PopId === activeUrlElements.pop,
      url: [`Projekte`, projId, `Arten`, el.ApArtId, `Populationen`, el.PopId],
    }
  })
  // filter by node.nodeLabelFilter
  const filterString = store.node.nodeLabelFilter.get(`pop`)
  if (filterString) {
    nodes = nodes.filter(p =>
      p.label.toLowerCase().includes(filterString.toLowerCase())
    )
  }
  // sort by label and return
  return nodes
}
