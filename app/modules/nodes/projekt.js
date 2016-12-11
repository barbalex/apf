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
    menuType: `projekt`,
    id: el.ProjId,
    label: el.ProjName || `(kein Name)`,
    expanded: el.ProjId === activeUrlElements.projekt,
    url: [`Projekte`, el.ProjId],
    children: [
      {
        menuType: `apFolder`,
        label: `Arten (${store.apNodes.length})`,
        expanded: activeUrlElements.apFolder,
        url: [`Projekte`, el.ProjId, `Arten`],
        children: store.apNodes,
      },
      {
        menuType: `apberuebersichtFolder`,
        label: `AP-Berichte (${store.apberuebersichtNodes.length})`,
        expanded: activeUrlElements.apberuebersichtFolder,
        url: [`Projekte`, el.ProjId, `AP-Berichte`],
        children: store.apberuebersichtNodes,
      },
      {
        menuType: `exporte`,
        label: `Exporte`,
        expanded: activeUrlElements.exporte,
        url: [`Projekte`, el.ProjId, `Exporte`],
      },
    ],
  }))
}
