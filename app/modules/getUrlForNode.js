/**
 * gets node
 * returns url path
 */

import getUrlNameFromTableName from './getUrlNameFromTableName'

const getUrlForNode = (node) => {
  if (!node || !node.path || !node.path.length) {
    return '/Projekte'
  }
  const path = []
  node.path.forEach((el, index) => {
    path.push(getUrlNameFromTableName(el.table))
    // make sure id is not added to last path element
    // if node is not expanded
    if (
      (el.id && (index < node.path.length - 1))
      || (el.id && (node.expanded))
    ) {
      path.push(el.id)
    }
  })
  return `/${path.join('/')}`
}

export default getUrlForNode
