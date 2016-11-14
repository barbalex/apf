const getApNodes = (activeNode, nodes) => {
  const projNodeId = activeNode.nodeIdPath[0]
  const apFolderNodeId = activeNode.nodeIdPath[1]
  const projNode = nodes.find(n => n.nodeId === projNodeId) || []
  const apFolderNode = projNode.children.find(n => n.nodeId === apFolderNodeId) || []
  return apFolderNode.children || []
}

export default getApNodes
