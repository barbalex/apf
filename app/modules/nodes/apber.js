import sortBy from 'lodash/sortBy'

export default (store) => {
  const { activeUrlElements } = store
  // grab apber as array and sort them by year
  let apber = Array.from(store.table.apber.values())
  // show only nodes of active ap
  const activeAp = store.activeUrlElements.ap
  apber = apber.filter(a => a.ApArtId === activeAp)
  // filter by node.nodeLabelFilter
  const filterString = store.node.nodeLabelFilter.get(`apber`)
  if (filterString) {
    apber = apber.filter((p) => {
      if (p.JBerJahr !== undefined && p.JBerJahr !== null) {
        return p.JBerJahr.toString().includes(filterString)
      }
      return false
    })
  }
  // sort
  apber = sortBy(apber, `JBerJahr`)
  // map through all projekt and create array of nodes
  return apber.map((el) => {
    const projId = store.table.ap.get(el.ApArtId).ProjId
    return {
      type: `row`,
      label: el.JBerJahr || `(kein Jahr)`,
      table: `apber`,
      row: el,
      expanded: el.JBerJahr === activeUrlElements.apber,
      url: [`Projekte`, projId, `Arten`, el.ApArtId, `AP-Berichte`, el.JBerId],
    }
  })
}
