import getApNodes from './getApNodes'
import tables from './tables'

export default (ApArtId, activeNode, nodes) => {
  if (!ApArtId) return null
  const apNodes = getApNodes(activeNode, nodes) || []
  const table = tables.find(t => t.table === activeNode.table)
  if (!table) return null
  const idField = table.idField
  return apNodes.find(n => n.row[idField] === ApArtId)
}
