/*
 *
 * Projekte
 *
 */

import React, { Component } from 'react'
import Helmet from 'react-helmet'
import app from 'ampersand-app'
import { Toolbar } from 'material-ui/Toolbar'
import FlatButton from 'material-ui/FlatButton'
import styles from './styles.css'
import TreeContainer from './TreeContainer'
import Daten from './Daten'
import Karte from './Karte'

export default class Projekte extends Component { // eslint-disable-line react/prefer-stateless-function
  /*
  constructor(props) {
    super(props)
  }*/

  render() {
    const { store } = app
    console.log('Projekte.js, render, store:', store)
    console.log('Projekte.js, render, this.props:', this.props)
    console.log('Projekte.js, render, this.context:', this.context)
    // TODO: set primary on active FlatButton
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
            primary={store.ui.projekteViews.tree.visible}
          />
          <FlatButton
            label="Strukturbaum 2"
            primary={store.ui.projekteViews.tree2.visible}
          />
          <FlatButton
            label="Daten"
            primary={store.ui.projekteViews.daten.visible}
          />
          <FlatButton
            label="Karte"
            primary={store.ui.projekteViews.map.visible}
          />
        </Toolbar>
        <div className={styles.content} >
          <TreeContainer />
          <Daten />
          <Karte />
        </div>
      </div>
    )
  }
}
