import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
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
    const datenIsVisible = projekteTabs.includes(`daten`)
    const karteIsVisible = projekteTabs.includes(`karte`)

    return (
      <div className={styles.container}>
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
