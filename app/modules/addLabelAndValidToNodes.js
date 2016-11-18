import { computed } from 'mobx'
import isPlainObject from 'lodash/isPlainObject'
import tables from './tables'

const addLabelAndValidToNodes = (allNodes, topLevelNodes, store) => {
  if (!topLevelNodes || !topLevelNodes.length) {
    return
  }
  topLevelNodes.forEach((n) => {
    if (isPlainObject(n)) {
      // add label to data nodes
      if (!n.folder) {
        n.label = computed(() => {
          const tbl = tables.find(t => t.tabelleInDb === n.table)
          if (!tbl || !tbl.label) return `(kein Name)`
          const label = tbl.label(n.row, store.data)
          if (!label) return `(kein Name)`
          return label
        })
      }
      // add row of data node to folder nodes
      if (n.folder) {
        const dataNodeId = n.nodeIdPath[n.nodeIdPath.length - 2]
        if (dataNodeId) {
          const dataNode = allNodes.find(node => node.nodeId === dataNodeId)
          if (dataNode && dataNode.row) {
            n.row = dataNode.row
          }
        }
      }
      // add valid to all nodes
      const validObject = {}
      Object.keys(n.row).forEach((k) => {
        validObject[k] = ``
      })
      n.valid = validObject
      if (n.children && n.children.length) {
        addLabelAndValidToNodes(allNodes, n.children, store)
      }
    }
  })
}

export default addLabelAndValidToNodes
