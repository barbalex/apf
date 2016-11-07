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
import countRowsAboveActiveNode from './modules/countRowsAboveActiveNode'

const noNode = {
  nodeId: 'none',
  name: 'this seems to be needed for mobx',
  expanded: false,
  children: [],
}

const noDataset = {
  table: null,
  row: null,
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

  // TODO:
  // - moove lastClickY to ui
  // - moove treeTopPosition to ui
  data = observable({
    nodes: [noNode],
    loadingAllNodes: false,
    activeNode: null,
    lastClickY: 0,
    nrOfRowsAboveActiveNode: 0,
    treeTopPosition: 0,
    treeHeight: 0,
    activeDataset: noDataset,
    nodes2: [noNode],
    map: null,
    user: null,
    aeEigenschaften: [],
    aeEigenschaftenLoading: false,
    aeLr: null,
    aeFloraStatus: [],
    aeFloraStatusLoading: false,
    apStatus: [],
    apStatusLoading: null,
    apErfbeurtkrit: null,
    apErfkrit: null,
    apUmsetzung: null,
    popEntwicklung: null,
    popStatus: null,
    tpopApberrelevant: null,
    tpopEntwicklung: null,
    tpopkontrIdbiotopuebereinst: null,
    tpopkontrTyp: null,
    tpopkontrzaehlEinheit: null,
    tpopkontrzaehlMethode: null,
    tpopmassnErfbeurt: null,
    tpopmassnTyp: null,
    zielTyp: null,
    adresse: null,
    gemeinde: null,
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

  fetchAeEigenschaften = action(
    'fetchAeEigenschaften',
    () => {
      // only fetch if not yet fetched
      if (this.data.aeEigenschaften.length === 0) {
        this.data.aeEigenschaftenLoading = true
        fetch(`${apiBaseUrl}/artliste`)
          .then(resp => resp.json())
          .then((aeEigenschaften) => {
            transaction(() => {
              this.data.aeEigenschaften = aeEigenschaften
              this.data.aeEigenschaftenLoading = false
            })
          })
          .catch(error => console.log('error fetching aeEigenschaften:', error))
      }
    }
  )

  fetchApStatus = action(
    'fetchApStatus',
    () => {
      // only fetch if not yet fetched
      if (this.data.apStatus.length === 0) {
        this.data.apStatusLoading = true
        fetch(`${apiBaseUrl}/apStatus`)
          .then(resp => resp.json())
          .then((apStatus) => {
            transaction(() => {
              this.data.apStatus = apStatus
              this.data.apStatusLoading = false
            })
          })
          .catch(error => console.log('error fetching apStatus:', error))
      }
    }
  )

  fetchAllNodes = action(
    'fetchAllNodes',
    ({ table, id, folder }) => {
      this.data.loadingAllNodes = true
      fetch(`${apiBaseUrl}/node?table=${table}&id=${id}&folder=${folder}&levels=all`)
        .then(resp => resp.json())
        .then((nodes) => {
          transaction(() => {
            this.data.nodes.replace(nodes)
            this.data.loadingAllNodes = false
          })
          // set project node as active node
          const activeNode = getNodeByPath(this.data.nodes, [{ table, id, folder }])
          if (activeNode && activeNode !== this.data.activeNode) {
            this.data.activeNode = activeNode
          }
        })
        .catch(error => console.log('error fetching nodes:', error))
    }
  )

  openNode = action(
    'openNode',
    (node, index) => {
      if (node) {
        transaction(() => {
          node.expanded = true
          if (this.data.activeNode !== node) {
            this.data.activeNode = node
            this.data.activeNodeIndex = index
          }
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
      // console.log('store, fetchNodeChildren: node clicked:', node)
      fetch(`${apiBaseUrl}/node?table=${node.table}&id=${node.id}&folder=${node.folder ? node.folder : ''}`)
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
      transaction(() => {
        if (this.data.activeNode !== node) {
          this.data.activeNode = node
        }
        node.expanded = false
      })
    }
  )

  fetchActiveNodeDataset = action(
    'fetchActiveNodeDataset',
    ({ table, field, value }) =>
      fetchDataset({ table, field, value })
        .then((dataset) => {
          transaction(() => {
            this.data.activeDataset.row = dataset
            this.data.activeDataset.table = table
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
        this.data.activeDataset = noDataset
      } else {
        const myTable = tables.find(t => t.tabelleInDb && t.tabelleInDb === activeNode.table)
        if (!myTable) {
          throw new Error(`Table ${activeNode.table} not found in 'modules/table'`)
        }

        this.data.nrOfRowsAboveActiveNode = countRowsAboveActiveNode(this.data.nodes, activeNode, this.data.nrOfRowsAboveActiveNode)

        const table = activeNode.table
        const field = myTable.tabelleIdFeld
        const value = activeNode.id
        const activeDataset = this.data.activeDataset
        if (
          activeDataset
          && activeDataset.table
          && activeDataset.table === table
          && activeDataset.row
          && activeDataset.row[field]
          && activeDataset.row[field] === value
        ) {
          // active dataset has not changed
          // maybe only activeNode.expanded has changed
          // do nothing
        } else {
          this.fetchActiveNodeDataset({ table, field, value })
        }
      }
    }
  )
}

export default Store.get()
