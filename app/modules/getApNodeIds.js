import { toJS } from 'mobx'
import getApNodes from './getApNodes'
import tables from './tables'

export default (activeNode, nodes) => {
  let apNodes = getApNodes(activeNode, nodes) || []
  apNodes = toJS(apNodes)
  const table = tables.find(t => t.table === activeNode.table)
  if (!table) return null
  const idField = table.idField
  return apNodes.map(n => n.row[idField])
}
