import { extendObservable, computed } from 'mobx'

export default ({ store, messages }) => {
  const apArtId = store.activeUrlElements.ap
  const existingQk = store.qk.get(apArtId)
  const newMessages = existingQk.messages.concat(messages)
  const filter = existingQk.filter
  const value = {
    berichtjahr: existingQk.berichtjahr,
    messages: newMessages,
    filter,
  }
  extendObservable(value, {
    messagesFiltered: computed(() => (
      filter ?
      newMessages.filter(m =>
        m.hw.toLowerCase().includes(filter.toLowerCase())
      ) :
      newMessages
    )),
  })
  store.qk.set(apArtId, value)
}
