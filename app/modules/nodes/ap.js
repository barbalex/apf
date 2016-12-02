import sortBy from 'lodash/sortBy'

export default (store) => {
  const { activeUrlElements } = store
  // grab ape as array and sort them by name
  let ap = Array.from(store.table.ap.values())
  // show only ap of active projekt
  const activeProjekt = store.activeUrlElements.projekt
  ap = ap.filter(a => a.ProjId === activeProjekt)
  // map through all ap and create array of nodes
  let nodes = ap.map((el) => {
    let label = `...`
    const { adb_eigenschaften } = store.table
    if (adb_eigenschaften.size > 0) {
      label = adb_eigenschaften.get(el.ApArtId).Artname
    }
    return {
      type: `row`,
      label,
      table: `ap`,
      row: el,
      expanded: el.ApArtId === activeUrlElements.ap,
      url: [`Projekte`, el.ProjId, `Arten`, el.ApArtId],
      children: [
        // pop folder
        {
          type: `folder`,
          label: `Populationen. TODO: add number`,
          table: `ap`,
          row: el,
          id: el.ApArtId,
          expanded: activeUrlElements.popFolder,
          url: [`Projekte`, el.ProjId, `Arten`, el.ApArtId, `Populationen`],
          children: [],
        },
        // ziel folder
        {
          type: `folder`,
          label: `AP-Ziele`,
          table: `ap`,
          row: el,
          id: el.ApArtId,
          expanded: activeUrlElements.zielFolder,
          url: [`Projekte`, el.ProjId, `Arten`, el.ApArtId, `AP-Ziele`],
          children: store.zieljahreNodes,
        },
        // erfkrit folder
        {
          type: `folder`,
          label: `AP-Erfolgskriterien (${store.erfkritNodes.length})`,
          table: `ap`,
          row: el,
          id: el.ApArtId,
          expanded: activeUrlElements.erfkritFolder,
          url: [`Projekte`, el.ProjId, `Arten`, el.ApArtId, `AP-Erfolgskriterien`],
          children: store.erfkritNodes,
        },
        // apber folder
        {
          type: `folder`,
          label: `AP-Berichte (${store.apberNodes.length})`,
          table: `ap`,
          row: el,
          id: el.ApArtId,
          expanded: activeUrlElements.apberFolder,
          url: [`Projekte`, el.ProjId, `Arten`, el.ApArtId, `AP-Berichte`],
          children: store.apberNodes,
        },
        // ber folder
        {
          type: `folder`,
          label: `Berichte (${store.berNodes.length})`,
          table: `ap`,
          row: el,
          id: el.ApArtId,
          expanded: activeUrlElements.berFolder,
          url: [`Projekte`, el.ProjId, `Arten`, el.ApArtId, `Berichte`],
          children: store.berNodes,
        },
        // beobNichtBeurteilt folder
        {
          type: `folder`,
          label: `nicht beurteilte Beobachtungen. TODO: add number`,
          table: `ap`,
          row: el,
          id: el.ApArtId,
          expanded: activeUrlElements.beobzuordnungFolder,
          url: [`Projekte`, el.ProjId, `Arten`, el.ApArtId, `nicht-beurteilte-Beobachtungen`],
          children: [],
        },
        // beobNichtZuzuordnen folder
        {
          type: `folder`,
          label: `nicht zuzuordnende Beobachtungen. TODO: add number`,
          table: `ap`,
          row: el,
          id: el.ApArtId,
          expanded: activeUrlElements.beobNichtZuzuordnenFolder,
          url: [`Projekte`, el.ProjId, `Arten`, el.ApArtId, `nicht-zuzuordnende-Beobachtungen`],
          children: [],
        },
        // idealbiotop folder
        {
          type: `folder`,
          label: `Idealbiotop`,
          table: `idealbiotop`,
          row: el,
          id: el.ApArtId,
          expanded: activeUrlElements.idealbiotopFolder,
          url: [`Projekte`, el.ProjId, `Arten`, el.ApArtId, `Idealbiotop`],
        },
        // assozarten folder
        {
          type: `folder`,
          label: `assoziierte Arten (${store.assozartNodes.length})`,
          table: `ap`,
          row: el,
          id: el.ApArtId,
          expanded: activeUrlElements.assozartFolder,
          url: [`Projekte`, el.ProjId, `Arten`, el.ApArtId, `assoziierte-Arten`],
          children: store.assozartNodes,
        },
        // qk folder
        {
          type: `folder`,
          label: `Qualitätskontrollen`,
          table: `ap`,
          row: el,
          id: el.ApArtId,
          expanded: false,
          url: [`Projekte`, el.ProjId, `Arten`, el.ApArtId, `Qualitätskontrollen`],
        },
      ],
    }
  })
  // filter by node.nodeLabelFilter
  const filterString = store.node.nodeLabelFilter.get(`ap`)
  if (filterString) {
    nodes = nodes.filter(p =>
      p.label.toLowerCase().includes(filterString.toLowerCase())
    )
  }
  // sort by label and return
  return sortBy(nodes, `label`)
}
