import { computed } from 'mobx'
import isPlainObject from 'lodash/isPlainObject'
import tables from './tables'

const addLabelAndValidToNodes = (nodes, store) => {
  if (!nodes || !nodes.length) {
    return
  }
  nodes.forEach((n) => {
    if (isPlainObject(n)) {
      if (!n.folder) {
        n.label = computed(() => {
          const tbl = tables.find(t => t.tabelleInDb === n.table)
          if (!tbl || !tbl.label) return `(kein Name)`
          const label = tbl.label(n.row, store.data)
          if (!label) return `(kein Name)`
          return label
        })
      }
      const validObject = {}
      Object.keys(n.row).forEach((k) => {
        validObject[k] = ``
      })
      n.valid = validObject
      if (n.children && n.children.length) {
        addLabelAndValidToNodes(n.children, store)
      }
    }
  })
}

export default addLabelAndValidToNodes
