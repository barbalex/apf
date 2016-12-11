/**
 * app.js
 *
 * This is the entry file for the application.
 * Contains only setup, theming and boilerplate code
 *
 */

import 'babel-polyfill'

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
import { Provider } from 'mobx-react'

import DevTools from 'mobx-react-devtools'

// Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder
import 'sanitize.css/sanitize.css'

// import components
import store from './store'
import styles from './app.css'  // eslint-disable-line no-unused-vars
import AppBar from './components/AppBar'
import Projekte from './components/Projekte'

import apiBaseUrl from './modules/apiBaseUrl'
import updateFromSocket from './modules/updateFromSocket'

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

// load immediately because is used to validate active dataset
store.fetchFields()

const socket = window.io(apiBaseUrl)
socket.on(`tabelle_update`, payload => updateFromSocket(store, payload))

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider
      muiTheme={getMuiTheme(theme)}
    >
      <div>
        <DevTools />
        <AppBar />
        <Projekte />
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
