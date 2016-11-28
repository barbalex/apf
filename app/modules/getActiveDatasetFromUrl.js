import getActiveUrlElements from './getActiveUrlElements'

export default (store) => {
  const aEl = getActiveUrlElements()
  if (!aEl.projekt) return null
  if (!aEl.ap && !aEl.apberuebersicht) return store.table.projekt.get(aEl.projekt)
  if (aEl.apberuebersicht) return store.table.apberuebersicht.get(aEl.apberuebersicht)
  if () return store.table.ap
}
