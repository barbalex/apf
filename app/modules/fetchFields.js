import axios from 'axios'
import { transaction } from 'mobx'
import app from 'ampersand-app'

import apiBaseUrl from './apiBaseUrl'

export default (store) => {
  // only fetch if not yet done
  if (store.app.fields.length === 0 && !store.app.fieldsLoading) {
    store.app.fieldsLoading = true
    app.db.fields
      .toArray()
      .then((values) => {
        if (values.length > 0) {
          // console.log(`fetching fields from idb`)
          transaction(() => {
            store.app.fields = values
            store.app.fieldsLoading = false
          })
        }
      })
      .then(() => axios.get(`${apiBaseUrl}/felder`))
      .then(({ data }) => {
        transaction(() => {
          store.app.fields = data
          store.app.fieldsLoading = false
        })
        app.db.fields.bulkPut(data)
      })
      .catch(error => console.log(`error fetching fields:`, error))
  }
}
