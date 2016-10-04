import apiBaseUrl from './apiBaseUrl'

export default ({ table, field, value }) =>
  fetch(`${apiBaseUrl}/apflora/tabelle=${table}/feld=${field}/${Number.isNaN(value) ? 'wertString' : 'wertNumber'}=${value}`)
    .then(resp => resp.json())
    .then(dataset => dataset)
    .catch((error) => {
      throw error
    })
