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

    onClickTab = (value) => {
      const { store } = this.context
      store.ui.projekte.strukturbaum.activeTab = value
    }

    render() {
      const { store } = this.context
      return (
        <div className={styles.strukturbaum}>
          <Tabs
            value={store.ui.projekte.strukturbaum.activeTab}
            onChange={this.onClickTab}
          >
            <Tab
              label="Strukturbaum"
              value="strukturbaum"
            >
              <Strukturbaum />
            </Tab>
            <Tab
              label="Filter"
              value="filter"
            >
              <Filter />
            </Tab>
          </Tabs>
        </div>
      )
    }
  }
)

export default StrukturbaumContainer
