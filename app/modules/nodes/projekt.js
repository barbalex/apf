import sortBy from 'lodash/sortBy'

import apberuebersichtNodes from './apberuebersicht'
import apFolderNode from './apFolder'

export default (store) => {
  // grab projekte as array and sort them by name
  let projekte = Array.from(store.table.projekt.values())
  const { activeUrlElements } = store
  // filter by node.nodeLabelFilter
  const filterString = store.node.nodeLabelFilter.get(`projekt`)
  if (filterString) {
    projekte = projekte.filter(p =>
      p.ProjName
        .toLowerCase()
        .includes(filterString.toLowerCase())
    )
  }
  // sort
  projekte = sortBy(projekte, `ProjName`)
  // map through all projekt and create array of nodes
  return projekte.map((el) => {
    const myApberuebersichtnodes = apberuebersichtNodes(store, el.ProjId)

    return {
      nodeType: `table`,
      menuType: `projekt`,
      id: el.ProjId,
      label: el.ProjName || `(kein Name)`,
      expanded: el.ProjId === activeUrlElements.projekt,
      url: [`Projekte`, el.ProjId],
      children: [
        apFolderNode(store, el.ProjId),
        {
          menuType: `apberuebersichtFolder`,
          id: el.ProjId,
          label: `AP-Berichte (${myApberuebersichtnodes.length})`,
          expanded: activeUrlElements.apberuebersichtFolder,
          url: [`Projekte`, el.ProjId, `AP-Berichte`],
          children: myApberuebersichtnodes,
        },
        {
          menuType: `exporte`,
          id: el.ProjId,
          label: `Exporte`,
          expanded: activeUrlElements.exporte,
          url: [`Projekte`, el.ProjId, `Exporte`],
        },
      ],
    }
  })
}
