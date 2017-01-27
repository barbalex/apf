import dateFns from 'date-fns'
import compose from 'recompose/compose'
import renameProps from 'recompose/renameProps'
import { extendObservable, computed } from 'mobx'

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

export default enhance(setQk)
