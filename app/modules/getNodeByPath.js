/**
 * gets nodes and a path
 * finds the node that has same nodeId as first path element
 * if path contains more elements, recursively calls itself
 * returns found node
 * or null if path contains no elements
 */

const findNode = (nodes, pathPassed) => {
  const path = pathPassed.slice(0)
  if (path.length === 0) {
    return null
  }
  const el = path.shift()
  const node = nodes.find((n) => {
    if (el.folder) {
      return n.nodeId === `${el.table}/${el.id}/${el.folder}`
    }
    return n.nodeId === `${el.table}/${el.id}}`
  })
  if (path.length > 0 && node.children) {
    return findNode(node.children, path)
  }
  return node
}

const getNodeByPath = (nodes, pathPassed) => {
  const path = pathPassed.slice(0)
  if (path.length === 0) {
    return null
  }
  return findNode(nodes, path)
}

export default getNodeByPath
