import { transaction, computed } from 'mobx'
import axios from 'axios'
import app from 'ampersand-app'

import apiBaseUrl from './apiBaseUrl'

const writeToStore = (store, data, apArtId) => {
  const { valuesForWhichTableDataWasFetched } = store
  transaction(() => {
    data.forEach((zuordnung) => {
      // set computed value "beob_bereitgestellt"
      zuordnung.beobBereitgestellt = computed(() =>
        store.table.beob_bereitgestellt.get(zuordnung.NO_NOTE)
      )
      // set computed value "type"
      const type = computed(() => {
        if (zuordnung.BeobNichtZuordnen && zuordnung.BeobNichtZuordnen === 1) {
          return `nichtZuzuordnen`
        }
        if (zuordnung.TPopId) {
          return `zugeordnet`
        }
        return `nichtBeurteilt`
      })
      zuordnung.type = type
      store.table.beobzuordnung.set(zuordnung.NO_NOTE, zuordnung)
    })
  })
  store.table.beobzuordnungLoading = false
  // record that data was fetched for this value
  if (!valuesForWhichTableDataWasFetched.beobzuordnung) {
    valuesForWhichTableDataWasFetched.beobzuordnung = {}
  }
  if (!valuesForWhichTableDataWasFetched.beobzuordnung.NO_ISFS) {
    valuesForWhichTableDataWasFetched.beobzuordnung.NO_ISFS = []
  }
  if (!valuesForWhichTableDataWasFetched.beobzuordnung.NO_ISFS.includes(apArtId)) {
    valuesForWhichTableDataWasFetched.beobzuordnung.NO_ISFS.push(apArtId)
  }
}

export default (store, apArtId) => {
  // console.log(`module fetchBeobzuordnung: apArtId:`, apArtId)
  const { valuesForWhichTableDataWasFetched } = store
  if (!apArtId) {
    return new Error(`action fetchBeobzuordnung: apArtId must be passed`)
  }

  // only fetch if not yet fetched
  if (
    valuesForWhichTableDataWasFetched.beobzuordnung &&
    valuesForWhichTableDataWasFetched.beobzuordnung.NO_ISFS &&
    valuesForWhichTableDataWasFetched.beobzuordnung.NO_ISFS.includes(apArtId)
  ) {
    return
  }

  const url = `${apiBaseUrl}/beobzuordnung/${apArtId}`
  store.table.beobzuordnungLoading = true
  app.db.beobzuordnung
    .toArray()
    .then((data) => {
      if (data.length > 0) {
        // console.log(`fetching beobzuordnung from idb`)
        writeToStore(store, data, apArtId)
      }
    })
    .then(() => axios.get(url))
    .then(({ data }) => {
      writeToStore(store, data, apArtId)
      app.db.beobzuordnung.bulkPut(data)
    })
    .catch(error => new Error(`error fetching table beobzuordnung:`, error))
}
