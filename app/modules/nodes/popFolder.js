import popNodes from './pop'

export default (store, projId, apArtId) => {
  const { activeUrlElements } = store
  const myPopNodes = popNodes(store, apArtId)

  return {
    nodeType: `folder`,
    menuType: `popFolder`,
    id: apArtId,
    label: `Populationen (${myPopNodes.length})`,
    expanded: activeUrlElements.popFolder,
    url: [`Projekte`, projId, `Arten`, apArtId, `Populationen`],
    children: myPopNodes,
  }
}
