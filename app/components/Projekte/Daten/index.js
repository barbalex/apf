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

  constructor() {
    super()
    this.activeForm = this.activeForm.bind(this)
  }

  activeForm() {
    const { store } = this.props
    if (!store.activeDataset || !store.activeDataset.table) {
      return <div />
    }
    switch (store.activeDataset.table) {
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
          store.activeDataset.row &&
          <div className={styles.container}>
            <p>Daten</p>
            <pre>
              {JSON.stringify(store.activeDataset, null, 2)}
            </pre>
          </div>
        )
    }
  }

  render() {
    return this.activeForm()
  }
}

export default Daten
