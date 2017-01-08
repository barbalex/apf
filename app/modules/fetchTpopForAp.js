import { transaction } from 'mobx'
import axios from 'axios'
import app from 'ampersand-app'

import apiBaseUrl from './apiBaseUrl'
import recordValuesForWhichTableDataWasFetched from './recordValuesForWhichTableDataWasFetched'

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
      writeToStore(store, data)
      recordValuesForWhichTableDataWasFetched({ store, table: `tpopForAp`, field: `ApArtId`, value: apArtId })
    })
    .then(() => axios.get(url))
    .then(({ data }) => {
      // leave ui react before this happens
      setTimeout(() => writeToStore(store, data))
      setTimeout(() => app.db.tpop.bulkPut(data))
    })
    .catch(error => new Error(`error fetching tpop for ap ${apArtId}:`, error))
}
