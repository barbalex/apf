/**
 * Note: we are using singleton to make sure that it's one instance only,
 * because the store can be used outside react components, eg. routes.js
 * from: http://stackoverflow.com/questions/35850871/how-to-connect-state-to-props-with-mobx-js-observer-when-use-es6-class/36164488#36164488
 */

// import { observable } from 'mobx-react'  // reason for error????
import { observable } from 'mobx'
import $ from 'jquery'
import singleton from 'singleton'

class Store extends singleton {
  data = observable({
    nodes: [],
    nodes2: [],
    activeDataset: null,
    map: null,
  })
  ui = observable({
    windowWidth: $(window).width(),
    windowHeight: $(window).height(),
    projekteViews: {
      tree: {
        visible: true,
        treeActive: true,
        width: '400px',
      },
      tree2: {
        visible: false,
        treeActive: true,
        width: 0,
      },
      daten: {
        visible: true,
        width: '100%',
      },
      map: {
        visible: false,
        width: 0,
      },
    },
  })
}

export default Store.get()
