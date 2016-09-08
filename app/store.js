import { observable } from 'mobx-react'
import $ from 'jquery'

export default class Store {
  @observable data
  @observable ui

  constructor(transportLayer) {
    this.transportLayer = transportLayer
    this.data = {
      nodes: [],
      nodes2: [],
      activeDataset: null,
      map: null,
    }
    this.ui = {
      windowWidth: $(window).width(),
      windowHeight: $(window).height(),
      artenViews: {
        tree: {
          visible: true,
          width: '400px',
        },
        tree2: {
          visible: false,
          width: 0,
        },
        form: {
          visible: true,
          width: '100%',
        },
        map: {
          visible: false,
          width: 0,
        },
      },
    }
    $.resize(() => {
      // should this be debounced?
      this.windowWidth = $(window).width()
      this.windowHeight = $(window).height()
    })
  }
}
