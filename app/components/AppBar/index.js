import React from 'react'
import AppBar from 'material-ui/AppBar'
import { Tabs, Tab } from 'material-ui/Tabs'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import { browserHistory } from 'react-router'

import styles from './styles.css'

const onClickTab = (path) => {
  browserHistory.push(path)
}

const MyAppBar = () => {
  return (
    <AppBar
      title="AP Flora"
      className={styles.menuDiv}
      iconElementRight={
        <div
          className={styles.menuDiv}
        >
          <Tabs>
            <Tab
              label="Projekte"
              className={styles.tab}
              onClick={() => onClickTab('/projekte')}
            />
            <Tab
              label="Exporte"
              className={styles.tab}
              onClick={() => onClickTab('/exporte')}
            />
            <Tab
              label="Benutzer"
              className={styles.tab}
              onClick={() => onClickTab('/benutzer')}
            />
          </Tabs>
          <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            targetOrigin={{ horizontal: 'left', vertical: 'top' }}
            style={{
              paddingLeft: 10,
            }}
          >
            <MenuItem
              primaryText="Über apflora.ch"
              onTouchTap={() =>
                window.open('https://github.com/FNSKtZH/apflora/wiki')
              }
            />
          </IconMenu>
        </div>
      }
      showMenuIconButton={false}
    />
)
}

export default MyAppBar
