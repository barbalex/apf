import { findIndex } from 'lodash'

let globalCounter

const findExpandedChildren = (node) => {
  if (node && node.children && node.children.length && node.expanded) {
    globalCounter += node.children.length
    node.children.forEach(child => findExpandedChildren(child))
  }
}

const findActiveNodeInNodes = (nodes, activeNode, localCounter) => {
  if (!nodes) return
  const activeNodesIndex = findIndex(nodes, n => n.nodeId === activeNode.nodeId)
  if (activeNodesIndex > -1) {
    globalCounter += localCounter + activeNodesIndex + 1
    nodes.forEach((node, index) => {
      if (index < activeNodesIndex) {
        findExpandedChildren(node)
      }
    })
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
  findActiveNodeInNodes(nodes, activeNode, 0)
  if (globalCounter > 0) return globalCounter
  return previousCount
}
