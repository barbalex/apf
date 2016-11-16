import getApNodes from './getApNodes'
import tables from './tables'

export default (ApArtId, activeNode, nodes) => {
  if (!ApArtId) return null
  const apNodes = getApNodes(activeNode, nodes) || []
  const table = tables.find(t => t.tabelleInDb === activeNode.table)
  if (!table) return null
  const tabelleIdFeld = table.tabelleIdFeld
  return apNodes.find(n => n.row[tabelleIdFeld] === ApArtId)
}
