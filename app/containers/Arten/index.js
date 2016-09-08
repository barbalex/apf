/*
 *
 * Arten
 *
 */

import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import app from 'ampersand-app'
import styles from './styles.css'

export default class Arten extends Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
  }

  render() {
    const store = app.store
    console.log('Arten.js, render, store:', store)
    return (
      <div className={styles.arten}>
        <Helmet
          title="AP Flora: Arten"
          meta={[
            { name: 'description', content: 'Description of Arten' },
          ]}
        />
        Arten Page
      </div>
    )
  }
}
