/**
 * gets node
 * returns url path
 */

import getUrlNameFromTableName from './getUrlNameFromTableName'

const getUrlForNode = (node) => {
  const path = []
  node.path.forEach((el) => {
    path.push(getUrlNameFromTableName(el.table))
    if (el.id) path.push(el.id)
  })
  return `/${path.join('/')}`
}

export default getUrlForNode
