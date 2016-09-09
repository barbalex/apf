/*
 *
 * Projekte
 *
 */

import React from 'react'
import { observer } from 'mobx-react'
import Helmet from 'react-helmet'
import { Toolbar } from 'material-ui/Toolbar'
import FlatButton from 'material-ui/FlatButton'
import styles from './styles.css'
import TreeContainer from './TreeContainer'
import Daten from './Daten'
import Karte from './Karte'

const Projekte = observer(
  class Projekte extends React.Component { // eslint-disable-line react/prefer-stateless-function
    static contextTypes = {
      router: React.PropTypes.object.isRequired,
      store: React.PropTypes.object.isRequired,
    }

    render() {
      const { router, store } = this.context
      console.log('Projekte, render, router:', router)
      console.log('Projekte, render, store:', store)
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
              onClick={() => { store.ui.projekteViews.map.visible = !store.ui.projekteViews.map.visible }}
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
)

export default Projekte
