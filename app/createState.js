import { observable } from 'mobx-react'
import $ from 'jquery'

const defaultState = observable({
  data: {
    nodes: [],
    nodes2: [],
    activeDataset: null,
    map: null,
  },
  ui: {
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
  },
  /*$.resize(() => {
    // should this be debounced?
    this.windowWidth = $(window).width()
    this.windowHeight = $(window).height()
  })*/
})

export default defaultState
