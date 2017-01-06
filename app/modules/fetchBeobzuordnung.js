import { transaction, computed } from 'mobx'
import axios from 'axios'
import app from 'ampersand-app'

import apiBaseUrl from './apiBaseUrl'

const writeToStore = (store, data) => {
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
  store.table.beob_bereitgestelltLoading = false
}

export default (store, apArtId) => {
  // console.log(`module fetchBeobzuordnung: apArtId:`, apArtId)
  if (!apArtId) {
    return new Error(`action fetchBeobzuordnung: apArtId must be passed`)
  }
  const url = `${apiBaseUrl}/beobzuordnung/${apArtId}`
  store.table.beob_bereitgestelltLoading = true
  app.db.beobzuordnung
    .toArray()
    .then((data) => {
      if (data.length > 0) {
        // console.log(`fetching beobzuordnung from idb`)
        writeToStore(store, data)
      }
    })
    .then(() => axios.get(url))
    .then(({ data }) => {
      writeToStore(store, data)
      app.db.beobzuordnung.bulkPut(data)
    })
    .catch(error => new Error(`error fetching table beobzuordnung:`, error))
}
