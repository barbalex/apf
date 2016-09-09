/*
 *
 * Projekte
 *
 */

import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import app from 'ampersand-app'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import FlatButton from 'material-ui/FlatButton'
import styles from './styles.css'
import Tree from './Tree'
import Formulare from './Formulare'
import Karte from './Karte'

export default class Projekte extends Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
  }

  render() {
    const store = app.store
    console.log('Projekte.js, render, store:', store)
    return (
      <div className={styles.container}>
        <Helmet
          title="AP Flora: Projekte"
          meta={[
            { name: 'description', content: 'Description of Projekte' },
          ]}
        />
        <Toolbar>
          <FlatButton label="Strukturbaum" />
          <FlatButton label="Strukturbaum 2" />
          <FlatButton label="Daten" />
          <FlatButton label="Karte" />
        </Toolbar>
        <div className={styles.content} >
          <Tree />
          <Formulare />
          <Karte />
        </div>
      </div>
    )
  }
}
