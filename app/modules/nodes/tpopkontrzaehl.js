import sortBy from 'lodash/sortBy'

export default ({ store, projId, apArtId, popId, tpopId, tpopkontrId }) => {
  const { activeUrlElements } = store
  // grab tpopkontrzaehl as array
  let tpopkontrzaehl = Array.from(store.table.tpopkontrzaehl.values())
  // show only nodes of active tpopkontr
  tpopkontrzaehl = tpopkontrzaehl.filter(a => a.TPopKontrId === tpopkontrId)

  // get entwicklungWerte
  const tpopEntwicklungWerte = Array.from(store.table.tpop_entwicklung_werte.values())

  // map through all projekt and create array of nodes
  let nodes = tpopkontrzaehl.map((el) => {

    const tpopEntwicklungWert = tpopEntwicklungWerte.find(e => e.EntwicklungCode === el.TPopBerEntwicklung)
    const entwicklungTxt = tpopEntwicklungWert ? tpopEntwicklungWert.EntwicklungTxt : null

    return {
      type: `row`,
      label: `${el.Anzahl || `(keine Anzahl)`} ${zaehleinheitTxt || `(keine Einheit)`} ${methodeTxt || `(keine Methode)`}`,
      table: `tpopkontrzaehl`,
      row: el,
      expanded: el.TPopKontrZaehlId === activeUrlElements.tpopkontrzaehl,
      url: [`Projekte`, projId, `Arten`, apArtId, `Populationen`, popId, `Teil-Populationen`, tpopId, `Kontroll-Berichte`, el.TPopKontrZaehlId],
    }
  })
  // filter by node.nodeLabelFilter
  const filterString = store.node.nodeLabelFilter.get(`tpopkontrzaehl`)
  if (filterString) {
    nodes = nodes.filter(p =>
      p.label.toLowerCase().includes(filterString.toLowerCase())
    )
  }
  // sort by label and return
  return sortBy(nodes, `label`)
}
