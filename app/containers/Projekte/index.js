/*
 *
 * Projekte
 *
 */

import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import app from 'ampersand-app'
import styles from './styles.css'

export default class Projekte extends Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
  }

  render() {
    const store = app.store
    console.log('Projekte.js, render, store:', store)
    return (
      <div className={styles.projekte}>
        <Helmet
          title="AP Flora: Projekte"
          meta={[
            { name: 'description', content: 'Description of Projekte' },
          ]}
        />
        Projekte Page
      </div>
    )
  }
}
