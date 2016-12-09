import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import { ContextMenu, MenuItem } from 'react-contextmenu'
import styles from './styles.css'
import LabelFilter from './LabelFilter'
import Strukturbaum from './Strukturbaum'
import cmProjekt from '../contextmenu/Projekt'

@inject(`store`)
@observer
class StrukturbaumContainer extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: PropTypes.object,
  }

  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    const { store } = this.props
    store.ui.treeHeight = this.tree.clientHeight
    const treeRect = this.tree.getBoundingClientRect()
    store.ui.treeTopPosition = treeRect.top
  }

  render() {
    const { store } = this.props
    const MENU_TYPE = `simple`
    return (
      <div className={styles.container}>
        <div className={styles.labelFilter}>
          <LabelFilter />
        </div>
        <div className={styles.strukturbaum} ref={(c) => { this.tree = c }}>
          <Strukturbaum menuType={MENU_TYPE} />
        </div>
        <cmProjekt store={store} />
      </div>
    )
  }
}

export default StrukturbaumContainer
