import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import { ContextMenu, MenuItem } from 'react-contextmenu'
import styles from './styles.css'
import LabelFilter from './LabelFilter'
import Strukturbaum from './Strukturbaum'

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

  handleClick(e, data, element) {
    console.log(`click, data:`, data)
    console.log(`click, table:`, element.firstElementChild.getAttribute(`data-table`))
  }

  render() {
    const MENU_TYPE = `simple`
    return (
      <div className={styles.container}>
        <div className={styles.labelFilter}>
          <LabelFilter />
        </div>
        <div className={styles.strukturbaum} ref={(c) => { this.tree = c }}>
          <Strukturbaum menuType={MENU_TYPE} />
        </div>
        <ContextMenu id={`menu_pop`}>
          <MenuItem onClick={this.handleClick} data={{ item: `item 1` }}>Menu Item 1</MenuItem>
        </ContextMenu>
      </div>
    )
  }
}

export default StrukturbaumContainer
