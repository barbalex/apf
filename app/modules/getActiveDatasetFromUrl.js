import validateActiveDataset from './validateActiveDataset'

export default (store) => {
  const aEl = store.activeUrlElements
  let activeDataset = {
    table: null,
    row: null,
  }
  let activeNode = null
  if (aEl.projektFolder) {
    if (aEl.apberuebersicht) {
      activeDataset = { table: `apberuebersicht`, row: store.table.apberuebersicht.get(aEl.apberuebersicht) }
      activeNode = store.apNodes.find(n => n.row.JbuJahr === aEl.apberuebersicht)
    } else if (aEl.ap) {
      if (aEl.ziel) {
        if (aEl.zielber) {
          activeDataset = { table: `zielber`, row: store.table.zielber.get(aEl.zielber) }
        }
        activeDataset = { table: `ziel`, row: store.table.ziel.get(aEl.ziel) }
      } else if (aEl.erfkrit) {
        activeDataset = { table: `erfkrit`, row: store.table.erfkrit.get(aEl.erfkrit) }
      } else if (aEl.apber) {
        activeDataset = { table: `apber`, row: store.table.apber.get(aEl.apber) }
      } else if (aEl.ber) {
        activeDataset = { table: `ber`, row: store.table.ber.get(aEl.ber) }
      } else if (aEl.beobzuordnung) {
        activeDataset = { table: `beobzuordnung`, row: store.table.beobzuordnung.get(aEl.beobzuordnung) }
      } else if (aEl.beobNichtZuzuordnen) {
        activeDataset = { table: `beobNichtZuzuordnen`, row: store.table.beobNichtZuzuordnen.get(aEl.beobNichtZuzuordnen) }
      } else if (aEl.assozart) {
        activeDataset = { table: `assozart`, row: store.table.assozart.get(aEl.assozart) }
      } else if (aEl.pop) {
        if (aEl.tpopmassnber) {
          activeDataset = { table: `tpopmassnber`, row: store.table.tpopmassnber.get(aEl.tpopmassnber) }
        } else if (aEl.tpopber) {
          activeDataset = { table: `tpopber`, row: store.table.tpopber.get(aEl.tpopber) }
        } else if (aEl.tpop) {
          if (aEl.tpopBeobzuordnung) {
            activeDataset = { table: `tpopBeobzuordnung`, row: store.table.tpopBeobzuordnung.get(aEl.tpopBeobzuordnung) }
          } else if (aEl.tpopber) {
            activeDataset = { table: `tpopber`, row: store.table.tpopber.get(aEl.tpopber) }
          } else if (aEl.tpopfreiwkontr) {
            activeDataset = { table: `tpopfreiwkontr`, row: store.table.tpopfreiwkontr.get(aEl.tpopfreiwkontr) }
          } else if (aEl.tpopfeldkontr) {
            activeDataset = { table: `tpopfeldkontr`, row: store.table.tpopfeldkontr.get(aEl.tpopfeldkontr) }
          } else if (aEl.tpopmassnber) {
            activeDataset = { table: `tpopmassnber`, row: store.table.tpopmassnber.get(aEl.tpopmassnber) }
          } else if (aEl.tpopmassn) {
            activeDataset = { table: `tpopmassn`, row: store.table.tpopmassn.get(aEl.tpopmassn) }
          }
          activeDataset = { table: `tpop`, row: store.table.tpop.get(aEl.tpop) }
        } else {
          // none of the tpop folders is active
          activeDataset = { table: `pop`, row: store.table.pop.get(aEl.pop) }
        }
      } else {
        // none of the pop folders is active
        activeDataset = { table: `ap`, row: store.table.ap.get(aEl.ap) }
      }
    } else {
      // !aEl.ap && !aEl.apberuebersicht
      activeDataset = { table: `projekt`, row: store.table.projekt.get(aEl.projekt) }
    }
  }
  // console.log(`getActiveDatasetFromUrl: activeDataset:`, activeDataset)
  // console.log(`getActiveDatasetFromUrl: store.app.fields:`, store.app.fields)
  activeDataset.valid = validateActiveDataset(activeDataset.table, activeDataset.row, store.app.fields)
  return { activeDataset, activeNode }
}
