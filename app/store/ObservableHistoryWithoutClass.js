/**
 * need to build a singleton from history
 * where the needed methods are returned
 * and location is made observable
 * reason: MobX starting at v2.7.0 does not accept making history itself observable any more
 * see: https://github.com/mobxjs/mobx/issues/710
 *
 * get ui to follow url changes when user clicks browser back and forwards buttons:
 * http://stackoverflow.com/questions/25806608/how-to-detect-browser-back-button-event-cross-browser
 */

import { observable } from 'mobx'
import createHistory from 'history/createBrowserHistory'

const History = () => {
  this.mouseIsInDoc = true
  this.history = createHistory()
  return this
}

History.action = History.history.action
History.push = History.history.push
History.replace = History.history.replace
History.block = History.history.block
History.go = History.history.go
History.goBack = History.history.goBack
History.goForward = History.history.goForward
History.length = History.history.length
History.createHref = History.history.createHref
History.location = observable(History.history.location)
History.history.listen((location) => {
  History.location = location
})
document.onmouseover = () => {
  History.mouseIsInDoc = true
}
document.onmouseleave = () => {
  History.mouseIsInDoc = false
}
window.onpopstate = () => {
  if (!History.mouseIsInDoc) {
    History.location.pathname = document.location.pathname
    History.location.search = document.location.search
  }
}

export default new History()
