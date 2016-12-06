import sortBy from 'lodash/sortBy'
import tpopberNodes from './tpopber'
import tpopmassnberNodes from './tpopmassnber'

export default ({ store, projId, apArtId, popId }) => {
  const { activeUrlElements } = store
  // grab tpop as array and sort them by year
  let tpop = Array.from(store.table.tpop.values())
  // show only nodes of active ap
  tpop = tpop.filter(a => a.PopId === popId)
  tpop = sortBy(tpop, `TPopNr`)
  // map through all projekt and create array of nodes
  let nodes = tpop.map((el) => {
    const myMassnNodes = []
    const myMassnberNodes = tpopmassnberNodes({ store, projId, apArtId, popId, tpopId: el.TPopId })
    const myFeldkontrNodes = []
    const myFreiwkontrNodes = []
    const myTpopberNodes = tpopberNodes({ store, projId, apArtId, popId, tpopId: el.TPopId })
    const myBeobNodes = []
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
          label: `Massnahmen (${myMassnNodes.length})`,
          table: `tpop`,
          row: `el`,
          expanded: activeUrlElements.tpopmassnFolder,
          url: [`Projekte`, projId, `Arten`, apArtId, `Populationen`, el.PopId, `Teil-Populationen`, el.TPopId, `Massnahmen`],
          children: myMassnNodes,
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
        {
          type: `folder`,
          label: `Feld-Kontrollen (${myFeldkontrNodes.length})`,
          table: `tpop`,
          row: `el`,
          expanded: activeUrlElements.tpopfeldkontrFolder,
          url: [`Projekte`, projId, `Arten`, apArtId, `Populationen`, el.PopId, `Teil-Populationen`, el.TPopId, `Feld-Kontrollen`],
          children: myFeldkontrNodes,
        },
        {
          type: `folder`,
          label: `Freiwilligen-Kontrollen (${myFreiwkontrNodes.length})`,
          table: `tpop`,
          row: `el`,
          expanded: activeUrlElements.tpopfeldkontrFolder,
          url: [`Projekte`, projId, `Arten`, apArtId, `Populationen`, el.PopId, `Teil-Populationen`, el.TPopId, `Freiwilligen-Kontrollen`],
          children: myFreiwkontrNodes,
        },
        {
          type: `folder`,
          label: `Kontroll-Berichte (${myTpopberNodes.length})`,
          table: `tpop`,
          row: `el`,
          expanded: activeUrlElements.tpopberFolder,
          url: [`Projekte`, projId, `Arten`, apArtId, `Populationen`, el.PopId, `Teil-Populationen`, el.TPopId, `Kontroll-Berichte`],
          children: myTpopberNodes,
        },
        {
          type: `folder`,
          label: `Beobachtungen (${myBeobNodes.length})`,
          table: `tpop`,
          row: `el`,
          expanded: activeUrlElements.tpopbeobFolder,
          url: [`Projekte`, projId, `Arten`, apArtId, `Populationen`, el.PopId, `Teil-Populationen`, el.TPopId, `Beobachtungen`],
          children: myBeobNodes,
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
