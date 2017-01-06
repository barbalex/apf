import { transaction } from 'mobx'
import axios from 'axios'
import app from 'ampersand-app'

import apiBaseUrl from './apiBaseUrl'

const writeToStore = (store, data) => {
  transaction(() => {
    data.forEach(d =>
      store.table.tpop.set(d.TPopId, d)
    )
  })
}

export default (store, apArtId) => {
  if (!apArtId) {
    return new Error(`action fetchTpopForAp: apArtId must be passed`)
  }

  const url = `${apiBaseUrl}/tpopForAp/${apArtId}`

  app.db.tpop
    .toArray()
    .then((data) => {
      if (data) {
        writeToStore(store, data)
      }
    })
    .then(() => axios.get(url))
    .then(({ data }) => {
      writeToStore(store, data)
      app.db.tpop.bulkPut(data)
    })
    .catch(error => new Error(`error fetching tpop for ap ${apArtId}:`, error))
}
