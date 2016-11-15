import intersection from 'lodash/intersection'

export default (node, activeNode) => {
  if (!node) return false
  if (!node.urlPath) return false
  if (!activeNode) return false
  if (!activeNode.urlPath) return false
  const samePathElements = intersection(activeNode.urlPath, node.urlPath)
  if (!samePathElements) return false
  if (!samePathElements.length) return false
  return samePathElements.length === node.urlPath.length
}
