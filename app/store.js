/**
 * Note: we are using singleton to make sure that it's one instance only,
 * because the store can be used outside react components, eg. routes.js
 * from: http://stackoverflow.com/questions/35850871/how-to-connect-state-to-props-with-mobx-js-observer-when-use-es6-class/36164488#36164488
 */
/* eslint-disable no-console*/
// import { observable } from 'mobx-react'  // reason for HORRIBLE webpack error????
import mobx, { observable, extendObservable, action, transaction } from 'mobx'
import $ from 'jquery'
import singleton from 'singleton'

import apiBaseUrl from './modules/apiBaseUrl'
import findNodeInTree from './modules/findNodeInTree'

class Store extends singleton {
  constructor() {
    super()
    this.actions.fetchNodes = this.actions.fetchNodes.bind(this)
    this.actions.fetchAllNodes = this.actions.fetchAllNodes.bind(this)
    this.actions.toggleNodeExpanded = this.actions.toggleNodeExpanded.bind(this)
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

  actions = {
    fetchAllNodes(table, id = null, folder = null) {
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
    },

    fetchNodes(item, ref) {
      const activeNode = findNodeInTree(this.data.nodes, item.path)
      if (activeNode) {
        transaction(() => {
          activeNode.children.replace([{
            nodeId: `${item.nodeId}0`,
            name: 'lade Daten...',
            expanded: false,
            children: [],
          }])
          activeNode.expanded = true
        })
        ref.forceUpdate()
        fetch(`${apiBaseUrl}/node?table=${item.table}&id=${item.id}&folder=${item.folder ? item.folder : null}`)
          .then(resp => resp.json())
          .then((nodes) => {
            transaction(() => {
              activeNode.children.replace(nodes)
              activeNode.expanded = true
            })
            console.log('activeNode after adding child nodes:', activeNode)
            ref.forceUpdate()
          })
          .catch(error => console.log('error fetching nodes:', error))
      } else {
        // TODO
        console.log('no active node found')
      }
    },

    toggleNodeExpanded(node) {
      action(node.expanded = !node.expanded)
    },
  }

}

export default Store.get()
