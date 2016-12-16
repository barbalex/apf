/*
 *
 * Daten
 *
 */

import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import styled from 'styled-components'

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
import Popmassnber from './Popmassnber'
import Popber from './Popber'
import Tpop from './Tpop'
import Tpopber from './Tpopber'
import Tpopmassn from './Tpopmassn'
import Tpopmassnber from './Tpopmassnber'
import Tpopfeldkontr from './Tpopfeldkontr'
import Tpopfreiwkontr from './Tpopfreiwkontr'
import Tpopkontrzaehl from './Tpopkontrzaehl'
import Exporte from './Exporte'
import Qk from './Qk'

@inject(`store`)
@observer
class Daten extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: PropTypes.object,
  }

  render() {
    const { store } = this.props
    const { activeDataset, activeUrlElements } = store
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
      popmassnber: <Popmassnber />,
      popber: <Popber />,
      tpop: <Tpop />,
      tpopber: <Tpopber />,
      tpopmassn: <Tpopmassn />,
      tpopmassnber: <Tpopmassnber />,
      tpopfeldkontr: <Tpopfeldkontr />,
      tpopfreiwkontr: <Tpopfreiwkontr />,
      tpopkontrzaehl: <Tpopkontrzaehl />,
      exporte: <Exporte />,
      qk: <Qk />,
    }
    const standardForm = (
      <div>
        <p>Daten</p>
        <pre>
          {JSON.stringify(activeDataset.row, null, 2)}
        </pre>
      </div>
    )
    let key
    if (activeUrlElements.exporte) {
      key = `exporte`
    } else if (activeUrlElements.qk) {
      key = `qk`
    } else {
      key = activeDataset.table
    }
    const form = formObject[key] || standardForm
    const Container = styled.div`
      border-color: #424242;
      border-width: 1px;
      border-style: solid;
      flex-basis: 600px;
      flex-grow: 4;
      flex-shrink: 1;
    `

    return (
      <Container>
        {form}
      </Container>
    )
  }
}

export default Daten
