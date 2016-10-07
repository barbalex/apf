import apiBaseUrl from './apiBaseUrl'

const isIdString = (table, value) =>
  Number.isNaN(value)
  || table === 'beobzuordnung'
  || table === 'beob_bereitgestellt'

const database = (table) => {
  if (table === 'beob_bereitgestellt') {
    return 'beob'
  }
  return 'apflora'
}

export default ({ table, field, value }) =>
  fetch(`${apiBaseUrl}/${database(table)}/tabelle=${table}/feld=${field}/${isIdString(table, value) ? 'wertString' : 'wertNumber'}=${value}`)
    .then(resp => resp.json())
    .then(dataset => dataset[0])
    .catch((error) => {
      throw error
    })
