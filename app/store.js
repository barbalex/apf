/**
 * Note: we are using singleton to make sure that it's one instance only,
 * because the store can be used outside react components, eg. routes.js
 * from: http://stackoverflow.com/questions/35850871/how-to-connect-state-to-props-with-mobx-js-observer-when-use-es6-class/36164488#36164488
 */

// import { observable } from 'mobx-react'  // reason for HORRIBLE webpack error????
import { observable, action, transaction } from 'mobx'
import $ from 'jquery'
import singleton from 'singleton'

import apiBaseUrl from './modules/apiBaseUrl'

class Store extends singleton {
  constructor() {
    super()
    this.toggleNodeExpanded = this.toggleNodeExpanded.bind(this)
  }
  data = observable({
    nodes: [],
    loadingNodes: false,
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

  loadNodes(table, id = null, folder = null, levels = '') {
    this.data.loadingNodes = true
    fetch(`${apiBaseUrl}/node?table=${table}&id=${id}$folder=${folder}&levels=${levels}`)
      .then(resp => resp.json())
      .then((nodes) => {
        transaction(() => {
          this.data.nodes = nodes
          this.data.loadingNodes = false
        })
      })
      .catch(error => console.log(error))
  }

  toggleNodeExpanded(node) {
    action(node.expanded = !node.expanded)
  }

}

export default Store.get()
