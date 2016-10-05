/*
 *
 * Karte
 *
 */

import React from 'react'
import { observer, inject } from 'mobx-react'
import styles from './styles.css'

const Karte = class Karte extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.container}>
        Karte
      </div>
    )
  }
}

export default inject('store')(observer(Karte))
