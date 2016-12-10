import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import styles from './styles.css'
import LabelFilter from './LabelFilter'
import Strukturbaum from './Strukturbaum'
import CmProjekt from './contextmenu/Projekt'
import CmApFolder from './contextmenu/ApFolder'
import CmAp from './contextmenu/Ap'

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
    console.log(`table:`, data.table)
    console.log(`id:`, element.firstElementChild.getAttribute(`data-id`))
    console.log(`action:`, data.action)
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.labelFilter}>
          <LabelFilter />
        </div>
        <div className={styles.strukturbaum} ref={(c) => { this.tree = c }}>
          <Strukturbaum />
        </div>
        <CmProjekt onClick={this.handleClick} />
        <CmApFolder onClick={this.handleClick} />
        <CmAp onClick={this.handleClick} />
      </div>
    )
  }
}

export default StrukturbaumContainer
