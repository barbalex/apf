
import axios from 'axios'
import queryString from 'query-string'
import objectValues from 'lodash/values'

import apiBaseUrl from './apiBaseUrl'
import tables from './tables'

export default (store, key, valuePassed) => {
  const { row, valid } = store.activeDataset
  const tablePassed = store.activeDataset.table
  let value = valuePassed
  let table = tablePassed

  // ensure primary data exists
  if (!key || !table || !row) {
    return
  }

  // ensure numbers saved as numbers
  if (value && !isNaN(value)) {
    value = +value
  }

  // convert undefined to null
  if (value === undefined) {
    value = null
  }

  // ensure derived data exists
  const tabelle = tables.find(t =>
    t.table === table
  )
  // in tpopfeldkontr and tpopfreiwkontr need to find dbTable
  if (tabelle.dbTable) {
    table = tabelle.dbTable
  }
  const idField = tabelle ? tabelle.idField : undefined
  if (!idField) {
    return console.log(`change was not saved: field: ${key}, table: ${table}, value: ${value}`)
  }
  const tabelleId = row[idField] || undefined
  if (!tabelleId) {
    return console.log(`change was not saved: field: ${key}, table: ${table}, value: ${value}`)
  }

  // some fields contain 1 for true, 0 for false
  // not necessary: done by RadioButton component
  /*
  const booleanFields = [`TPopKontrJungPflJN`, `TPopKontrPlan`]
  if (booleanFields.includes(key)) {
    value = value === 1
  }*/

  // update if no validation messages exist
  const combinedValidationMessages = objectValues(valid).join(``)
  if (combinedValidationMessages.length === 0) {
    const { user } = store.app
    const oldValue = row[key]
    row[key] = value
    axios.put(`${apiBaseUrl}/update/apflora/tabelle=${table}/tabelleIdFeld=${idField}/tabelleId=${tabelleId}/feld=${key}/wert=${value}/user=${user}`)
      .then(() => {
        // if ApArtId of ap is updated, url needs to change
        if (table === `ap` && key === `ApArtId`) {
          store.url[3] = value
          store.history.push(`/${store.url.join(`/`)}${Object.keys(store.urlQuery).length > 0 ? `?${queryString.stringify(store.urlQuery)}` : ``}`)
        }
        // if beobNichtBeurteilt is set to beobNichtZuordnen, url needs to change
        if (table === `beobzuordnung` && key === `BeobNichtZuordnen`) {
          store.url[4] = (
            value === 1 ?
            `nicht-zuzuordnende-Beobachtungen` :
            `nicht-beurteilte-Beobachtungen`
          )
          store.history.push(`/${store.url.join(`/`)}${Object.keys(store.urlQuery).length > 0 ? `?${queryString.stringify(store.urlQuery)}` : ``}`)
        }
        // if for a beobZugeordnet TPopId is set, url needs to change
        // namely: PopId and TPopId
        if (table === `beobzuordnung` && key === `TPopId` && value) {
          const tpop = store.table.tpop.get(value)
          store.url[5] = tpop.PopId
          store.url[7] = value
          store.history.push(`/${store.url.join(`/`)}${Object.keys(store.urlQuery).length > 0 ? `?${queryString.stringify(store.urlQuery)}` : ``}`)
        }
      })
      .catch((error) => {
        row[key] = oldValue
        store.listError(error)
        console.log(`change was not saved: field: ${key}, table: ${table}, value: ${value}`)
      })
  }
}
