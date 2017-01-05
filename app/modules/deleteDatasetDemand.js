import tables from './tables'

export default (store, table, id, url, label) => {
  if (!table) {
    return console.log(`Error in action deleteDatasetDemand: no table passed`)
  }
  const tableMetadata = tables.find(t => t.table === table)
  if (!tableMetadata) {
    return console.log(`Error in action deleteDatasetDemand: no table meta data found for table "${table}"`)
  }
  const idField = tableMetadata.idField
  if (!idField) {
    return console.log(`dataset vsmz nr deleted as no idField could be found`)
  }
  store.datasetToDelete = { table, id, idField, url, label }
}
