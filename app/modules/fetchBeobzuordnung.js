import { transaction } from 'mobx'
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
        data.forEach(d =>
          store.table.beobzuordnung.set(d.NO_NOTE, d)
        )
      })
    })
    .catch(error => new Error(`error fetching table beobzuordnung:`, error))
}
