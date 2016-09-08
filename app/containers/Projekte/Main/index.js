/*
 *
 * Main
 *
 */

import React, { Component } from 'react'
import app from 'ampersand-app'
import { Tabs, Tab } from 'material-ui/Tabs'
import styles from './styles.css'

export default class Main extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const store = app.store
    return (
      <div className={styles.main}>
        <Tabs>
          <Tab
            label="Formulare"
            value="formulare"
            className={styles.tab}
          />
          <Tab
            label="Karte"
            value="karte"
            className={styles.tab}
          />
        </Tabs>
      </div>
    )
  }
}
