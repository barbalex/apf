/*
 *
 * StrukturbaumContainer
 *
 */

import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Tabs, Tab } from 'material-ui/Tabs'
import styles from './styles.css'
import Filter from './Filter'
import Strukturbaum from './Strukturbaum'

const StrukturbaumContainer = observer(
  class StrukturbaumContainer extends Component { // eslint-disable-line react/prefer-stateless-function
    static contextTypes = {
      router: React.PropTypes.object.isRequired,
      store: React.PropTypes.object.isRequired,
    }

    componentDidMount() {
      // load node
      // TODO: depending on path
      const { store } = this.context
      const table = 'projekt'
      const id = 1
      const folder = null
      const levels = 'all'
      store.actions.loadNodes(table, id, folder, levels)
    }

    onClickTab = (value) => {
      const { store } = this.context
      store.ui.projekte.strukturbaum.activeTab = value
    }

    render() {
      const { store } = this.context
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
          {
            activeTab === 'strukturbaum'
            && <Strukturbaum />
          }
          {
            activeTab === 'filter'
            && <Filter />
          }
        </div>
      )
    }
  }
)

export default StrukturbaumContainer
