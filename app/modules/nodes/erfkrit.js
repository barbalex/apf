import sortBy from 'lodash/sortBy'

export default (store) => {
  const { activeUrlElements } = store
  // grab erfkrit as array and sort them by year
  let erfkrit = Array.from(store.table.erfkrit.values())
  // show only nodes of active ap
  const activeAp = store.activeUrlElements.ap
  erfkrit = erfkrit.filter(a => a.ApArtId === activeAp)
  // get erfkritWerte
  const apErfkritWerte = Array.from(store.table.ap_erfkrit_werte.values())
  // map through all projekt and create array of nodes
  let nodes = erfkrit.map((el) => {
    const projId = store.table.ap.get(el.ApArtId).ProjId
    const erfkritWert = apErfkritWerte.find(e => e.BeurteilId === el.ErfkritErreichungsgrad)
    const beurteilTxt = erfkritWert ? erfkritWert.BeurteilTxt : null
    const erfkritSort = erfkritWert ? erfkritWert.BeurteilOrd : null
    return {
      type: `row`,
      label: `${beurteilTxt || `(nicht beurteilt)`}: ${el.ErfkritTxt || `(keine Kriterien erfasst)`}`,
      table: `erfkrit`,
      row: el,
      expanded: el.ErfkritId === activeUrlElements.erfkrit,
      url: [`Projekte`, projId, `Arten`, el.ApArtId, `AP-Erfolgskriterien`, el.ErfkritId],
      sort: erfkritSort,
    }
  })
  // filter by node.nodeLabelFilter
  const filterString = store.node.nodeLabelFilter.get(`erfkrit`)
  if (filterString) {
    nodes = nodes.filter(p =>
      p.label.toLowerCase().includes(filterString.toLowerCase())
    )
  }
  // sort by label and return
  return sortBy(nodes, `sort`)
}
