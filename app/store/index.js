/**
 * Note: we are using singleton to make sure that it's one instance only,
 * because the store can be used outside react components, eg. routes.js
 * from: http://stackoverflow.com/questions/35850871/how-to-connect-state-to-props-with-mobx-js-observer-when-use-es6-class/36164488#36164488
 */
/* eslint-disable no-console, no-param-reassign */

import { action, autorun, transaction, computed, observable } from 'mobx'
import singleton from 'singleton'
import axios from 'axios'
import objectValues from 'lodash/values'
import sortBy from 'lodash/sortBy'
import uniq from 'lodash/uniq'
import createHistory from 'history/createBrowserHistory'

import fetchTableModule from '../modules/fetchTable'
import fetchTableByParentId from '../modules/fetchTableByParentId'
// import getNodeByPath from '../modules/getNodeByPath'
import apiBaseUrl from '../modules/apiBaseUrl'
// import fetchDataset from '../modules/fetchDataset'
import tables from '../modules/tables'
// import countRowsAboveActiveNode from '../modules/countRowsAboveActiveNode'
import getActiveDatasetFromUrl from '../modules/getActiveDatasetFromUrl'
import storeIsNew from '../modules/storeIsNew'
import getActiveUrlElements from '../modules/getActiveUrlElements'
import fetchDataForActiveUrlElements from '../modules/fetchDataForActiveUrlElements'

import buildBerNodes from '../modules/nodes/ber'
import buildErfkritNodes from '../modules/nodes/erfkrit'
import buildApberNodes from '../modules/nodes/apber'
import buildAssozartNodes from '../modules/nodes/assozart'
import buildApberuebersichtNodes from '../modules/nodes/apberuebersicht'
import buildZielNodes from '../modules/nodes/ziel'

import NodeStore from './node'
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
    this.toggleNode = this.toggleNode.bind(this)
  }

  @observable history = createHistory()
  node = NodeStore
  ui = UiStore
  app = AppStore
  table = TableStore

  @computed get url() {
    const pathNamePassed = this.history.location.pathname
    const pathName = pathNamePassed.replace(`/`, ``)
    const pathElements = pathName.split(`/`)
    if (pathElements[0] === ``) {
      // get rid of empty element(s) at start
      pathElements.shift()
    }
    // convert numbers to numbers
    // http://stackoverflow.com/questions/175739/is-there-a-built-in-way-in-javascript-to-check-if-a-string-is-a-valid-number
    pathElements.forEach((e, index) => {
      if (!isNaN(e)) {
        pathElements[index] = +e
      }
    })
    return pathElements
  }

  forwardToProjekte = autorun(
    () => {
      const { history } = this
      if (history.location.pathname === `/`) {
        history.push(`Projekte`)
      }
    }
  )

  updateActiveUrlElements = autorun(
    () => {
      this.activeUrlElements = getActiveUrlElements(this.url)
    }
  )

  @observable activeUrlElements

  updateData = autorun(
    () => {
      // if new store, fetch all nodes
      if (storeIsNew(this)) {
        // this.node.loadingAllNodes = true
        fetchDataForActiveUrlElements(this)
      } else {
        // else if url longer: load new table
        // get previous pathname
        fetchDataForActiveUrlElements(this)
      }
      // else dont load data
    }
  )

  @action
  fetchFields = () => {
      // only fetch if not yet done
    if (this.app.fields.length === 0 && !this.app.fieldsLoading) {
      this.app.fieldsLoading = true
      axios.get(`${apiBaseUrl}/felder`)
        .then(({ data }) => {
          transaction(() => {
            this.app.fields = data
            this.app.fieldsLoading = false
          })
        })
        .catch(error => console.log(`error fetching fields:`, error))
    }
  }

  @action
  updateLabelFilter = (table, value) => {
    if (!table) return console.log(`nodeLabelFilter cant be updated: no table passed`)
    this.node.nodeLabelFilter.set(table, value)
  }

  @action
  updateProperty = (key, value) => {
    const { table, row } = this.activeDataset
    // ensure primary data exists
    if (!key || !table || !row) {
      return console.log(`change was not saved: field: ${key}, table: ${table}, value: ${value}`)
    }
    row[key] = value
  }

  @action
  updatePropertyInDb = (key, value) => {
    const { table, row, valid } = this.activeDataset

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

    // update if no validation messages exist
    const combinedValidationMessages = objectValues(valid).join(``)
    // console.log(`updatePropertyInDb, combinedValidationMessages:`, combinedValidationMessages)
    if (combinedValidationMessages.length === 0) {
      const { user } = this.app
      const oldValue = row[key]
      row[key] = value
      axios.put(`${apiBaseUrl}/update/apflora/tabelle=${table}/tabelleIdFeld=${idField}/tabelleId=${tabelleId}/feld=${key}/wert=${value}/user=${user}`)
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
  fetchTable = (schemaName, tableName) =>
    fetchTableModule(this, schemaName, tableName)

  @action
  fetchTableByParentId = (schemaName, tableName, parentId) =>
    fetchTableByParentId(this, schemaName, tableName, parentId)

  @action
  toggleNode = (node) => {
    if (node) {
      const newUrl = node.url
      if (node.expanded) {
        newUrl.pop()
      }
      this.history.push(`/${newUrl.join(`/`)}`)
      node.expanded = !node.expanded
    }
  }

  @observable activeNode
  @observable activeDataset
  updateActiveDataset = autorun(
    () => {
      const { activeDataset, activeNode } = getActiveDatasetFromUrl(this)
      this.activeDataset = activeDataset
      this.activeNode = activeNode
    }
  )

  @computed get projektNodes() {
    // grab projekte as array and sort them by name
    let projekte = Array.from(this.table.projekt.values())
    const { activeUrlElements } = this
    // filter by node.nodeLabelFilter
    const filterString = this.node.nodeLabelFilter.get(`projekt`)
    if (filterString) {
      projekte = projekte.filter(p => p.ProjName.toLowerCase().includes(filterString.toLowerCase()))
    }
    // sort
    projekte = sortBy(projekte, `ProjName`)
    // map through all projekt and create array of nodes
    return projekte.map(el => ({
      type: `row`,
      label: el.ProjName || `(kein Name)`,
      table: `projekt`,
      row: el,
      expanded: el.ProjId === activeUrlElements.projekt,
      url: [`Projekte`, el.ProjId],
      children: [
        {
          type: `folder`,
          label: `Arten (${this.apNodes.length})`,
          folder: `ap`,
          table: `projekt`,
          row: el,
          expanded: activeUrlElements.apFolder,
          url: [`Projekte`, el.ProjId, `Arten`],
          children: this.apNodes,
        },
        {
          type: `folder`,
          label: `AP-Berichte (${this.apberuebersichtNodes.length})`,
          folder: `apberuebersicht`,
          table: `projekt`,
          row: el,
          id: el.ProjId,
          expanded: activeUrlElements.apberuebersichtFolder,
          url: [`Projekte`, el.ProjId, `AP-Berichte`],
          children: this.apberuebersichtNodes,
        },
      ],
    }))
  }

  @computed get apberuebersichtNodes() {
    return buildApberuebersichtNodes(this)
  }

  @computed get assozartNodes() {
    return buildAssozartNodes(this)
  }

  @computed get apberNodes() {
    return buildApberNodes(this)
  }

  @computed get erfkritNodes() {
    return buildErfkritNodes(this)
  }

  @computed get berNodes() {
    return buildBerNodes(this)
  }

  @computed get zielJahreNodes() {
    const { activeUrlElements } = this
    // grab ziele as array and sort them by year
    let ziele = Array.from(this.table.ziel.values())
    // show only nodes of active ap
    const activeAp = this.activeUrlElements.ap
    const projId = this.table.ap.get(activeAp).ProjId
    ziele = ziele.filter(a => a.ApArtId === activeAp)
    // filter by node.nodeLabelFilter
    const filterString = this.node.nodeLabelFilter.get(`zieljahr`)
    if (filterString) {
      ziele = ziele.filter((p) => {
        if (p.ZielJahr !== undefined && p.ZielJahr !== null) {
          return p.ZielJahr.toString().includes(filterString)
        }
        return false
      })
    }
    const zielJahre = uniq(ziele.map(z => z.ZielJahr))
    // map through all and create array of nodes
    const store = this
    const nodes = zielJahre.map((jahr) => {
      const zielNodes = buildZielNodes(store, jahr)
      return {
        type: `folder`,
        label: `${jahr === `null` ? `kein Jahr` : jahr} (${zielNodes.length})`,
        table: `ap`,
        expanded: jahr === activeUrlElements.zieljahr,
        url: [`Projekte`, projId, `Arten`, activeAp, `AP-Ziele`, jahr],
        children: zielNodes,
      }
    })
    // sort by label and return
    return sortBy(nodes, `label`)
  }

  /*
  @computed get zielNodes() {
    return buildZielNodes(this)
  }*/

  @computed get apNodes() {
    const { activeUrlElements } = this
    // grab ape as array and sort them by name
    let ap = Array.from(this.table.ap.values())
    // show only ap of active projekt
    const activeProjekt = this.activeUrlElements.projekt
    ap = ap.filter(a => a.ProjId === activeProjekt)
    // map through all ap and create array of nodes
    let nodes = ap.map((el) => {
      let label = `...`
      const { adb_eigenschaften } = this.table
      if (adb_eigenschaften.size > 0) {
        label = adb_eigenschaften.get(el.ApArtId).Artname
      }
      return {
        type: `row`,
        label,
        table: `ap`,
        row: el,
        expanded: el.ApArtId === activeUrlElements.ap,
        url: [`Projekte`, el.ProjId, `Arten`, el.ApArtId],
        children: [
          // pop folder
          {
            type: `folder`,
            label: `Populationen. TODO: add number`,
            table: `ap`,
            row: el,
            id: el.ApArtId,
            expanded: activeUrlElements.popFolder,
            url: [`Projekte`, el.ProjId, `Arten`, el.ApArtId, `Populationen`],
            children: [],
          },
          // ziel folder
          {
            type: `folder`,
            label: `AP-Ziele`,
            table: `ap`,
            row: el,
            id: el.ApArtId,
            expanded: activeUrlElements.zielFolder,
            url: [`Projekte`, el.ProjId, `Arten`, el.ApArtId, `AP-Ziele`],
            children: this.zielJahreNodes,
          },
          // erfkrit folder
          {
            type: `folder`,
            label: `AP-Erfolgskriterien (${this.erfkritNodes.length})`,
            table: `ap`,
            row: el,
            id: el.ApArtId,
            expanded: activeUrlElements.erfkritFolder,
            url: [`Projekte`, el.ProjId, `Arten`, el.ApArtId, `AP-Erfolgskriterien`],
            children: this.erfkritNodes,
          },
          // apber folder
          {
            type: `folder`,
            label: `AP-Berichte (${this.apberNodes.length})`,
            table: `ap`,
            row: el,
            id: el.ApArtId,
            expanded: activeUrlElements.apberFolder,
            url: [`Projekte`, el.ProjId, `Arten`, el.ApArtId, `AP-Berichte`],
            children: this.apberNodes,
          },
          // ber folder
          {
            type: `folder`,
            label: `Berichte (${this.berNodes.length})`,
            table: `ap`,
            row: el,
            id: el.ApArtId,
            expanded: activeUrlElements.berFolder,
            url: [`Projekte`, el.ProjId, `Arten`, el.ApArtId, `Berichte`],
            children: this.berNodes,
          },
          // beobNichtBeurteilt folder
          {
            type: `folder`,
            label: `nicht beurteilte Beobachtungen. TODO: add number`,
            table: `ap`,
            row: el,
            id: el.ApArtId,
            expanded: activeUrlElements.beobzuordnungFolder,
            url: [`Projekte`, el.ProjId, `Arten`, el.ApArtId, `nicht-beurteilte-Beobachtungen`],
            children: [],
          },
          // beobNichtZuzuordnen folder
          {
            type: `folder`,
            label: `nicht zuzuordnende Beobachtungen. TODO: add number`,
            table: `ap`,
            row: el,
            id: el.ApArtId,
            expanded: activeUrlElements.beobNichtZuzuordnenFolder,
            url: [`Projekte`, el.ProjId, `Arten`, el.ApArtId, `nicht-zuzuordnende-Beobachtungen`],
            children: [],
          },
          // idealbiotop folder
          {
            type: `folder`,
            label: `Idealbiotop`,
            table: `idealbiotop`,
            row: el,
            id: el.ApArtId,
            expanded: activeUrlElements.idealbiotopFolder,
            url: [`Projekte`, el.ProjId, `Arten`, el.ApArtId, `Idealbiotop`],
          },
          // assozarten folder
          {
            type: `folder`,
            label: `assoziierte Arten (${this.assozartNodes.length})`,
            table: `ap`,
            row: el,
            id: el.ApArtId,
            expanded: activeUrlElements.assozartFolder,
            url: [`Projekte`, el.ProjId, `Arten`, el.ApArtId, `assoziierte-Arten`],
            children: this.assozartNodes,
          },
          // qk folder
          {
            type: `folder`,
            label: `Qualitätskontrollen`,
            table: `ap`,
            row: el,
            id: el.ApArtId,
            expanded: false,
            url: [`Projekte`, el.ProjId, `Arten`, el.ApArtId, `Qualitätskontrollen`],
          },
        ],
      }
    })
    // filter by node.nodeLabelFilter
    const filterString = this.node.nodeLabelFilter.get(`ap`)
    if (filterString) {
      nodes = nodes.filter(p =>
        p.label.toLowerCase().includes(filterString.toLowerCase())
      )
    }
    // sort by label and return
    return sortBy(nodes, `label`)
  }
}

export default Store.get()
