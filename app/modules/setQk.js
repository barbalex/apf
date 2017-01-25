import dateFns from 'date-fns'

export default ({ store, berichtjahr, messages, filter }) => {
  const apArtId = store.activeUrlElements.ap
  const existingQk = store.qk.get(apArtId)
  if (!berichtjahr && berichtjahr !== 0) {
    const existingBerichtjahr = existingQk && existingQk.berichtjahr ? existingQk.berichtjahr : ``
    if (existingBerichtjahr) {
      berichtjahr = existingBerichtjahr
    } else {
      const refDate = new Date()
      refDate.setMonth(refDate.getMonth() - 6)
      berichtjahr = parseInt(dateFns.format(refDate, `YYYY`), 10)
    }
  }
  if (!messages) {
    messages = existingQk && existingQk.messages ? existingQk.messages : []
  }
  if (!filter && filter !== ``) {
    filter = existingQk && existingQk.filter ? existingQk.filter : ``
  }
  store.qk.set(apArtId, { berichtjahr, messages, filter })
}
