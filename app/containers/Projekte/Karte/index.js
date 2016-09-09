/*
 *
 * Karte
 *
 */

import React from 'react'
import styles from './styles.css'

export default class Karte extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
    store: React.PropTypes.object.isRequired,
  }

  render() {
    return (
      <div className={styles.container}>
        Karte
      </div>
    )
  }
}
