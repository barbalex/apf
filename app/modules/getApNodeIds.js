import { toJS } from 'mobx'
import getApNodes from './getApNodes'
import tables from './tables'

export default (activeNode, nodes) => {
  let apNodes = getApNodes(activeNode, nodes) || []
  apNodes = toJS(apNodes)
  const table = tables.find(t => t.tabelleInDb === activeNode.table)
  if (!table) return null
  const tabelleIdFeld = table.tabelleIdFeld
  return apNodes.map(n => n.row[tabelleIdFeld])
}
