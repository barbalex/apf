/*
 *
 * Daten
 *
 */

import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import styles from './styles.css'
import Projekt from './Projekt'
import Ap from './Ap'
import Apberuebersicht from './Apberuebersicht'
import Erfkrit from './Erfkrit'
import Apber from './Apber'
import Pop from './Pop'

@inject(`store`)
@observer
class Daten extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: PropTypes.object,
  }

  render() {
    const { store } = this.props
    const { activeDataset } = store
    if (!activeDataset || !activeDataset.table || !activeDataset.row) {
      return <div />
    }
    switch (activeDataset.table) {
      case `projekt`:
        return (
          <div className={styles.container}>
            <Projekt />
          </div>
        )
      case `apberuebersicht`:
        return (
          <div className={styles.container}>
            <Apberuebersicht />
          </div>
        )
      case `ap`:
        return (
          <div className={styles.container}>
            <Ap />
          </div>
        )
      case `erfkrit`:
        return (
          <div className={styles.container}>
            <Erfkrit />
          </div>
        )
      case `apber`:
        return (
          <div className={styles.container}>
            <Apber />
          </div>
        )
      case `pop`:
        return <Pop />
      default:
        return (
          activeDataset &&
          activeDataset.row &&
          <div className={styles.container}>
            <p>Daten</p>
            <pre>
              {JSON.stringify(activeDataset.row, null, 2)}
            </pre>
          </div>
        )
    }
  }
}

export default Daten
