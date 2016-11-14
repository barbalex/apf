import { toJS } from 'mobx'
import getApNodes from './getApNodes'

export default (activeNode, nodes) => {
  let apNodes = getApNodes(activeNode, nodes) || []
  apNodes = toJS(apNodes)
  return apNodes.map(n => n.id)
}
