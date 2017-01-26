export default ({ store, messages }) => {
  const apArtId = store.activeUrlElements.ap
  const existingQk = store.qk.get(apArtId)
  const newMessages = existingQk.messages.concat(messages)
  store.qk.set(
    apArtId,
    {
      berichtjahr: existingQk.berichtjahr,
      messages: newMessages,
      filter: existingQk.filter,
    }
  )
}
