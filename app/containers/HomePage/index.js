/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a neccessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import AppBar from 'material-ui/AppBar'
import { Tabs, Tab } from 'material-ui/Tabs'

const styles = {
  appBar: {
    flexWrap: 'wrap',
  },
  tabs: {
    width: '100%',
  },
  tab: {
    paddingRight: 20,
    paddingLeft: 20,
  },
}

export default class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <AppBar
          title="AP Flora"
          iconElementRight={
            <Tabs
              styles={styles.tabs}
            >
              <Tab
                label="Arten"
                value="arten"
                style={styles.tab}
              />
              <Tab
                label="Exporte"
                value="exporte"
                style={styles.tab}
              />
              <Tab
                label="User"
                value="user"
                style={styles.tab}
              />
            </Tabs>
          }
          style={styles.appBar}
          showMenuIconButton={false}
        />
      </MuiThemeProvider>
    )
  }
}
