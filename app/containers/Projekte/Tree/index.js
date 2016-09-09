/*
 *
 * Tree
 *
 */

import React, { Component, PropTypes } from 'react'
import app from 'ampersand-app'
import { Tabs, Tab } from 'material-ui/Tabs'
import styles from './styles.css'

export default class Tree extends Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
  }

  render() {
    const store = app.store
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
        Strukturbaum
      </div>
    )
  }
}
