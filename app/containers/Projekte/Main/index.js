/*
 *
 * Main
 *
 */

import React, { Component } from 'react'
import app from 'ampersand-app'
import styles from './styles.css'

export default class Main extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const store = app.store
    return (
      <div className={styles.main}>
        Main
      </div>
    )
  }
}
