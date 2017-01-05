import axios from 'axios'
import { transaction } from 'mobx'
import apiBaseUrl from './apiBaseUrl'

export default (store) => {
  // only fetch if not yet done
  if (store.app.fields.length === 0 && !store.app.fieldsLoading) {
    store.app.fieldsLoading = true
    axios.get(`${apiBaseUrl}/felder`)
      .then(({ data }) => {
        transaction(() => {
          store.app.fields = data
          store.app.fieldsLoading = false
        })
      })
      .catch(error => console.log(`error fetching fields:`, error))
  }
}
