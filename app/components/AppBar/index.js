import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import AppBar from 'material-ui/AppBar'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import FlatButton from 'material-ui/FlatButton'
import clone from 'lodash/clone'
import remove from 'lodash/remove'

import styles from './styles.css'

@inject(`store`)
@observer
class MyAppBar extends React.Component { // eslint-disable-line react/prefer-stateless-function

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
    const { activeUrlElements } = store
    const projekteTabs = clone(store.urlQuery.projekteTabs)
    const strukturbaumIsVisible = projekteTabs.includes(`strukturbaum`)
    const datenIsVisible = projekteTabs.includes(`daten`)
    const karteIsVisible = projekteTabs.includes(`karte`)
    return (
      <AppBar
        title="AP Flora"
        className={styles.menuDiv}
        iconElementRight={
          <div
            className={styles.menuDiv}
          >
            <FlatButton
              label="Strukturbaum"
              secondary={!strukturbaumIsVisible}
              onClick={() =>
                this.onClickButton(`strukturbaum`)
              }
            />
            <FlatButton
              label="Daten"
              secondary={!datenIsVisible}
              onClick={() => {
                this.onClickButton(`daten`)
              }}
            />
            <FlatButton
              label="Karte"
              secondary={!karteIsVisible}
              disabled={activeUrlElements.exporte}
              onClick={() =>
                this.onClickButton(`karte`)
              }
            />
            <IconMenu
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
              anchorOrigin={{ horizontal: `left`, vertical: `bottom` }}
              targetOrigin={{ horizontal: `left`, vertical: `top` }}
              style={{ paddingLeft: 10 }}
            >
              <MenuItem
                primaryText="Über apflora.ch"
                onTouchTap={() =>
                  window.open(`https://github.com/FNSKtZH/apflora/wiki`)
                }
              />
            </IconMenu>
          </div>
        }
        showMenuIconButton={false}
      />
    )
  }
}

export default MyAppBar
