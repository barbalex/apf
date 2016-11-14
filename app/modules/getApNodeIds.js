import { toJS } from 'mobx'
import getApNodes from './getApNodes'

export default (activeNode, nodes) => {
    const apNodes = getApNodes(activeNode, nodes) || []

}
