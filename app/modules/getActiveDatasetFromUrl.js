import getActiveUrlElements from './getActiveUrlElements'

export default (store) => {
  const aEl = getActiveUrlElements()
  if (aEl.projekt) {
    if (aEl.apberuebersicht) {
      return { table: `apberuebersicht`, row: store.table.apberuebersicht.get(aEl.apberuebersicht) }
    } else if (aEl.ap) {
      if (aEl.ziel) {
        if (aEl.zielber) {
          return { table: `zielber`, row: store.table.zielber.get(aEl.zielber) }
        }
        return { table: `ziel`, row: store.table.ziel.get(aEl.ziel) }
      } else if (aEl.erfkrit) {
        return { table: `erfkrit`, row: store.table.erfkrit.get(aEl.erfkrit) }
      } else if (aEl.apber) {
        return { table: `apber`, row: store.table.apber.get(aEl.apber) }
      } else if (aEl.ber) {
        return { table: `ber`, row: store.table.ber.get(aEl.ber) }
      } else if (aEl.beobzuordnung) {
        return { table: `beobzuordnung`, row: store.table.beobzuordnung.get(aEl.beobzuordnung) }
      } else if (aEl.beobNichtZuzuordnen) {
        return { table: `beobNichtZuzuordnen`, row: store.table.beobNichtZuzuordnen.get(aEl.beobNichtZuzuordnen) }
      } else if (aEl.assozart) {
        return { table: `assozart`, row: store.table.assozart.get(aEl.assozart) }
      } else if (aEl.pop) {
        if (aEl.tpopmassnber) {
          return { table: `tpopmassnber`, row: store.table.tpopmassnber.get(aEl.tpopmassnber) }
        } else if (aEl.tpopber) {
          return { table: `tpopber`, row: store.table.tpopber.get(aEl.tpopber) }
        } else if (aEl.tpop) {
          if (aEl.tpopBeobzuordnung) {
            return { table: `tpopBeobzuordnung`, row: store.table.tpopBeobzuordnung.get(aEl.tpopBeobzuordnung) }
          } else if (aEl.tpopber) {
            return { table: `tpopber`, row: store.table.tpopber.get(aEl.tpopber) }
          } else if (aEl.tpopfreiwkontr) {
            return { table: `tpopfreiwkontr`, row: store.table.tpopfreiwkontr.get(aEl.tpopfreiwkontr) }
          } else if (aEl.tpopfeldkontr) {
            return { table: `tpopfeldkontr`, row: store.table.tpopfeldkontr.get(aEl.tpopfeldkontr) }
          } else if (aEl.tpopmassnber) {
            return { table: `tpopmassnber`, row: store.table.tpopmassnber.get(aEl.tpopmassnber) }
          } else if (aEl.tpopmassn) {
            return { table: `tpopmassn`, row: store.table.tpopmassn.get(aEl.tpopmassn) }
          }
          return { table: `tpop`, row: store.table.tpop.get(aEl.tpop) }
        }
        // none of the tpop folders is active
        return { table: `pop`, row: store.table.pop.get(aEl.pop) }
      }
      // none of the pop folders is active
      return { table: `ap`, row: store.table.ap.get(aEl.ap) }
    }
    // !aEl.ap && !aEl.apberuebersicht
    return { table: `projekt`, row: store.table.projekt.get(aEl.projekt) }
  }
  // no aEl.projekt
  return null
}
