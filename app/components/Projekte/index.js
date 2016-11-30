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

@inject(`store`)
@observer
class Projekte extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: PropTypes.object,
  }

  render() {
    const { store } = this.props

    return (
      <div className={styles.container}>
        <Helmet
          title="AP Flora: Projekte"
          meta={[
            { name: `description`, content: `Description of Projekte` },
          ]}
        />
        <Toolbar className={styles.toolbar} >
          <FlatButton
            label="Strukturbaum"
            primary={strukturbaum.visible}
            onClick={() => {
              strukturbaum.visible = !strukturbaum.visible
            }}
          />
          <FlatButton
            label="Strukturbaum 2"
            primary={strukturbaum2.visible}
            onClick={() => {
              strukturbaum2.visible = !strukturbaum2.visible
            }}
            disabled
          />
          <FlatButton
            label="Daten"
            primary={daten.visible}
            onClick={() => {
              daten.visible = !daten.visible
            }}
          />
          <FlatButton
            label="Karte"
            primary={karte.visible}
            onClick={() => {
              karte.visible = !karte.visible
            }}
          />
        </Toolbar>
        <div className={styles.content} >
          {
            strukturbaum.visible
              && <StrukturbaumContainer />
          }
          {
            daten.visible
              && <Daten />
          }
          {
            karte.visible
              && <Karte />
          }
        </div>
      </div>
    )
  }
}

export default Projekte
