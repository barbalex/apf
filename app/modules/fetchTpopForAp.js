import { transaction } from 'mobx'
import axios from 'axios'
import app from 'ampersand-app'

import apiBaseUrl from './apiBaseUrl'

const writeToStore = (store, data, apArtId) => {
  const { valuesForWhichTableDataWasFetched } = store
  transaction(() => {
    data.forEach(d =>
      store.table.tpop.set(d.TPopId, d)
    )
  })
  // record that data was fetched for this value
  if (!valuesForWhichTableDataWasFetched.tpopForAp) {
    valuesForWhichTableDataWasFetched.tpopForAp = {}
  }
  if (!valuesForWhichTableDataWasFetched.tpopForAp.ApArtId) {
    valuesForWhichTableDataWasFetched.tpopForAp.ApArtId = []
  }
  if (!valuesForWhichTableDataWasFetched.tpopForAp.ApArtId.includes(apArtId)) {
    valuesForWhichTableDataWasFetched.tpopForAp.ApArtId.push(apArtId)
  }
}

export default (store, apArtId) => {
  if (!apArtId) {
    return new Error(`action fetchTpopForAp: apArtId must be passed`)
  }
  const { valuesForWhichTableDataWasFetched } = store

  // only fetch if not yet fetched
  if (
    valuesForWhichTableDataWasFetched.tpopForAp &&
    valuesForWhichTableDataWasFetched.tpopForAp.ApArtId &&
    valuesForWhichTableDataWasFetched.tpopForAp.ApArtId.includes(apArtId)
  ) {
    return
  }

  const url = `${apiBaseUrl}/tpopForAp/${apArtId}`

  app.db.tpop
    .toArray()
    .then((data) => {
      if (data) {
        writeToStore(store, data, apArtId)
      }
    })
    .then(() => axios.get(url))
    .then(({ data }) => {
      writeToStore(store, data, apArtId)
      // leave ui react before this happens
      setTimeout(() => app.db.tpop.bulkPut(data), 0)
    })
    .catch(error => new Error(`error fetching tpop for ap ${apArtId}:`, error))
}
