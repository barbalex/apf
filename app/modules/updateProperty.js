import queryString from 'query-string'

export default (store, key, valuePassed) => {
  const { table, row } = store.activeDataset
  let value = valuePassed
  // ensure primary data exists
  if (!key || !table || !row) {
    return console.log(`change was not saved: field: ${key}, table: ${table}, value: ${value}`)
  }
  // ensure numbers saved as numbers
  if (value && !isNaN(value)) {
    value = +value
  }
  // edge cases:
  // if jahr of ziel is updated, url needs to change
  if (table === `ziel` && key === `ZielJahr`) {
    store.url[5] = value
    store.history.push(`/${store.url.join(`/`)}${Object.keys(store.urlQuery).length > 0 ? `?${queryString.stringify(store.urlQuery)}` : ``}`)
  }
  row[key] = value
}
