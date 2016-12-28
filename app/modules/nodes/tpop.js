import sortBy from 'lodash/sortBy'
import tpopberNodes from './tpopber'
import tpopmassnberNodes from './tpopmassnber'
import tpopmassnNodes from './tpopmassn'
import tpopfeldkontrNodes from './tpopfeldkontr'
import tpopfreiwkontrNodes from './tpopfreiwkontr'
import tpopbeobNodes from './tpopbeob'

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
    const myTpopbeobNodes = tpopbeobNodes({ store, tpopId: el.TPopId })
    return {
      nodeType: `table`,
      menuType: `tpop`,
      id: el.TPopId,
      parentId: el.PopId,
      label: `${el.TPopNr || `(keine Nr)`}: ${el.TPopFlurname || `(kein Flurname)`}`,
      expanded: el.TPopId === activeUrlElements.tpop,
      url: [`Projekte`, projId, `Arten`, apArtId, `Populationen`, el.PopId, `Teil-Populationen`, el.TPopId],
      children: [
        {
          nodeType: `folder`,
          menuType: `tpopmassnFolder`,
          id: el.TPopId,
          label: `Massnahmen (${myMassnNodes.length})`,
          expanded: activeUrlElements.tpopmassnFolder,
          url: [`Projekte`, projId, `Arten`, apArtId, `Populationen`, el.PopId, `Teil-Populationen`, el.TPopId, `Massnahmen`],
          children: myMassnNodes,
        },
        {
          nodeType: `folder`,
          menuType: `tpopmassnberFolder`,
          id: el.TPopId,
          label: `Massnahmen-Berichte (${myMassnberNodes.length})`,
          expanded: activeUrlElements.tpopmassnberFolder,
          url: [`Projekte`, projId, `Arten`, apArtId, `Populationen`, el.PopId, `Teil-Populationen`, el.TPopId, `Massnahmen-Berichte`],
          children: myMassnberNodes,
        },
        {
          nodeType: `folder`,
          menuType: `tpopfeldkontrFolder`,
          id: el.TPopId,
          label: `Feld-Kontrollen (${myFeldkontrNodes.length})`,
          expanded: activeUrlElements.tpopfeldkontrFolder,
          url: [`Projekte`, projId, `Arten`, apArtId, `Populationen`, el.PopId, `Teil-Populationen`, el.TPopId, `Feld-Kontrollen`],
          children: myFeldkontrNodes,
        },
        {
          nodeType: `folder`,
          menuType: `tpopfreiwkontrFolder`,
          id: el.TPopId,
          label: `Freiwilligen-Kontrollen (${myFreiwkontrNodes.length})`,
          expanded: activeUrlElements.tpopfreiwkontrFolder,
          url: [`Projekte`, projId, `Arten`, apArtId, `Populationen`, el.PopId, `Teil-Populationen`, el.TPopId, `Freiwilligen-Kontrollen`],
          children: myFreiwkontrNodes,
        },
        {
          nodeType: `folder`,
          menuType: `tpopberFolder`,
          id: el.TPopId,
          label: `Kontroll-Berichte (${myTpopberNodes.length})`,
          expanded: activeUrlElements.tpopberFolder,
          url: [`Projekte`, projId, `Arten`, apArtId, `Populationen`, el.PopId, `Teil-Populationen`, el.TPopId, `Kontroll-Berichte`],
          children: myTpopberNodes,
        },
        {
          nodeType: `folder`,
          menuType: `tpopbeobFolder`,
          id: el.TPopId,
          label: `Beobachtungen (${myTpopbeobNodes.length})`,
          expanded: activeUrlElements.tpopbeobFolder,
          url: [`Projekte`, projId, `Arten`, apArtId, `Populationen`, el.PopId, `Teil-Populationen`, el.TPopId, `Beobachtungen`],
          children: myTpopbeobNodes,
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
