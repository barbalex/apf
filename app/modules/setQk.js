import dateFns from 'date-fns'
import compose from 'recompose/compose'
import renameProps from 'recompose/renameProps'

const enhance = compose(
  renameProps({
    berichtjahr: `berichtjahrPassed`,
    messages: `messagesPassed`,
    filter: `filterPassed`,
  })
)

const setQk = ({ store, berichtjahrPassed, messagesPassed, filterPassed }) => {
  const apArtId = store.activeUrlElements.ap
  let berichtjahr = berichtjahrPassed
  const messages = messagesPassed || []
  let filter = filterPassed
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
  if (!filter && filter !== ``) {
    filter = existingQk && existingQk.filter ? existingQk.filter : ``
  }
  store.qk.set(apArtId, { berichtjahr, messages, filter })
}

export default enhance(setQk)
