/**
 * app.js
 *
 * This is the entry file for the application.
 * Contains only setup, theming and boilerplate code
 *
 */

import 'babel-polyfill'
import 'moment'

/* eslint-disable import/no-webpack-loader-syntax, import/extensions */
// Load the manifest.json file and the .htaccess file
import '!file?name=[name].[ext]!./manifest.json'
import 'file?name=[name].[ext]!./.htaccess'
/* eslint-enable import/no-webpack-loader-syntax, import/extensions */

// Import all the third party stuff
import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import DevTools from 'mobx-react-devtools'
import { Provider } from 'mobx-react'

// Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder
import 'sanitize.css/sanitize.css'

// import components
import store from './store'
import styles from './app.css'  // eslint-disable-line no-unused-vars
// import Router from './components/Router'
import AppBar from './components/AppBar'
import Projekte from './components/Projekte'
// import ProjekteRedirector from './components/ProjekteRedirector'
import Exporte from './components/Exporte'
import Benutzer from './components/Benutzer'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

const theme = Object.assign({}, darkBaseTheme, {
  appBar: {
    height: 51,
  },
})

// make store accessible in dev
window.app = {}
window.app.store = store

console.log(`app.js, store:`, store)

store.setUrlStateFromLocation()
store.fetchFields()
// fetch this data immediately
// because it is used in the tree
store.fetchTable(`beob`, `adb_eigenschaften`)
store.fetchTable(`apflora`, `tpopkontrzaehl_einheit_werte`)
store.fetchTable(`apflora`, `tpopmassn_typ_werte`)
store.fetchTable(`apflora`, `ziel_typ_werte`)
store.fetchTable(`apflora`, `tpopmassn_erfbeurt_werte`)

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider
      muiTheme={getMuiTheme(theme)}
    >
      <div>
        <DevTools />
        <AppBar />
        {
          store.activeUrlElements.projektFolder
          && <Projekte />
        }
        {
          store.activeUrlElements.exporte
          && <Exporte />
        }
        {
          store.activeUrlElements.benutzer
          && <Benutzer />
        }
      </div>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById(`app`)
)

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
import { install } from 'offline-plugin/runtime'  // eslint-disable-line import/first
install()
