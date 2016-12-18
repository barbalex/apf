import sortBy from 'lodash/sortBy'
import zielberNodes from './zielber'

export default (store, jahr) => {
  const { activeUrlElements } = store
  // grab ziele as array
  let ziele = Array.from(store.table.ziel.values())
  // show only nodes of active ap
  const activeAp = store.activeUrlElements.ap
  ziele = ziele.filter(a => a.ApArtId === activeAp)
  // show only nodes of active zieljahr
  ziele = ziele.filter((a) => {
    if (jahr === null || jahr === undefined) {
      return a.ZielJahr !== 0 && !a.ZielJahr
    }
    return a.ZielJahr === jahr
  })
  // get zielWerte
  const zieltypWerte = Array.from(store.table.ziel_typ_werte.values())
  // map through all and create array of nodes
  let nodes = ziele.map((el) => {
    const projId = store.table.ap.get(el.ApArtId).ProjId
    const zielWert = zieltypWerte.find(e => e.ZieltypId === el.ZielTyp)
    const zieltypTxt = zielWert ? zielWert.ZieltypTxt : `kein Zieltyp`
    const myZielberNodes = zielberNodes(store, el.ZielId)
    return {
      menuType: `ziel`,
      id: el.ZielId,
      label: `${el.ZielBezeichnung || `(kein Ziel)`} (${zieltypTxt})`,
      expanded: el.ZielId === activeUrlElements.ziel,
      url: [`Projekte`, projId, `Arten`, el.ApArtId, `AP-Ziele`, el.ZielJahr, el.ZielId],
      children: [
        {
          menuType: `zielberFolder`,
          id: el.ZielId,
          label: `Berichte (${myZielberNodes.length})`,
          expanded: el.ZielId === activeUrlElements.ziel && activeUrlElements.zielberFolder,
          url: [`Projekte`, projId, `Arten`, el.ApArtId, `AP-Ziele`, el.ZielJahr, el.ZielId, `Berichte`],
          children: myZielberNodes,
        },
      ],
    }
  })
  // filter by node.nodeLabelFilter
  const filterString = store.node.nodeLabelFilter.get(`ziel`)
  if (filterString) {
    nodes = nodes.filter(p =>
      p.label.toLowerCase().includes(filterString.toLowerCase())
    )
  }
  // sort by label and return
  return sortBy(nodes, `label`)
}
