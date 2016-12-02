import uniq from 'lodash/uniq'
import sortBy from 'lodash/sortBy'
import buildZielNodes from './ziel'

export default (store) => {
  const { activeUrlElements } = store
  // grab ziele as array and sort them by year
  let ziele = Array.from(store.table.ziel.values())
  // show only nodes of active ap
  const activeAp = store.activeUrlElements.ap
  ziele = ziele.filter(a => a.ApArtId === activeAp)
  // filter by node.nodeLabelFilter
  const filterString = store.node.nodeLabelFilter.get(`zieljahr`)
  if (filterString) {
    ziele = ziele.filter((p) => {
      if (p.ZielJahr !== undefined && p.ZielJahr !== null) {
        return p.ZielJahr.toString().includes(filterString)
      }
      return false
    })
  }
  if (ziele.length > 0) {
    const projId = store.table.ap.get(activeAp).ProjId
    const zielJahre = uniq(ziele.map(z => z.ZielJahr))
    // map through all and create array of nodes
    const nodes = zielJahre.map((jahr) => {
      const zielNodes = buildZielNodes(store, jahr)
      return {
        type: `folder`,
        label: `${jahr == null ? `kein Jahr` : jahr} (${zielNodes.length})`,
        table: `ap`,
        expanded: jahr && jahr === activeUrlElements.zieljahr,
        url: [`Projekte`, projId, `Arten`, activeAp, `AP-Ziele`, jahr],
        children: zielNodes,
      }
    })
    // sort by label and return
    return sortBy(nodes, `label`)
  }
  return []
}
