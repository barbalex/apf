import axios from 'axios'
import apiBaseUrl from './apiBaseUrl'

const isIdString = (table, value) =>
  Number.isNaN(value)
  || table === `beobzuordnung`
  || table === `beob_bereitgestellt`

const database = (table) => {
  if (table === `beob_bereitgestellt`) {
    return `beob`
  }
  return `apflora`
}

export default ({ table, field, value }) =>
  axios.get(`${apiBaseUrl}/${database(table)}/tabelle=${table}/feld=${field}/${isIdString(table, value) ? `wertString` : `wertNumber`}=${value}`)
    .then(response => response.data[0])
    .catch((error) => {
      throw error
    })
