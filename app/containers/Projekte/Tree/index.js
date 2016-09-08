/*
 *
 * Tree
 *
 */

import React, { Component, PropTypes } from 'react'
import app from 'ampersand-app'
import styles from './styles.css'

export default class Tree extends Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
  }

  render() {
    const store = app.store
    return (
      <div className={styles.tree}>
        Tree
      </div>
    )
  }
}
