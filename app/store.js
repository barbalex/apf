/**
 * Note: we are using singleton to make sure that it's one instance only,
 * because the store can be used outside react components, eg. routes.js
 * from: http://stackoverflow.com/questions/35850871/how-to-connect-state-to-props-with-mobx-js-observer-when-use-es6-class/36164488#36164488
 */
/* eslint-disable no-console */

import { observable, action, transaction } from 'mobx'
import $ from 'jquery'
import singleton from 'singleton'

import apiBaseUrl from './modules/apiBaseUrl'
import findNodeInTree from './modules/findNodeInTree'

class Store extends singleton {
  constructor() {
    super()
    this.fetchNodeChildren = this.fetchNodeChildren.bind(this)
    this.openNode = this.openNode.bind(this)
    this.fetchAllNodes = this.fetchAllNodes.bind(this)
    this.toggleNodeExpanded = this.toggleNodeExpanded.bind(this)
  }

  data = observable({
    nodes: [{
      nodeId: 'none',
      name: 'lade Daten...',
      expanded: false,
      children: [],
    }],
    loadingAllNodes: false,
    nodes2: [],
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
    (table, id = null, folder = null) => {
      this.data.loadingAllNodes = true
      fetch(`${apiBaseUrl}/node?table=${table}&id=${id}&folder=${folder}&levels=all`)
        .then(resp => resp.json())
        .then((nodes) => {
          transaction(() => {
            this.data.nodes.replace(nodes)
            this.data.loadingAllNodes = false
          })
        })
        .catch(error => console.log('error fetching nodes:', error))
    }
  )

  openNode = action(
    'openNode',
    (item) => {
      if (item) {
        // const activeNode = findNodeInTree(this.data.nodes, item.path)
        const activeNode = item
        // only show 'lade Daten...' if not yet loaded
        if (
          activeNode.children
          && activeNode.children.length === 1
          && activeNode.children[0] === 0
        ) {
          transaction(() => {
            activeNode.children.replace([{
              nodeId: `${item.nodeId}0`,
              name: 'lade Daten...',
              expanded: false,
              children: [],
            }])
            activeNode.expanded = true
            this.fetchNodeChildren(item)
          })
        } else {
          activeNode.expanded = true
        }
      }
    }
  )

  fetchNodeChildren = action(
    'fetchNodeChildren',
    (item) => {
      // const activeNode = findNodeInTree(this.data.nodes, item.path)
      const activeNode = item
      fetch(`${apiBaseUrl}/node?table=${item.table}&id=${item.id}&folder=${item.folder ? item.folder : null}`)
        .then(resp => resp.json())
        .then((nodes) => {
          transaction(() => {
            activeNode.children.replace(nodes)
          })
        })
    }
  )

  toggleNodeExpanded = action(
    'toggleNodeExpanded',
    (node) => {
      // TODO: gives an error
      const activeNode = node
      activeNode.expanded = !activeNode.expanded
    }
  )
}

export default Store.get()
