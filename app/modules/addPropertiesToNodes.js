import { computed } from 'mobx'
import isPlainObject from 'lodash/isPlainObject'
import tables from './tables'

const addPropertiesToNodes = (allNodes, topLevelNodes, store) => {
  if (!topLevelNodes || !topLevelNodes.length) {
    return
  }
  topLevelNodes.forEach((n) => {
    if (isPlainObject(n)) {
      // add label to data nodes
      if (!n.folder) {
        n.label = computed(() => {
          const tbl = tables.find(t => t.table === n.table)
          if (!tbl || !tbl.label) return `(kein Name)`
          const label = tbl.label(n.row, store.table)
          if (!label) return `(kein Name)`
          return label
        })
      } else {
        n.label = computed(() => {
          const tbl = tables.find(t => t.table === n.folder)
          const label = tbl.folderLabel(n, store.table)
          if (!label) return n.folderLabel
          return label
        })
      }
      // add filtered children
      n.childrenFilteredByLabel = computed(() => {
        const filter = store.node.nodeLabelFilter[n.folder || n.table]
        if (!filter) return n.children
        return n.children.filter((c) => {
          if (!c.label || !c.label.toLowerCase) return false
          if (c.label.toString) return c.label.toString().includes(filter)
          return c.label.toLowerCase().includes(filter)
        })
      })
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
        addPropertiesToNodes(allNodes, n.children, store)
      }
    }
  })
}

export default addPropertiesToNodes
