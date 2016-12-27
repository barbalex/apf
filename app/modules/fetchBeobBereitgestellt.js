import { transaction, computed } from 'mobx'
import axios from 'axios'
import apiBaseUrl from './apiBaseUrl'

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
  return axios.get(url)
    .then(({ data }) => {
      transaction(() => {
        data.forEach((d) => {
          // set beobzuordnung
          d.beobzuordnung = computed(() => store.table.beobzuordnung.get(d.BeobId))
          store.table.beob_bereitgestellt.set(d.BeobId, d)
        })
      })
    })
    .catch(error => new Error(`error fetching data for table beob_bereitgestellt:`, error))
}
