/*
 *
 * StrukturbaumContainer
 *
 */

import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import styles from './styles.css'
import LabelFilter from './LabelFilter'
import Strukturbaum from './Strukturbaum'

@inject(`store`)
@observer
class StrukturbaumContainer extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: PropTypes.object,
  }

  componentDidMount() {
    const { store } = this.props
    store.ui.treeHeight = this.tree.clientHeight
    const treeRect = this.tree.getBoundingClientRect()
    store.ui.treeTopPosition = treeRect.top
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
      </div>
    )
  }
}

export default StrukturbaumContainer
