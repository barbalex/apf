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
import keyBy from 'lodash/keyBy'

import getNodeByPath from '../modules/getNodeByPath'
import apiBaseUrl from '../modules/apiBaseUrl'
import fetchDataset from '../modules/fetchDataset'
import tables from '../modules/tables'
import countRowsAboveActiveNode from '../modules/countRowsAboveActiveNode'
import validateActiveDataset from '../modules/validateActiveDataset'
import addPropertiesToNodes from '../modules/addPropertiesToNodes'

import DataStore from './data'
import UiStore from './ui'
import AppStore from './app'
import TableStore from './table'

class Store extends singleton {
  constructor() {
    super()
    this.fetchFields = this.fetchFields.bind(this)
    this.updateProperty = this.updateProperty.bind(this)
    this.updatePropertyInDb = this.updatePropertyInDb.bind(this)
    this.fetchTable = this.fetchTable.bind(this)
    this.fetchApStatus = this.fetchApStatus.bind(this)
    this.fetchApUmsetzung = this.fetchApUmsetzung.bind(this)
    this.fetchApErfkritWerte = this.fetchApErfkritWerte.bind(this)
    this.fetchAdresse = this.fetchAdresse.bind(this)
    this.fetchAllNodes = this.fetchAllNodes.bind(this)
    this.toggleNode = this.toggleNode.bind(this)
    this.fetchNodeChildren = this.fetchNodeChildren.bind(this)
    this.fetchActiveNodeDataset = this.fetchActiveNodeDataset.bind(this)
    this.updateActiveNodeDataset = this.updateActiveNodeDataset.bind(this)
  }

  data = DataStore
  ui = UiStore
  app = AppStore
  table = TableStore

  @action
  fetchFields = () => {
      // only fetch if not yet fetched
    if (this.app.fields.length === 0 && !this.data.fieldsLoading) {
      this.data.fieldsLoading = true
      axios.get(`${apiBaseUrl}/felder`)
        .then(({ data }) => {
          transaction(() => {
            this.app.fields = data
            this.data.fieldsLoading = false
          })
        })
        .catch(error => console.log(`error fetching fields:`, error))
    }
  }

  @action
  updateLabelFilter = (table, value) => {
    if (!table) return console.log(`nodeLabelFilter cant be updated: no table passed`)
    this.data.nodeLabelFilter[table] = value
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
    const tabelle = tables.find(t => t.table === table)
    const idField = tabelle ? tabelle.idField : undefined
    if (!idField) {
      return console.log(`change was not saved: field: ${key}, table: ${table}, value: ${value}`)
    }
    const tabelleId = row[idField] || undefined
    if (!tabelleId) {
      return console.log(`change was not saved: field: ${key}, table: ${table}, value: ${value}`)
    }

    // validate using activeNode (table, row, valid) and fields
    validateActiveDataset(this.data.activeNode, this.app.fields)

    // update if no validation messages exist
    const combinedValidationMessages = objectValues(valid).join(``)
    // console.log(`updatePropertyInDb, combinedValidationMessages:`, combinedValidationMessages)
    if (combinedValidationMessages.length === 0) {
      const { user } = this.app
      const oldValue = row[key]
      row[key] = value
      axios.put(`${apiBaseUrl}/update/apflora/tabelle=${table}/idField=${idField}/tabelleId=${tabelleId}/feld=${key}/wert=${value}/user=${user}`)
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
  fetchTable = (tableName, schemaName) => {
    if (!tableName) {
      console.error(`action fetchTable: tableName must be passed`)
      return
    }
    // only fetch if not yet fetched
    if (this.table[tableName].size === 0 && !this.table[`${tableName}Loading`]) {
      const parentIdField = tables.find(t => t.table === tableName).parentIdField
      this.table[`${tableName}Loading`] = true
      axios.get(`${apiBaseUrl}/schema/${schemaName || `apflora`}/table/${tableName}`)
        .then(({ data }) => {
          transaction(() => {
            this.table[`${tableName}Loading`] = keyBy(data, parentIdField)
            this.table[`${tableName}Loading`] = false
          })
        })
        .catch(error => console.log(`error fetching table ${tableName}:`, error))
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
        addPropertiesToNodes(nodesFromDb, nodesFromDb, this)
        transaction(() => {
          this.data.nodes.replace(nodesFromDb)
          this.data.loadingAllNodes = false
          // set project node as active node
          const activeNode = getNodeByPath(this.data.nodes, [{ table, id, folder }])
          if (activeNode && activeNode !== this.data.activeNode) {
            this.data.activeNode = activeNode
          }
        })
      })
      .catch(error => console.log(`error fetching nodes:`, error))
  }

  @action
  toggleNode = (node) => {
    if (node) {
      const wasClosed = !node.expanded
      transaction(() => {
        node.expanded = !node.expanded
        if (this.data.activeNode !== node) {
          this.data.activeNode = node
        }
      })
      if (
        wasClosed
        && node.children
        && node.children.length
        && (
          node.children[0] === 0
          || (node.children[0].label && node.children[0].label === `lade Daten...`)
        )
      ) {
        transaction(() => {
          node.children.replace([{
            nodeId: `${node.nodeId}0`,
            label: `lade Daten...`,
            expanded: false,
            children: [],
          }])
        })
        this.fetchNodeChildren(node)
      }
    }
  }

  @action
  fetchNodeChildren = (node) => {
    let id
    if (node.id) {
      id = node.id
    } else {
      const table = tables.find(t => t.table === node.table)
      if (!table) throw new Error(`table not found`)
      const idField = table.idField
      id = node.row[idField]
    }
    axios.get(`${apiBaseUrl}/node?table=${node.table}&id=${id}&folder=${node.folder ? node.folder : ``}`)
      .then(({ data: nodes }) => {
        transaction(() => {
          addPropertiesToNodes(this.data.nodes, nodes, this)
          node.children.replace(nodes)
        })
      })
      .catch(error =>
        console.log(`action fetchNodeChildren: Error fetching node children:`, error
      ))
  }

  fetchActiveNodeDataset = ({ table, field, value }) =>
    fetchDataset({ table, field, value })
      .then((dataset) => {
        transaction(() => {
          this.data.activeNode.row = dataset
          addPropertiesToNodes(this.data.nodes, this.data.activeNode, this)
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
        const myTable = tables.find(t => t.table === activeNode.table)
        if (!myTable) {
          throw new Error(`Table ${activeNode.table} not found in 'modules/tables'`)
        }

        this.data.nrOfRowsAboveActiveNode = countRowsAboveActiveNode(
          this.data.nodes,
          activeNode,
          this.data.nrOfRowsAboveActiveNode
        )

        const table = activeNode.table
        const idField = myTable.idField
        const id = activeNode.id ? activeNode.id : activeNode.row[idField]
        if (
          activeNode
          && activeNode.table
          && activeNode.table === table
          && (
            (
              activeNode.row
              && activeNode.row[idField]
              && activeNode.row[idField] === id
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
          this.fetchActiveNodeDataset({ table, field: idField, value: id })
        }
      }
    }
  )
}

export default Store.get()
