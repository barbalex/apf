import { observable } from 'mobx'
import $ from 'jquery'

class Ui {
  @observable windowWidth = $(window).width()
  @observable windowHeight = $(window).height()
  @observable treeHeight = 0
  @observable lastClickY = 0
  @observable treeTopPosition = 0
  @observable projekte = {
    strukturbaum: {
      visible: true,
    },
    strukturbaum2: {
      visible: false,
      strukturbaumActive: true,
    },
    daten: {
      visible: true,
    },
    karte: {
      visible: false,
    },
  }
}

export default new Ui()
