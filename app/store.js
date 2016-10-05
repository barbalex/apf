/**
 * Note: we are using singleton to make sure that it's one instance only,
 * because the store can be used outside react components, eg. routes.js
 * from: http://stackoverflow.com/questions/35850871/how-to-connect-state-to-props-with-mobx-js-observer-when-use-es6-class/36164488#36164488
 */
/* eslint-disable no-console, no-param-reassign */

import { observable, action, transaction, reaction } from 'mobx'
import $ from 'jquery'
import singleton from 'singleton'

import getNodeByPath from './modules/getNodeByPath'
import apiBaseUrl from './modules/apiBaseUrl'
import fetchDataset from './modules/fetchDataset'
import tables from './modules/tables'

const noneNode = {
  nodeId: 'none',
  name: 'this seems to be needed for mobx',
  expanded: false,
  children: [],
}

class Store extends singleton {
  constructor() {
    super()
    this.fetchNodeChildren = this.fetchNodeChildren.bind(this)
    this.openNode = this.openNode.bind(this)
    this.closeNode = this.closeNode.bind(this)
    this.fetchAllNodes = this.fetchAllNodes.bind(this)
    this.keepActiveNodeDatasetUpToDate = this.keepActiveNodeDatasetUpToDate.bind(this)
  }

  data = observable({
    nodes: [noneNode],
    loadingAllNodes: false,
    nodes2: [noneNode],
    activeNode: null,
    activeDataset: null,
    map: null,
    user: null,
  })

  ui = observable({
    windowWidth: $(window).width(),
    windowHeight: $(window).height(),
    projekte: {
      strukturbaum: {
        visible: true,
        activeTab: 'strukturbaum',
      },
      strukturbaum2: {
        visible: false,
        strukturbaumActive: true,
      },
      daten: {
        visible: true,
      },
      karte: {
        visible: false,
      },
    },
  })

  fetchAllNodes = action(
    'fetchAllNodes',
    (path) => {
      const lastPathElement = path[path.length - 1]
      const { table, id, folder } = lastPathElement
      this.data.loadingAllNodes = true
      fetch(`${apiBaseUrl}/node?table=${table}&id=${id}&folder=${folder}&levels=all`)
        .then(resp => resp.json())
        .then((nodes) => {
          transaction(() => {
            this.data.nodes.replace(nodes)
            this.data.loadingAllNodes = false
          })
          // TODO: set project node as active node
          const activeNode = getNodeByPath(this.data.nodes, path)
          if (activeNode) this.data.activeNode = activeNode
        })
        .catch(error => console.log('error fetching nodes:', error))
    }
  )

  openNode = action(
    'openNode',
    (node) => {
      if (node) {
        transaction(() => {
          node.expanded = true
          this.data.activeNode = node
        })
        // only show 'lade Daten...' if not yet loaded
        if (
          node.children
          && node.children.length === 1
          && node.children[0] === 0
        ) {
          transaction(() => {
            node.children.replace([{
              nodeId: `${node.nodeId}0`,
              name: 'lade Daten...',
              expanded: false,
              children: [],
            }])
            this.fetchNodeChildren(node)
          })
        }
      }
    }
  )

  fetchNodeChildren = action(
    'fetchNodeChildren',
    (node) => {
      fetch(`${apiBaseUrl}/node?table=${node.table}&id=${node.id}&folder=${node.folder ? node.folder : null}`)
        .then(resp => resp.json())
        .then((nodes) => {
          transaction(() => {
            node.children.replace(nodes)
          })
        })
    }
  )

  closeNode = action(
    'closeNode',
    (node) => {
      const path = node.path.slice(0)
      path.pop()
      const newActiveNode = getNodeByPath(this.data.nodes, path)
      transaction(() => {
        node.expanded = false
        this.data.activeNode = newActiveNode
      })
    }
  )

  fetchActiveNodeDataset = action(
    'fetchActiveNodeDataset',
    ({ table, field, value }) =>
      fetchDataset({ table, field, value })
        .then((dataset) => {
          transaction(() => {
            this.data.activeDataset = dataset
          })
        })
        .catch((error) => {
          throw error
        })
  )

  keepActiveNodeDatasetUpToDate = reaction(
    () => this.data.activeNode,
    (activeNode) => {
      if (!activeNode || !activeNode.table) {
        this.data.activeDataset = null
      } else {
        const myTable = tables.find(t => t.tabelleInDb && t.tabelleInDb === activeNode.table)
        if (!myTable) {
          throw new Error(`Table ${activeNode.table} not found in 'modules/table'`)
        }
        const table = activeNode.table
        const field = myTable.tabelleIdFeld
        const value = activeNode.id
        this.fetchActiveNodeDataset({ table, field, value })
      }
    }
  )
}

export default Store.get()
