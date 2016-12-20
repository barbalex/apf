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
    this.history.listen((location) => {
      this.location = location
    })
  }

  history = createHistory()
  push = this.history.push
  @observable location = ``
}

export default new ObservableHistory()
