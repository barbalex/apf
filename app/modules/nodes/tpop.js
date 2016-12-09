import sortBy from 'lodash/sortBy'
import tpopberNodes from './tpopber'
import tpopmassnberNodes from './tpopmassnber'
import tpopmassnNodes from './tpopmassn'
import tpopfeldkontrNodes from './tpopfeldkontr'
import tpopfreiwkontrNodes from './tpopfreiwkontr'

export default ({ store, projId, apArtId, popId }) => {
  const { activeUrlElements } = store
  // grab tpop as array and sort them by year
  let tpop = Array.from(store.table.tpop.values())
  // show only nodes of active ap
  tpop = tpop.filter(a => a.PopId === popId)
  tpop = sortBy(tpop, `TPopNr`)
  // map through all projekt and create array of nodes
  let nodes = tpop.map((el) => {
    const myMassnNodes = tpopmassnNodes({ store, projId, apArtId, popId, tpopId: el.TPopId })
    const myMassnberNodes = tpopmassnberNodes({ store, projId, apArtId, popId, tpopId: el.TPopId })
    const myFeldkontrNodes = tpopfeldkontrNodes({ store, projId, apArtId, popId, tpopId: el.TPopId })
    const myFreiwkontrNodes = tpopfreiwkontrNodes({ store, projId, apArtId, popId, tpopId: el.TPopId })
    const myTpopberNodes = tpopberNodes({ store, projId, apArtId, popId, tpopId: el.TPopId })
    const myBeobNodes = []
    return {
      menuType: `tpop`,
      id: el.TPopId,
      label: `${el.TPopNr || `(keine Nr)`}: ${el.TPopFlurname || `(kein Flurname)`}`,
      expanded: el.TPopId === activeUrlElements.tpop,
      url: [`Projekte`, projId, `Arten`, apArtId, `Populationen`, el.PopId, `Teil-Populationen`, el.TPopId],
      children: [
        {
          menuType: `tpopmassnFolder`,
          label: `Massnahmen (${myMassnNodes.length})`,
          expanded: activeUrlElements.tpopmassnFolder,
          url: [`Projekte`, projId, `Arten`, apArtId, `Populationen`, el.PopId, `Teil-Populationen`, el.TPopId, `Massnahmen`],
          children: myMassnNodes,
        },
        {
          menuType: `tpopmassnberFolder`,
          label: `Massnahmen-Berichte (${myMassnberNodes.length})`,
          expanded: activeUrlElements.tpopmassnberFolder,
          url: [`Projekte`, projId, `Arten`, apArtId, `Populationen`, el.PopId, `Teil-Populationen`, el.TPopId, `Massnahmen-Berichte`],
          children: myMassnberNodes,
        },
        {
          menuType: `tpopfeldkontrFolder`,
          label: `Feld-Kontrollen (${myFeldkontrNodes.length})`,
          expanded: activeUrlElements.tpopfeldkontrFolder,
          url: [`Projekte`, projId, `Arten`, apArtId, `Populationen`, el.PopId, `Teil-Populationen`, el.TPopId, `Feld-Kontrollen`],
          children: myFeldkontrNodes,
        },
        {
          menuType: `tpopfreiwkontrFolder`,
          label: `Freiwilligen-Kontrollen (${myFreiwkontrNodes.length})`,
          expanded: activeUrlElements.tpopfreiwkontrFolder,
          url: [`Projekte`, projId, `Arten`, apArtId, `Populationen`, el.PopId, `Teil-Populationen`, el.TPopId, `Freiwilligen-Kontrollen`],
          children: myFreiwkontrNodes,
        },
        {
          menuType: `tpopberFolder`,
          label: `Kontroll-Berichte (${myTpopberNodes.length})`,
          expanded: activeUrlElements.tpopberFolder,
          url: [`Projekte`, projId, `Arten`, apArtId, `Populationen`, el.PopId, `Teil-Populationen`, el.TPopId, `Kontroll-Berichte`],
          children: myTpopberNodes,
        },
        {
          menuType: `tpopbeobFolder`,
          label: `Beobachtungen (${myBeobNodes.length})`,
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
