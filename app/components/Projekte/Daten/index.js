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
    const { store } = this.props
    return (
      <div className={styles.container}>
        <h4>Daten</h4>
        <pre>{JSON.stringify(store.data.activeDataset, null, 2)}</pre>
      </div>
    )
  }
}

export default inject('store')(observer(Formulare))
