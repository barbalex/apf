/**
 * gets node
 * returns url path
 */

import tableToUrlName from './tableToUrlName'

const urlFromNode = (node) => {
  const path = []
  node.path.forEach((el) => {
    path.push(tableToUrlName(el.table))
    if (el.id) path.push(el.id)
  })
  return `/${path.join('/')}`
}

export default urlFromNode
