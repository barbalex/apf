/*
 *
 * Daten
 *
 */

import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import styles from './styles.css'

const Daten = class Daten extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { store } = this.props
    return (
      <div className={styles.container}>
        <p>Daten</p>
        <pre>
          {
            store.data.activeDataset
            && JSON.stringify(store.data.activeDataset, null, 2)
          }
        </pre>
      </div>
    )
  }
}

Daten.propTypes = {
  store: PropTypes.object,
}

export default inject('store')(observer(Daten))
