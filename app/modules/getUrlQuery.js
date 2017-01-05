import isString from 'lodash/isString'
import queryString from 'query-string'

export default (store) => {
  const query = queryString.parse(store.history.location.search)
  /**
   * arrays are converted to strings in url if only one element is contained
   * need to convert it to array
   */
  if (query.projekteTabs && isString(query.projekteTabs)) {
    query.projekteTabs = [query.projekteTabs]
  }
  return query
}
