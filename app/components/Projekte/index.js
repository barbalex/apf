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
import clone from 'lodash/clone'
import remove from 'lodash/remove'

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

  constructor() {
    super()
    this.onClickButton = this.onClickButton.bind(this)
  }

  onClickButton(name) {
    const { store } = this.props
    const projekteTabs = store.urlQuery.projekteTabs ? clone(store.urlQuery.projekteTabs) : []
    const isVisible = projekteTabs.includes(name)
    if (isVisible) {
      remove(projekteTabs, el => el === name)
    } else {
      projekteTabs.push(name)
    }
    store.setUrlQuery(`projekteTabs`, projekteTabs)
  }

  render() {
    const { store } = this.props
    const projekteTabs = clone(store.urlQuery.projekteTabs)
    const strukturbaumIsVisible = projekteTabs.includes(`strukturbaum`)
    const strukturbaum2IsVisible = projekteTabs.includes(`strukturbaum2`)
    const datenIsVisible = projekteTabs.includes(`daten`)
    const karteIsVisible = projekteTabs.includes(`karte`)

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
            primary={strukturbaumIsVisible}
            onClick={() =>
              this.onClickButton(`strukturbaum`)
            }
          />
          <FlatButton
            label="Strukturbaum 2"
            primary={strukturbaum2IsVisible}
            onClick={() =>
              this.onClickButton(`strukturbaum2`)
            }
            disabled
          />
          <FlatButton
            label="Daten"
            primary={datenIsVisible}
            onClick={() => {
              this.onClickButton(`daten`)
            }}
          />
          <FlatButton
            label="Karte"
            primary={karteIsVisible}
            onClick={() =>
              this.onClickButton(`karte`)
            }
          />
        </Toolbar>
        <div className={styles.content} >
          {
            strukturbaumIsVisible
              && <StrukturbaumContainer />
          }
          {
            datenIsVisible
              && <Daten />
          }
          {
            karteIsVisible
              && <Karte />
          }
        </div>
      </div>
    )
  }
}

export default Projekte
