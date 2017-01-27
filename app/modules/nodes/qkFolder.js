export default (store, projId, apArtId) => {
  const qk = store.qk.get(apArtId)
  let nrOfQkMessages = 0
  if (qk && qk.messagesFiltered && qk.messagesFiltered.length === 0 && !qk.filter) {
    nrOfQkMessages = `...`
  }
  if (qk && qk.messagesFiltered && qk.messagesFiltered.length > 0) {
    nrOfQkMessages = qk.messagesFiltered.length
  }
  if (qk && qk.filter) {
    nrOfQkMessages = `${nrOfQkMessages} gefiltert`
  }
  if (!store.activeUrlElements.qk) {
    // only show number when qk is active
    nrOfQkMessages = null
  }
  const label = `Qualitätskontrollen${nrOfQkMessages ? ` (${nrOfQkMessages})` : ``}`
  return {
    nodeType: `folder`,
    menuType: `qkFolder`,
    id: apArtId,
    label,
    expanded: false,
    url: [`Projekte`, projId, `Arten`, apArtId, `Qualitaetskontrollen`],
  }
}
