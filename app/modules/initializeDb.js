import tables from './tables'

export default (db) => {
  const tablesObject = {}
  tables.forEach((t) => {
    if (t.table && t.idField) {
      tablesObject[t.table] = `${t.idField}`
    }
  })
  console.log(`tablesObject:`, tablesObject)
  db.version(1).stores(tablesObject)
}
