/*
 *
 * Projekte
 *
 */

import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import Helmet from 'react-helmet'
import { Toolbar } from 'material-ui/Toolbar'
import FlatButton from 'material-ui/FlatButton'
import styles from './styles.css'
import StrukturbaumContainer from './StrukturbaumContainer'
import Daten from './Daten'
import Karte from './Karte'

const Projekte = class Projekte extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  render() {
    const { store } = this.props
    console.log('this.props:', this.props)
    const { router } = this.context
    return (
      <div className={styles.container}>
        <Helmet
          title="AP Flora: Projekte"
          meta={[
            { name: 'description', content: 'Description of Projekte' },
          ]}
        />
        <Toolbar className={styles.toolbar} >
          <FlatButton
            label="Strukturbaum"
            primary={store.ui.projekte.strukturbaum.visible}
            onClick={() => {
              store.ui.projekte.strukturbaum.visible = !store.ui.projekte.strukturbaum.visible
            }}
          />
          <FlatButton
            label="Strukturbaum 2"
            primary={store.ui.projekte.strukturbaum2.visible}
            onClick={() => {
              store.ui.projekte.strukturbaum2.visible = !store.ui.projekte.strukturbaum2.visible
            }}
            disabled
          />
          <FlatButton
            label="Daten"
            primary={store.ui.projekte.daten.visible}
            onClick={() => {
              store.ui.projekte.daten.visible = !store.ui.projekte.daten.visible
            }}
          />
          <FlatButton
            label="Karte"
            primary={store.ui.projekte.karte.visible}
            onClick={() => {
              store.ui.projekte.karte.visible = !store.ui.projekte.karte.visible
            }}
          />
        </Toolbar>
        <div className={styles.content} >
          {
            store.ui.projekte.strukturbaum.visible
            && <StrukturbaumContainer />
          }
          {
            store.ui.projekte.daten.visible
            && <Daten />
          }
          {
            store.ui.projekte.karte.visible
            && <Karte />
          }
        </div>
      </div>
    )
  }
}

Projekte.propTypes = {
  store: PropTypes.object,
}

export default inject('store')(observer(Projekte))
