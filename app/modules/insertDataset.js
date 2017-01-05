import axios from 'axios'
import queryString from 'query-string'

import apiBaseUrl from './apiBaseUrl'
import tables from './tables'

export default (store, tablePassed, parentId, baseUrl) => {
  let table = tablePassed
  if (!table) {
    return console.log(`Error in action insertDataset: no table passed`)
  }
  // insert new dataset in db and fetch id
  const tableMetadata = tables.find(t => t.table === table)
  if (!tableMetadata) {
    return console.log(`Error in action insertDataset: no table meta data found for table "${table}"`)
  }
  // some tables need to be translated, i.e. tpopfreiwkontr
  if (tableMetadata.dbTable) {
    table = tableMetadata.dbTable
  }
  const parentIdField = tableMetadata.parentIdField
  const idField = tableMetadata.idField
  if (!idField) {
    return console.log(`new dataset not created as no idField could be found`)
  }
  axios.post(`${apiBaseUrl}/apflora/${table}/${parentIdField}/${parentId}`)
    .then((result) => {
      const row = result.data
      // insert this dataset in store.table
      store.table[table].set(row[idField], row)
      // set new url
      baseUrl.push(row[idField])
      store.history.push(`/${baseUrl.join(`/`)}${Object.keys(store.urlQuery).length > 0 ? `?${queryString.stringify(store.urlQuery)}` : ``}`)
      // if zieljahr, need to update ZielJahr
      if (store.activeUrlElements.zieljahr) {
        store.updateProperty(`ZielJahr`, store.activeUrlElements.zieljahr)
        store.updatePropertyInDb(`ZielJahr`, store.activeUrlElements.zieljahr)
      }
      // if tpopfreiwkontr need to update TPopKontrTyp
      if (tablePassed === `tpopfreiwkontr`) {
        store.updateProperty(`TPopKontrTyp`, `Freiwilligen-Erfolgskontrolle`)
        store.updatePropertyInDb(`TPopKontrTyp`, `Freiwilligen-Erfolgskontrolle`)
      }
    })
    .catch(error => store.listError(error))
}
