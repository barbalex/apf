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
}

const recordLoading = (store, apArtId) => {
  const { valuesForWhichTableDataWasFetched } = store
  // record that data was fetched for this value
  if (!valuesForWhichTableDataWasFetched.beob_bereitgestellt) {
    valuesForWhichTableDataWasFetched.beob_bereitgestellt = {}
  }
  if (!valuesForWhichTableDataWasFetched.beob_bereitgestellt.NO_ISFS) {
    valuesForWhichTableDataWasFetched.beob_bereitgestellt.NO_ISFS = []
  }
  if (!valuesForWhichTableDataWasFetched.beob_bereitgestellt.NO_ISFS.includes(apArtId)) {
    valuesForWhichTableDataWasFetched.beob_bereitgestellt.NO_ISFS.push(apArtId)
  }
}

export default (store, apArtId) => {
  if (!apArtId) {
    return new Error(`action fetchBeobBereitgestellt: apArtId must be passed`)
  }

  // only fetch if not yet fetched
  const { valuesForWhichTableDataWasFetched } = store
  if (
    valuesForWhichTableDataWasFetched.beob_bereitgestellt &&
    valuesForWhichTableDataWasFetched.beob_bereitgestellt.NO_ISFS &&
    valuesForWhichTableDataWasFetched.beob_bereitgestellt.NO_ISFS.includes(apArtId)
  ) {
    return
  }

  const url = `${apiBaseUrl}/schema/beob/table/beob_bereitgestellt/field/NO_ISFS/value/${apArtId}`
  store.table.beob_bereitgestelltLoading = true
  app.db.beob_bereitgestellt
    .toArray()
    .then((data) => {
      if (data.length > 0) {
        writeToStore(store, data)
        store.table.beob_bereitgestelltLoading = false
      }
    })
    .then(() => axios.get(url))
    .then(({ data }) => {
      writeToStore(store, data)
      recordLoading(store, apArtId)
      // leave ui react before this happens
      setTimeout(() => app.db.beob_bereitgestellt.bulkPut(data), 0)
    })
    .catch(error => new Error(`error fetching data for table beob_bereitgestellt:`, error))
}
