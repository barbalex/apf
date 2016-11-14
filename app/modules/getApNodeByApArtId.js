import getApNodes from './getApNodes'

export default (ApArtId, activeNode, nodes) => {
  if (!ApArtId) return null
  const apNodes = getApNodes(activeNode, nodes) || []
  return apNodes.find(n => n.id === ApArtId)
}
