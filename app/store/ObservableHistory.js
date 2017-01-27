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

import { observable, extendObservable } from 'mobx'
import singleton from 'singleton'
import createHistory from 'history/createBrowserHistory'

class ObservableHistory extends singleton {
  constructor() {
    super()
    this.location = this.history.location
    this.history.listen((location) => {
      this.location = location
    })
    document.onmouseover = () => {
      this.mouseIsInDoc = true
    }
    document.onmouseleave = () => {
      this.mouseIsInDoc = false
    }
    window.onpopstate = () => {
      if (!this.mouseIsInDoc) {
        this.location.pathname = document.location.pathname
        this.location.search = document.location.search
      }
    }
    /*
    extendObservable(this, {
      location: ``,
    })*/
  }

  mouseIsInDoc = true

  history = createHistory()
  action = this.history.action
  push = this.history.push
  replace = this.history.replace
  block = this.history.block
  go = this.history.go
  goBack = this.history.goBack
  goForward = this.history.goForward
  length = this.history.length
  createHref = this.history.createHref
  @observable location = ``
}

export default ObservableHistory.get()
