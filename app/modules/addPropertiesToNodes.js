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
          const tbl = tables.find(t => t.tabelleInDb === n.table)
          if (!tbl || !tbl.rowLabel) return `(kein Name)`
          const label = tbl.rowLabel(n.row, store.data)
          if (!label) return `(kein Name)`
          return label
        })
      } else {
        n.label = computed(() => {
          if (n !== store.data.activeNode) return n.folderLabel
          const tbl = tables.find(t => t.tabelleInDb === n.folder)
          if (!tbl || !tbl.folderLabel) return n.folderLabel
          const label = tbl.folderLabel(n, store.data)
          if (!label) return n.folderLabel
          return label
        })
      }
      // add filtered children
      n.childrenFilteredByLabel = computed(() => {
        const filter = store.data.activeNodeChildrenLabelFilter
        if (n !== store.data.activeNode || !filter) return n.children
        return n.children.filter((c) => {
          if (!c.label || !c.label.toLowerCase()) return false
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