/**
 * Note: we are using singleton to make sure that it's one instance only,
 * because the store can be used outside react components, eg. routes.js
 * from: http://stackoverflow.com/questions/35850871/how-to-connect-state-to-props-with-mobx-js-observer-when-use-es6-class/36164488#36164488
 */
/* eslint-disable no-console, no-param-reassign */

import { action, transaction, reaction } from 'mobx'
import singleton from 'singleton'
import axios from 'axios'
import objectValues from 'lodash/values'

import getNodeByPath from '../modules/getNodeByPath'
import apiBaseUrl from '../modules/apiBaseUrl'
import fetchDataset from '../modules/fetchDataset'
import tables from '../modules/tables'
import countRowsAboveActiveNode from '../modules/countRowsAboveActiveNode'
import validateActiveDataset from '../modules/validateActiveDataset'
import addLabelAndValidToNodes from '../modules/addLabelAndValidToNodes'

import DataStore from './data'
import UiStore from './ui'
import AppStore from './app'

class Store extends singleton {
  constructor() {
    super()
    this.fetchFields = this.fetchFields.bind(this)
    this.updateProperty = this.updateProperty.bind(this)
    this.updatePropertyInDb = this.updatePropertyInDb.bind(this)
    this.fetchAeEigenschaften = this.fetchAeEigenschaften.bind(this)
    this.fetchApStatus = this.fetchApStatus.bind(this)
    this.fetchApUmsetzung = this.fetchApUmsetzung.bind(this)
    this.fetchApErfkritWerte = this.fetchApErfkritWerte.bind(this)
    this.fetchTpopkontrzaehlEinheit = this.fetchTpopkontrzaehlEinheit.bind(this)
    this.fetchTpopmassnTyp = this.fetchTpopmassnTyp.bind(this)
    this.fetchZielTyp = this.fetchZielTyp.bind(this)
    this.fetchTpopmassnErfbeurt = this.fetchTpopmassnErfbeurt.bind(this)
    this.fetchAdresse = this.fetchAdresse.bind(this)
    this.fetchAllNodes = this.fetchAllNodes.bind(this)
    this.openNode = this.openNode.bind(this)
    this.fetchNodeChildren = this.fetchNodeChildren.bind(this)
    this.closeNode = this.closeNode.bind(this)
    this.fetchActiveNodeDataset = this.fetchActiveNodeDataset.bind(this)
    this.updateActiveNodeDataset = this.updateActiveNodeDataset.bind(this)
  }

  data = DataStore
  ui = UiStore
  app = AppStore

  @action
  fetchFields = () => {
      // only fetch if not yet fetched
    if (this.data.fields.length === 0 && !this.data.fieldsLoading) {
      this.data.fieldsLoading = true
      axios.get(`${apiBaseUrl}/felder`)
        .then(({ data }) => {
          transaction(() => {
            this.data.fields = data
            this.data.fieldsLoading = false
          })
        })
        .catch(error => console.log(`error fetching fields:`, error))
    }
  }

  @action
  updateProperty = (key, value) => {
    const { table, row } = this.data.activeNode
    // ensure primary data exists
    if (!key || !table || !row) {
      return console.log(`change was not saved: field: ${key}, table: ${table}, value: ${value}`)
    }
    row[key] = value
  }

  @action
  updatePropertyInDb = (key, value) => {
    const { table, row, valid } = this.data.activeNode

    // ensure primary data exists
    if (!key || !table || !row) {
      return
    }

    // ensure derived data exists
    const tabelle = tables.find(t => t.tabelleInDb === table)
    const tabelleIdFeld = tabelle ? tabelle.tabelleIdFeld : undefined
    if (!tabelleIdFeld) {
      return console.log(`change was not saved: field: ${key}, table: ${table}, value: ${value}`)
    }
    const tabelleId = row[tabelleIdFeld] || undefined
    if (!tabelleId) {
      return console.log(`change was not saved: field: ${key}, table: ${table}, value: ${value}`)
    }

    // validate using activeNode (table, row, valid) and fields
    validateActiveDataset(this.data.activeNode, this.data.fields)

    // update if no validation messages exist
    const combinedValidationMessages = objectValues(valid).join(``)
    // console.log(`updatePropertyInDb, combinedValidationMessages:`, combinedValidationMessages)
    if (combinedValidationMessages.length === 0) {
      const { user } = this.app
      const oldValue = row[key]
      row[key] = value
      axios.put(`${apiBaseUrl}/update/apflora/tabelle=${table}/tabelleIdFeld=${tabelleIdFeld}/tabelleId=${tabelleId}/feld=${key}/wert=${value}/user=${user}`)
        .catch((error) => {
          row[key] = oldValue
          this.app.errors.unshift(error)
          setTimeout(() => {
            this.app.errors.pop()
          }, 1000 * 10)
          console.log(`change was not saved: field: ${key}, table: ${table}, value: ${value}`)
        })
    }
  }

  @action
  fetchAeEigenschaften = () => {
      // only fetch if not yet fetched
    if (this.data.aeEigenschaften.length === 0 && !this.data.aeEigenschaftenLoading) {
      this.data.aeEigenschaftenLoading = true
      axios.get(`${apiBaseUrl}/artliste`)
        .then(({ data }) => {
          transaction(() => {
            this.data.aeEigenschaften = data
            this.data.aeEigenschaftenLoading = false
          })
        })
        .catch(error => console.log(`error fetching aeEigenschaften:`, error))
    }
  }

  @action
  fetchApStatus = () => {
    // only fetch if not yet fetched
    if (this.data.apStatus.length === 0 && !this.data.apStatusLoading) {
      this.data.apStatusLoading = true
      axios.get(`${apiBaseUrl}/apStatus`)
        .then(({ data }) => {
          transaction(() => {
            this.data.apStatus = data
            this.data.apStatusLoading = false
          })
        })
        .catch(error => console.log(`error fetching apStatus:`, error))
    }
  }

  @action
  fetchApUmsetzung = () => {
    // only fetch if not yet fetched
    if (this.data.apUmsetzung.length === 0 && !this.data.apUmsetzungLoading) {
      this.data.apUmsetzungLoading = true
      axios.get(`${apiBaseUrl}/apUmsetzung`)
        .then(({ data }) => {
          transaction(() => {
            this.data.apUmsetzung = data
            this.data.apUmsetzungLoading = false
          })
        })
        .catch(error => console.log(`error fetching apUmsetzung:`, error))
    }
  }

  @action
  fetchApErfkritWerte = () => {
    // only fetch if not yet fetched
    if (this.data.apErfkritWerte.length === 0 && !this.data.apErfkritWerteLoading) {
      this.data.apErfkritWerteLoading = true
      axios.get(`${apiBaseUrl}/apErfkritWerte`)
        .then(({ data }) => {
          transaction(() => {
            this.data.apErfkritWerte = data
            this.data.apErfkritWerteLoading = false
          })
        })
        .catch(error => console.log(`error fetching apErfkritWerte:`, error))
    }
  }

  @action
  fetchTpopkontrzaehlEinheit = () => {
    // only fetch if not yet fetched
    if (this.data.tpopkontrzaehlEinheit.length === 0 && !this.data.tpopkontrzaehlEinheitLoading) {
      this.data.tpopkontrzaehlEinheitLoading = true
      axios.get(`${apiBaseUrl}/tpopkontrzaehlEinheit`)
        .then(({ data }) => {
          transaction(() => {
            this.data.tpopkontrzaehlEinheit = data
            this.data.tpopkontrzaehlEinheitLoading = false
          })
        })
        .catch(error => console.log(`error fetching tpopkontrzaehlEinheit:`, error))
    }
  }

  @action
  fetchTpopmassnTyp = () => {
    // only fetch if not yet fetched
    if (this.data.tpopmassnTyp.length === 0 && !this.data.tpopmassnTypLoading) {
      this.data.tpopmassnTypLoading = true
      axios.get(`${apiBaseUrl}/tpopmassnTyp`)
        .then(({ data }) => {
          transaction(() => {
            this.data.tpopmassnTyp = data
            this.data.tpopmassnTypLoading = false
          })
        })
        .catch(error => console.log(`error fetching tpopmassnTyp:`, error))
    }
  }

  @action
  fetchZielTyp = () => {
    // only fetch if not yet fetched
    if (this.data.zielTyp.length === 0 && !this.data.zielTypLoading) {
      this.data.zielTypLoading = true
      axios.get(`${apiBaseUrl}/zielTyp`)
        .then(({ data }) => {
          transaction(() => {
            this.data.zielTyp = data
            this.data.zielTypLoading = false
          })
        })
        .catch(error => console.log(`error fetching zielTyp:`, error))
    }
  }

  @action
  fetchTpopmassnErfbeurt = () => {
    // only fetch if not yet fetched
    if (this.data.tpopmassnErfbeurt.length === 0 && !this.data.tpopmassnErfbeurtLoading) {
      this.data.tpopmassnErfbeurtLoading = true
      axios.get(`${apiBaseUrl}/tpopmassnErfbeurt`)
        .then(({ data }) => {
          transaction(() => {
            this.data.tpopmassnErfbeurt = data
            this.data.tpopmassnErfbeurtLoading = false
          })
        })
        .catch(error => console.log(`error fetching tpopmassnErfbeurt:`, error))
    }
  }

  @action
  fetchAdresse = () => {
    // only fetch if not yet fetched
    if (this.data.adresse.length === 0 && !this.data.adresseLoading) {
      this.data.adresseLoading = true
      axios.get(`${apiBaseUrl}/adressen`)
        .then(({ data }) => {
          transaction(() => {
            this.data.adresse = data
            this.data.adresseLoading = false
          })
        })
        .catch(error => console.log(`error fetching adresse:`, error))
    }
  }

  @action
  fetchAllNodes = ({ table, id, folder }) => {
    this.data.loadingAllNodes = true
    axios.get(`${apiBaseUrl}/node?table=${table}&id=${id}&folder=${folder}&levels=all`)
      .then(({ data: nodesFromDb }) => {
        console.log(`action fetchAllNodes: nodesFromDb[0]:`, nodesFromDb[0])
        addLabelAndValidToNodes(nodesFromDb, nodesFromDb, this)
        transaction(() => {
          this.data.nodes.replace(nodesFromDb)
          this.data.loadingAllNodes = false
        })
        console.log(`action fetchAllNodes: this.data.nodes[0]:`, this.data.nodes[0])
        // set project node as active node
        const activeNode = getNodeByPath(this.data.nodes, [{ table, id, folder }])
        if (activeNode && activeNode !== this.data.activeNode) {
          this.data.activeNode = activeNode
        }
      })
      .catch(error => console.log(`error fetching nodes:`, error))
  }

  @action
  openNode = (node) => {
    if (node) {
      transaction(() => {
        node.expanded = true
        if (this.data.activeNode !== node) {
          this.data.activeNode = node
        }
      })
      // only show `lade Daten...` if not yet loaded
      if (
        node.children
        && node.children.length === 1
        && node.children[0] === 0
      ) {
        transaction(() => {
          node.children.replace([{
            nodeId: `${node.nodeId}0`,
            label: `lade Daten...`,
            expanded: false,
            children: [],
          }])
          this.fetchNodeChildren(node)
        })
      }
    }
  }

  @action
  fetchNodeChildren = (node) => {
    let id
    if (node.id) {
      id = node.id
    } else {
      const table = tables.find(t => t.tabelleInDb === node.table)
      if (!table) throw new Error(`table not found`)
      const tabelleIdFeld = table.tabelleIdFeld
      id = node.row[tabelleIdFeld]
    }
    axios.get(`${apiBaseUrl}/node?table=${node.table}&id=${id}&folder=${node.folder ? node.folder : ``}`)
      .then(({ data: nodes }) => {
        addLabelAndValidToNodes(nodes, nodes, this)
        transaction(() => {
          node.children.replace(nodes)
        })
      })
      .catch(error =>
        console.log(`action fetchNodeChildren: Error fetching node children:`, error
      ))
  }

  @action
  closeNode = (node) => {
    transaction(() => {
      if (this.data.activeNode !== node) {
        this.data.activeNode = node
      }
      node.expanded = false
    })
  }

  fetchActiveNodeDataset = ({ table, field, value }) =>
    fetchDataset({ table, field, value })
      .then((dataset) => {
        transaction(() => {
          this.data.activeNode.row = dataset
          addLabelAndValidToNodes(this.data.nodes, this.data.activeNode, this)
        })
      })
      .catch((error) => {
        throw error
      })

  updateActiveNodeDataset = reaction(
    () => this.data.activeNode,
    (activeNode) => {
      if (!activeNode || !activeNode.table) {
        this.data.activeNode = {
          nodeId: null,
          folder: null,
          table: null,
          row: null,
          label: null,
          valid: null,
          expanded: false,
          urlPath: null,
          nodeIdPath: null,
          children: [],
        }
      } else {
        const myTable = tables.find(t => t.tabelleInDb === activeNode.table)
        if (!myTable) {
          throw new Error(`Table ${activeNode.table} not found in 'modules/tables'`)
        }

        this.data.nrOfRowsAboveActiveNode = countRowsAboveActiveNode(
          this.data.nodes,
          activeNode,
          this.data.nrOfRowsAboveActiveNode
        )

        const table = activeNode.table
        const tabelleIdFeld = myTable.tabelleIdFeld
        const id = activeNode.id ? activeNode.id : activeNode.row[tabelleIdFeld]
        if (
          activeNode
          && activeNode.table
          && activeNode.table === table
          && (
            (
              activeNode.row
              && activeNode.row[tabelleIdFeld]
              && activeNode.row[tabelleIdFeld] === id
            )
            ||
            (
              activeNode.id
              && activeNode.id === id
            )
          )
        ) {
          // active dataset has not changed
          // maybe only activeNode.expanded has changed
          // do nothing
        } else {
          this.fetchActiveNodeDataset({ table, field: tabelleIdFeld, value: id })
        }
      }
    }
  )
}

export default Store.get()
