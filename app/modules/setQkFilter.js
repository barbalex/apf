import { extendObservable, computed } from 'mobx'

const setQk = ({ store, filter }) => {
  const apArtId = store.activeUrlElements.ap
  const existingQk = store.qk.get(apArtId)
  const { berichtjahr, messages } = existingQk
  const value = {
    berichtjahr,
    messages,
    filter,
  }
  extendObservable(value, {
    messagesFiltered: computed(() => (
      filter ?
      messages.filter(m =>
        m.hw.toLowerCase().includes(filter.toLowerCase())
      ) :
      messages
    )),
  })
  store.qk.set(apArtId, value)
}

export default setQk
