/*
 *
 * TreeContainer
 *
 */

import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Tabs, Tab } from 'material-ui/Tabs'
import styles from './styles.css'
import Filter from './Filter'
import Tree from './Tree'

const TreeContainer = observer(
  class TreeContainer extends Component { // eslint-disable-line react/prefer-stateless-function
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
              <Tree />
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

export default TreeContainer
