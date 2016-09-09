/*
 *
 * TreeContainer
 *
 */

import React, { Component, PropTypes } from 'react'
import { Tabs, Tab } from 'material-ui/Tabs'
import styles from './styles.css'
import Filter from './Filter'
import Tree from './Tree'

export default class TreeContainer extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.tree}>
        <Tabs>
          <Tab
            label="Strukturbaum"
            value="strukturbaum"
          />
          <Tab
            label="Filter"
            value="filter"
          />
        </Tabs>
        <Tree />
        <Filter />
      </div>
    )
  }
}
