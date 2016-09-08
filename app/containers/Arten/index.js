/*
 *
 * Arten
 *
 */

import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import styles from './styles.css'

export default class Arten extends Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
  }

  render() {
    console.log('Arten.js, render, props:', this.props)
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
