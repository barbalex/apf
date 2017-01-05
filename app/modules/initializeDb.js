import tables from './tables'

export default (db) => {  // eslint-disable-line no-unused-vars
  const tablesObject = {}
  tables.forEach((t) => {
    if (t.table && t.idField) {
      tablesObject[t.table] = `${t.idField}`
    }
  })
  db  // eslint-disable-line no-trailing-spaces
    .version(1)
    .stores(tablesObject)
}
