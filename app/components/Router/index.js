/*
 *
 * Projekte
 *
 */

import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import DevTools from 'mobx-react-devtools'

import AppBar from '../AppBar'
import Projekte from '../Projekte'
import Exporte from '../Exporte'
import Benutzer from '../Benutzer'

@inject(`store`)
@observer
class Router extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: PropTypes.object,
  }

  render() {
    const { store } = this.props

    return (
      <div>
        <DevTools />
        <AppBar />
        {
          store.activeUrlElements.projektFolder
          && <Projekte />
        }
        {
          store.activeUrlElements.exporte
          && <Exporte />
        }
        {
          store.activeUrlElements.benutzer
          && <Benutzer />
        }
      </div>
    )
  }
}

export default Router
