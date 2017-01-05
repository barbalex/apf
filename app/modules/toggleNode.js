import queryString from 'query-string'

export default (store, node) => {
  if (node) {
    const newUrl = node.url
    if (node.expanded) {
      newUrl.pop()
    }
    store.history.push(`/${newUrl.join(`/`)}${Object.keys(store.urlQuery).length > 0 ? `?${queryString.stringify(store.urlQuery)}` : ``}`)
    node.expanded = !node.expanded
  }
}
