import _ from 'underscore'

export default (node, activeNode) => {
  if (!node) return false
  if (!node.path) return false
  if (!activeNode) return false
  if (!activeNode.path) return false
  const samePathElements = _.intersection(activeNode.path, node.path)
  if (!samePathElements) return false
  if (!samePathElements.length) return false
  return samePathElements.length === node.path.length
}
