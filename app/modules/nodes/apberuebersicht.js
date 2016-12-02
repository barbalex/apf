import sortBy from 'lodash/sortBy'

export default (store) => {
  const { activeUrlElements } = store
  // grab apberuebersicht as array and sort them by year
  let apberuebersicht = Array.from(store.table.apberuebersicht.values())
  // show only nodes of active projekt
  const activeProjekt = store.activeUrlElements.projekt
  apberuebersicht = apberuebersicht.filter(a => a.ProjId === activeProjekt)
  // filter by node.nodeLabelFilter
  const filterString = store.node.nodeLabelFilter.get(`apberuebersicht`)
  if (filterString) {
    apberuebersicht = apberuebersicht.filter(p => p.JbuJahr.toString().includes(filterString))
  }
  // sort
  apberuebersicht = sortBy(apberuebersicht, `JbuJahr`)
  // map through all projekt and create array of nodes
  return apberuebersicht.map(el => ({
    type: `row`,
    label: el.JbuJahr,
    table: `apberuebersicht`,
    row: el,
    expanded: el.JbuJahr === activeUrlElements.apberuebersicht,
    url: [`Projekte`, el.ProjId, `AP-Berichte`, el.JbuJahr],
  }))
}
