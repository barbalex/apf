/**
 * gets nodes and a path
 * finds the node that has same nodeId as first path element
 * if path contains more elements, recursively calls itself
 * returns found node
 */

const findNode = (nodes, pathPassed) => {
  const path = pathPassed.slice(0)
  const node = nodes.find(n => n.nodeId === path.shift())
  if (path.length > 0) {
    return findNode(node.children, path)
  }
  return node
}

export default findNode
