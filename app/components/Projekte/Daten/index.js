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
import Assozart from './Assozart'
import Idealbiotop from './Idealbiotop'
import Ber from './Ber'
import Ziel from './Ziel'
import Zielber from './Zielber'

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
    const formObject = {
      projekt: <Projekt />,
      apberuebersicht: <Apberuebersicht />,
      ap: <Ap />,
      assozart: <Assozart />,
      idealbiotop: <Idealbiotop />,
      erfkrit: <Erfkrit />,
      apber: <Apber />,
      ber: <Ber />,
      ziel: <Ziel />,
      zielber: <Zielber />,
      pop: <Pop />,
    }
    const standardForm = (
      <div>
        <p>Daten</p>
        <pre>
          {JSON.stringify(activeDataset.row, null, 2)}
        </pre>
      </div>
    )
    const form = formObject[activeDataset.table] || standardForm
    return (
      <div className={styles.container}>
        {form}
      </div>
    )
  }
}

export default Daten
