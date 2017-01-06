export default (store, projId, apArtId) =>
  ({
    nodeType: `folder`,
    menuType: `qkFolder`,
    id: apArtId,
    label: `Qualitätskontrollen`,
    expanded: false,
    url: [`Projekte`, projId, `Arten`, apArtId, `Qualitaetskontrollen`],
  })
