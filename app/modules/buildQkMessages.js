import { extendObservable, computed } from 'mobx'

export default ({
  berichtjahr,
  messages,
  filter,
}) => {
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
  return value
}
