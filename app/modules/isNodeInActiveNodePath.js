import intersection from 'lodash/intersection'

export default (node, activeUrl) => {
  console.log(`isNodeInActiveNodePath: node:`, node)
  console.log(`isNodeInActiveNodePath: activeUrl:`, activeUrl)
  if (!node) return false
  if (!node.url) return false
  if (!activeUrl) return false
  const samePathElements = intersection(activeUrl, node.url)
  console.log(`isNodeInActiveNodePath: samePathElements:`, samePathElements)
  if (!samePathElements) return false
  if (!samePathElements.length) return false
  return samePathElements.length === node.url.length
}
