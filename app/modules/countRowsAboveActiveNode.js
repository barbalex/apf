import { findIndex } from 'lodash'

let globalCounter

const addExpandedChildren = (node) => {
  if (node && node.children && node.children.length && node.expanded) {
    globalCounter += node.children.length
    node.children.forEach(child => addExpandedChildren(child))
  }
}

const findActiveNodeInNodes = (nodes, activeNode, localCounter) => {
  if (!nodes) return
  const activeNodesIndex = findIndex(nodes, n => n.nodeId === activeNode.nodeId)
  if (activeNodesIndex > -1) {
    globalCounter += localCounter + activeNodesIndex + 1
    for (let i = 0; i < activeNodesIndex; i += 1) {
      addExpandedChildren(nodes[i])
    }
    return
  }
  nodes.forEach((node, index) => {
    if (node.children && node.children.length > 0 && node.expanded) {
      findActiveNodeInNodes(node.children, activeNode, localCounter + index + 1)
    }
  })
}

export default (nodes, activeNode, previousCount) => {
  // if anything goes wrong: return previous count
  if (!nodes) return previousCount
  if (!nodes.length) return previousCount
  if (!activeNode) return previousCount
  globalCounter = 0
  const localCounter = 0
  console.log('activeNode.urlPath:', activeNode.urlPath)
  findActiveNodeInNodes(nodes, activeNode, localCounter)
  // seems like this is always one too much
  if (globalCounter > 1) return globalCounter - 1
  return previousCount
}
