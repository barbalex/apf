/*
 *
 * Formulare
 *
 */

import React from 'react'
import { observer, inject } from 'mobx-react'
import styles from './styles.css'

const Formulare = class Formulare extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.container}>
        Daten
      </div>
    )
  }
}

export default inject('store')(observer(Formulare))
