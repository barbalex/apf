import apNodes from './ap'

export default (store, projId) => {
  const { activeUrlElements } = store
  const myApNodes = apNodes(store, projId)
  let apNodesMessage = myApNodes.length
  if (store.table.apLoading) {
    apNodesMessage = `...`
  }
  if (store.node.nodeLabelFilter.get(`ap`)) {
    apNodesMessage = `${myApNodes.length} gefiltert`
  }

  return {
    nodeType: `folder`,
    menuType: `apFolder`,
    id: projId,
    label: `Arten (${apNodesMessage})`,
    expanded: activeUrlElements.apFolder,
    url: [`Projekte`, projId, `Arten`],
    children: myApNodes,
  }
}
