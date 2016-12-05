import sortBy from 'lodash/sortBy'

export default ({ store, projId, apArtId, popId }) => {
  const { activeUrlElements } = store
  // grab tpop as array and sort them by year
  let tpop = Array.from(store.table.tpop.values())
  // show only nodes of active ap
  tpop = tpop.filter(a => a.PopId === popId)
  tpop = sortBy(tpop, `TPopNr`)
  // map through all projekt and create array of nodes
  let nodes = tpop.map((el) => {
    // const myMassnberNodes = massnberNodes({ store, projId, apArtId, popId, tpopId: el.TPopId })
    // const myPopberNodes = popberNodes({ store, projId, apArtId, popId, tpopId: el.TPopId })
    const myMassnberNodes = []
    const myPopberNodes = []
    return {
      type: `row`,
      label: `${el.TPopNr || `(keine Nr)`}: ${el.TPopFlurname || `(kein Flurname)`}`,
      table: `tpop`,
      row: el,
      expanded: el.TPopId === activeUrlElements.tpop,
      url: [`Projekte`, projId, `Arten`, apArtId, `Populationen`, el.PopId, `Teil-Populationen`, el.TPopId],
      children: [
        {
          type: `folder`,
          label: `Kontroll-Berichte (${myPopberNodes.length})`,
          table: `tpop`,
          row: `el`,
          expanded: activeUrlElements.tpopberFolder,
          url: [`Projekte`, projId, `Arten`, apArtId, `Populationen`, el.PopId, `Teil-Populationen`, el.TPopId, `Kontroll-Berichte`],
          children: myPopberNodes,
        },
        {
          type: `folder`,
          label: `Massnahmen-Berichte (${myMassnberNodes.length})`,
          table: `tpop`,
          row: `el`,
          expanded: activeUrlElements.tpopmassnberFolder,
          url: [`Projekte`, projId, `Arten`, apArtId, `Populationen`, el.PopId, `Teil-Populationen`, el.TPopId, `Massnahmen-Berichte`],
          children: myMassnberNodes,
        },
      ],
    }
  })
  // filter by node.nodeLabelFilter
  const filterString = store.node.nodeLabelFilter.get(`tpop`)
  if (filterString) {
    nodes = nodes.filter(p =>
      p.label.toLowerCase().includes(filterString.toLowerCase())
    )
  }
  // sort by label and return
  return nodes
}
