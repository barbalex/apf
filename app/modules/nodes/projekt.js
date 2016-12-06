import sortBy from 'lodash/sortBy'

export default (store) => {
  // grab projekte as array and sort them by name
  let projekte = Array.from(store.table.projekt.values())
  const { activeUrlElements } = store
  // filter by node.nodeLabelFilter
  const filterString = store.node.nodeLabelFilter.get(`projekt`)
  if (filterString) {
    projekte = projekte.filter(p => p.ProjName.toLowerCase().includes(filterString.toLowerCase()))
  }
  // sort
  projekte = sortBy(projekte, `ProjName`)
  // map through all projekt and create array of nodes
  return projekte.map(el => ({
    type: `row`,
    label: el.ProjName || `(kein Name)`,
    table: `projekt`,
    row: el,
    expanded: el.ProjId === activeUrlElements.projekt,
    url: [`Projekte`, el.ProjId],
    children: [
      {
        type: `folder`,
        label: `Arten (${store.apNodes.length})`,
        table: `projekt`,
        row: el,
        expanded: activeUrlElements.apFolder,
        url: [`Projekte`, el.ProjId, `Arten`],
        children: store.apNodes,
      },
      {
        type: `folder`,
        label: `AP-Berichte (${store.apberuebersichtNodes.length})`,
        table: `projekt`,
        row: el,
        expanded: activeUrlElements.apberuebersichtFolder,
        url: [`Projekte`, el.ProjId, `AP-Berichte`],
        children: store.apberuebersichtNodes,
      },
    ],
  }))
}
