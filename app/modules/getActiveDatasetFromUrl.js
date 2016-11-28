import getActiveUrlElements from './getActiveUrlElements'

export default (store) => {
  const aEl = getActiveUrlElements()
  if (aEl.projekt) {
    if (aEl.apberuebersicht) {
      return store.table.apberuebersicht.get(aEl.apberuebersicht)
    } else if (aEl.ap) {
      if (aEl.ziel) {
        if (aEl.zielber) {
          return store.table.zielber.get(aEl.zielber)
        }
        return store.table.ziel.get(aEl.ziel)
      } else if (aEl.erfkrit) {
        return store.table.erfkrit.get(aEl.erfkrit)
      } else if (aEl.apber) {
        return store.table.apber.get(aEl.apber)
      } else if (aEl.ber) {
        return store.table.ber.get(aEl.ber)
      } else if (aEl.beobzuordnung) {
        return store.table.beobzuordnung.get(aEl.beobzuordnung)
      } else if (aEl.beobNichtZuzuordnen) {
        return store.table.beobNichtZuzuordnen.get(aEl.beobNichtZuzuordnen)
      } else if (aEl.assozart) {
        return store.table.assozart.get(aEl.assozart)
      } else if (aEl.pop) {
        if (aEl.tpopmassnber) {
          return store.table.tpopmassnber.get(aEl.tpopmassnber)
        } else if (aEl.tpopber) {
          return store.table.tpopber.get(aEl.tpopber)
        } else if (aEl.tpop) {
          if (aEl.tpopBeobzuordnung) {
            return store.table.tpopBeobzuordnung.get(aEl.tpopBeobzuordnung)
          } else if (aEl.tpopber) {
            return store.table.tpopber.get(aEl.tpopber)
          } else if (aEl.tpopfreiwkontr) {
            return store.table.tpopfreiwkontr.get(aEl.tpopfreiwkontr)
          } else if (aEl.tpopfeldkontr) {
            return store.table.tpopfeldkontr.get(aEl.tpopfeldkontr)
          } else if (aEl.tpopmassnber) {
            return store.table.tpopmassnber.get(aEl.tpopmassnber)
          } else if (aEl.tpopmassn) {
            return store.table.tpopmassn.get(aEl.tpopmassn)
          }
          return store.table.tpop.get(aEl.tpop)
        }
        // none of the tpop folders is active
        return store.table.pop.get(aEl.pop)
      }
      // none of the pop folders is active
      return store.table.ap.get(aEl.ap)
    }
    // !aEl.ap && !aEl.apberuebersicht
    return store.table.projekt.get(aEl.projekt)
  }
  // no aEl.projekt
  return null
}
