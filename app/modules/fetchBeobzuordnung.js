import { transaction, computed, autorun } from 'mobx'
import axios from 'axios'
import apiBaseUrl from './apiBaseUrl'

export default (store, apArtId) => {
  // console.log(`module fetchBeobzuordnung: apArtId:`, apArtId)
  if (!apArtId) {
    return new Error(`action fetchBeobzuordnung: apArtId must be passed`)
  }
  const url = `${apiBaseUrl}/beobzuordnung/${apArtId}`
  return axios.get(url)
    .then(({ data }) => {
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
    })
    .catch(error => new Error(`error fetching table beobzuordnung:`, error))
}
