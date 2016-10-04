/*
 *
 * Projekte
 *
 */

import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router'
import Helmet from 'react-helmet'
import { Toolbar } from 'material-ui/Toolbar'
import FlatButton from 'material-ui/FlatButton'

import getUrlForNode from '../../modules/getUrlForNode'
import styles from './styles.css'
import StrukturbaumContainer from './StrukturbaumContainer'
import Daten from './Daten'
import Karte from './Karte'

const Projekte = class Projekte extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    // load node
    // TODO: make this depend on path
    const { store } = this.props
    const table = 'projekt'
    const id = null
    const folder = null
    const path = [{ table, id, folder }]
    store.fetchAllNodes(path)
  }

  render() {
    const { store, location, params } = this.props

    console.log('Projekte: params:', params)

    const activeNode = store.data.activeNode
    let to = null
    if (activeNode) {
      to = getUrlForNode(activeNode)
      console.log('redirect to:', to)
    }

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
            !!to
            && <Redirect to={to} />
          }
          {
            store.ui.projekte.strukturbaum.visible
            && <StrukturbaumContainer location={location} />
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
