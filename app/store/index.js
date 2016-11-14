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
import get from 'lodash/get'

import getNodeByPath from '../modules/getNodeByPath'
import apiBaseUrl from '../modules/apiBaseUrl'
import fetchDataset from '../modules/fetchDataset'
import tables from '../modules/tables'
import countRowsAboveActiveNode from '../modules/countRowsAboveActiveNode'
import ActiveDataset from './data/activeDataset'
import validateActiveDataset from '../modules/validateActiveDataset'

import DataStore from './data'
import UiStore from './ui'
import AppStore from './app'

class Store extends singleton {
  constructor() {
    super()
    this.updateProperty = this.updateProperty.bind(this)
    this.fetchAeEigenschaften = this.fetchAeEigenschaften.bind(this)
    this.fetchApStatus = this.fetchApStatus.bind(this)
    this.fetchApUmsetzung = this.fetchApUmsetzung.bind(this)
    this.fetchApErfkritWerte = this.fetchApErfkritWerte.bind(this)
    this.fetchAdresse = this.fetchAdresse.bind(this)
    this.fetchAllNodes = this.fetchAllNodes.bind(this)
    this.openNode = this.openNode.bind(this)
    this.fetchNodeChildren = this.fetchNodeChildren.bind(this)
    this.closeNode = this.closeNode.bind(this)
    this.fetchActiveNodeDataset = this.fetchActiveNodeDataset.bind(this)
    this.keepActiveNodeDatasetUpToDate = this.keepActiveNodeDatasetUpToDate.bind(this)
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
        .then(({ data: fields }) => {
          transaction(() => {
            this.data.fields = fields
            this.data.fieldsLoading = false
          })
        })
        .catch(error => console.log(`error fetching fields:`, error))
    }
  }

  @action
  updateProperty = (key, value) => {
    const { table, row } = this.data.activeDataset
    // ensure primary data exists
    if (!key || !table || !row) {
      return console.log(`change was not saved: field: ${key}, table: ${table}, value: ${value}`)
    }
    row[key] = value
  }

  @action
  updatePropertyInDb = (key, value) => {
    const { table, row, valid } = this.data.activeDataset

    // ensure primary data exists
    if (!key || !table || !row) {
      return
    }

    // ensure derived data exists
    const tabelle = tables.find(t => t.tabelleInDb === table && t.database === `apflora`)
    const tabelleIdFeld = tabelle ? tabelle.tabelleIdFeld : undefined
    if (!tabelleIdFeld) {
      return console.log(`change was not saved: field: ${key}, table: ${table}, value: ${value}`)
    }
    const tabelleId = row[tabelleIdFeld] ? row[tabelleIdFeld] : undefined
    if (!tabelleId) {
      return console.log(`change was not saved: field: ${key}, table: ${table}, value: ${value}`)
    }

    // validate using activeDataset (table, row, valid) and fields
    validateActiveDataset(this.data.activeDataset, this.data.fields)

    // update if no validation messages exist
    const combinedValidationMessages = objectValues(valid).join(``)
    // console.log(`updatePropertyInDb, combinedValidationMessages:`, combinedValidationMessages)
    if (combinedValidationMessages.length === 0) {
      const { user } = this.data
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
        .then(({ data: aeEigenschaften }) => {
          transaction(() => {
            this.data.aeEigenschaften = aeEigenschaften
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
        .then(({ data: apStatus }) => {
          transaction(() => {
            this.data.apStatus = apStatus
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
        .then(({ data: apUmsetzung }) => {
          transaction(() => {
            this.data.apUmsetzung = apUmsetzung
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
        .then(({ data: apErfkritWerte }) => {
          transaction(() => {
            this.data.apErfkritWerte = apErfkritWerte
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
        .then(({ data: adresse }) => {
          transaction(() => {
            this.data.adresse = adresse
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
      .then(({ data: nodes }) => {
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
      .catch(error => console.log(`error fetching nodes:`, error))
  }

  @action
  openNode = (node, index) => {
    if (node) {
      transaction(() => {
        node.expanded = true
        if (this.data.activeNode !== node) {
          this.data.activeNode = node
          this.data.activeNodeIndex = index
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
            name: `lade Daten...`,
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
    axios.get(`${apiBaseUrl}/node?table=${node.table}&id=${node.id}&folder=${node.folder ? node.folder : ``}`)
      .then(({ data: nodes }) => {
        transaction(() => {
          node.children.replace(nodes)
        })
      })
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
        const validObject = {}
        Object.keys(dataset).forEach((k) => {
          validObject[k] = ``
        })
        transaction(() => {
          this.data.activeDataset.row = dataset
          this.data.activeDataset.table = table
          this.data.activeDataset.valid = validObject
        })
      })
      .catch((error) => {
        throw error
      })

  keepActiveProjektNodeUpToDate = reaction(
    () => get(this, `data.activeDataset.row.ProjName`),
    (ProjName) => {
      console.log(`keepActiveProjektNodeUpToDate, ProjName:`, ProjName)
      const { activeNode } = this.data
      console.log(`keepActiveProjektNodeUpToDate, activeNode:`, activeNode)
      if (activeNode) {
        activeNode.name = ProjName
      }
    }
  )

  keepActiveApNodeUpToDate = reaction(
    () => get(this, `data.activeDataset.row.ApArtId`),
    (ApArtId) => {
      if (ApArtId) {
        const { activeNode } = this.data
        if (activeNode) {
          activeNode.id = ApArtId
          activeNode.name = this.data.artname
          const newNodeId = `${activeNode.table}/${ApArtId}`
          activeNode.nodeId = newNodeId
          activeNode.nodeIdPath[3] = newNodeId
          activeNode.urlPath[3] = ApArtId
        }
      }
    }
  )

  keepActiveNodeDatasetUpToDate = reaction(
    () => this.data.activeNode,
    (activeNode) => {
      if (!activeNode || !activeNode.table) {
        this.data.activeDataset = ActiveDataset
      } else {
        const myTable = tables.find(t => t.tabelleInDb && t.tabelleInDb === activeNode.table)
        if (!myTable) {
          throw new Error(`Table ${activeNode.table} not found in 'modules/table'`)
        }

        this.data.nrOfRowsAboveActiveNode = countRowsAboveActiveNode(
          this.data.nodes,
          activeNode,
          this.data.nrOfRowsAboveActiveNode
        )

        const table = activeNode.table
        const tabelleIdFeld = myTable.tabelleIdFeld
        const id = activeNode.id
        const activeDataset = this.data.activeDataset
        if (
          activeDataset
          && activeDataset.table
          && activeDataset.table === table
          && activeDataset.row
          && activeDataset.row[tabelleIdFeld]
          && activeDataset.row[tabelleIdFeld] === id
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
