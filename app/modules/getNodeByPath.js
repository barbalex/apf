/**
 * gets nodes and a path
 * finds the node that has same nodeId as first path element
 * if path contains more elements, recursively calls itself
 * returns found node
 */

const findNode = (nodes, pathPassed) => {
  const path = pathPassed.slice(0)
  const el = path.shift()
  const node = nodes.find(n => n.nodeId === `${el.table}/${el.id}`)
  if (path.length > 0 && node.children) {
    return findNode(node.children, path)
  }
  return node
}

export default findNode
