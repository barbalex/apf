import { observable } from 'mobx'
import $ from 'jquery'

class Ui {
  @observable windowWidth = $(window).width()
  @observable windowHeight = $(window).height()
  @observable treeHeight = 0
  @observable lastClickY = 0
  @observable treeTopPosition = 0
}

export default new Ui()
