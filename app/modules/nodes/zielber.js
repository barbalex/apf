import sortBy from 'lodash/sortBy'

export default (store, zielId) => {
  const { activeUrlElements } = store
  // grab zielbere as array and sort them by year
  let zielbere = Array.from(store.table.zielber.values())
  zielbere = zielbere.filter(a => a.ZielId === zielId)
  // map through all and create array of nodes
  let nodes = zielbere.map((el) => {
    const ApArtId = store.table.ziel.get(el.ZielId).ApArtId
    const projId = store.table.ap.get(ApArtId).ProjId
    return {
      type: `row`,
      label: `${el.ZielBerJahr || `(kein Jahr)`}: ${el.ZielBerErreichung || `(keine Entwicklung)`}`,
      table: `zielber`,
      row: el,
      expanded: el.ZielId === activeUrlElements.zielberFolder,
      url: [`Projekte`, projId, `Arten`, ApArtId, `AP-Ziele`, el.ZielJahr, el.ZielId, `Ziel-Berichte`, el.ZielBerId],
    }
  })
  // filter by node.nodeLabelFilter
  const filterString = store.node.nodeLabelFilter.get(`zielber`)
  if (filterString) {
    nodes = nodes.filter(p =>
      p.label.toLowerCase().includes(filterString.toLowerCase())
    )
  }
  // sort by label and return
  return sortBy(nodes, `label`)
}
