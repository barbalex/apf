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

const StrukturbaumContainer = class StrukturbaumContainer extends Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    // load node
    // TODO: make this depend on path
    const { store } = this.props
    const table = 'projekt'
    const id = 1
    const folder = null
    store.fetchAllNodes(table, id, folder)
  }

  onClickTab = (value) => {
    const { store } = this.props
    store.ui.projekte.strukturbaum.activeTab = value
  }

  render() {
    const { store, location } = this.props
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
        <div className={styles.tabsContent}>
          {
            activeTab === 'strukturbaum'
            && <Strukturbaum location={location} />
          }
          {
            activeTab === 'filter'
            && <Filter />
          }
        </div>
      </div>
    )
  }
}

StrukturbaumContainer.propTypes = {
  store: PropTypes.object,
}

export default inject('store')(observer(StrukturbaumContainer))
