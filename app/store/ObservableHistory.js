/**
 * need to build a singleton from history
 * where the needed methods are returned
 * and location is made observable
 * reason: MobX starting at v2.7.0 does not accept making history itself observable any more
 * see: https://github.com/mobxjs/mobx/issues/710
 */

import { observable } from 'mobx'
import singleton from 'singleton'
import createHistory from 'history/createBrowserHistory'

class ObservableHistory extends singleton {
  constructor() {
    super()
    this.location = this.history.location
    // console.log(`history:`, this.history)
    this.history.listen((location) => {
      this.location = location
    })
  }

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
