import { transaction, computed } from 'mobx'
import axios from 'axios'
import app from 'ampersand-app'

import apiBaseUrl from './apiBaseUrl'

const writeToStore = (store, data) => {
  transaction(() => {
    data.forEach((d) => {
      d.beobzuordnung = computed(() => store.table.beobzuordnung.get(d.BeobId))
      store.table.beob_bereitgestellt.set(d.BeobId, d)
    })
  })
  store.table.beob_bereitgestelltLoading = false
}

export default (store, apArtId) => {
  if (!apArtId) {
    return new Error(`action fetchBeobBereitgestellt: apArtId must be passed`)
  }

  // only fetch if not yet fetched
  if (
    store.previousActiveUrlElements &&
    store.previousActiveUrlElements.ap &&
    store.previousActiveUrlElements.ap === apArtId
  ) {
    return
  }

  const url = `${apiBaseUrl}/schema/beob/table/beob_bereitgestellt/field/NO_ISFS/value/${apArtId}`
  store.table.beob_bereitgestelltLoading = true
  app.db.beob_bereitgestellt
    .toArray()
    .then((data) => {
      if (data.length > 0) {
        // console.log(`fetching beob_bereitgestellt from idb`)
        writeToStore(store, data)
      }
    })
    .then(() => axios.get(url))
    .then(({ data }) => {
      writeToStore(store, data)
      app.db.beob_bereitgestellt.bulkPut(data)
    })
    .catch(error => new Error(`error fetching data for table beob_bereitgestellt:`, error))
}
