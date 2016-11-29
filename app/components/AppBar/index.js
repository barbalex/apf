import React from 'react'
import { observer, inject } from 'mobx-react'
import AppBar from 'material-ui/AppBar'
import { Tabs, Tab } from 'material-ui/Tabs'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'

import styles from './styles.css'

const MyAppBar = ({ store }) =>
  <AppBar
    title="AP Flora"
    className={styles.menuDiv}
    iconElementRight={
      <div
        className={styles.menuDiv}
      >
        <Tabs
          value={store.history.location.pathname}
          onChange={path =>
            store.history.push(path)
          }
        >
          <Tab
            label="Projekte"
            value="/Projekte"
            className={styles.tab}
          />
          <Tab
            label="Exporte"
            value="/Exporte"
            className={styles.tab}
          />
          <Tab
            label="Benutzer"
            value="/Benutzer"
            className={styles.tab}
          />
        </Tabs>
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

MyAppBar.propTypes = {
  store: React.PropTypes.object,
}

export default inject(`store`)(observer(MyAppBar))
