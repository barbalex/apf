/*
 *
 * StrukturbaumContainer
 *
 */

import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import { Tabs, Tab } from 'material-ui/Tabs'
import styles from './styles.css'
import Filter from './Filter'
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

  onClickTab = (value) => {
    const { store } = this.props
    store.ui.projekte.strukturbaum.activeTab = value
  }

  render() {
    const { store } = this.props
    const activeTab = store.ui.projekte.strukturbaum.activeTab
    return (
      <div className={styles.strukturbaum}>
        <Tabs
          value={activeTab}
          onChange={this.onClickTab}
        >
          <Tab
            label="Strukturbaum"
            value="strukturbaum"
            className={styles.strukturbaumTab}
          >
          </Tab>
          <Tab
            label="Filter"
            value="filter"
          >
          </Tab>
        </Tabs>
        <div className={styles.tabsContent} ref={(c) => { this.tree = c }}>
          {
            activeTab === `strukturbaum`
            && <Strukturbaum />
          }
          {
            activeTab === `filter`
            && <Filter />
          }
        </div>
      </div>
    )
  }
}

export default StrukturbaumContainer
