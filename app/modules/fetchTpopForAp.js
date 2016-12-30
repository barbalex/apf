import { transaction } from 'mobx'
import axios from 'axios'
import apiBaseUrl from './apiBaseUrl'

export default (store, apArtId) => {
  if (!apArtId) {
    return new Error(`action fetchTpopForAp: apArtId must be passed`)
  }

  const url = `${apiBaseUrl}/tpopForAp/${apArtId}`
  return axios.get(url)
    .then(({ data }) => {
      transaction(() => {
        data.forEach(d =>
          store.table.tpop.set(d.TPopId, d)
        )
      })
    })
    .catch(error => new Error(`error fetching tpop for ap ${apArtId}:`, error))
}
