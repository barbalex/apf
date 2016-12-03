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
import { Provider } from 'mobx-react'

// Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder
import 'sanitize.css/sanitize.css'

// import components
import store from './store'
import styles from './app.css'  // eslint-disable-line no-unused-vars
import Router from './components/Router'

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

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider
      muiTheme={getMuiTheme(theme)}
    >
      <Router />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById(`app`)
)

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
import { install } from 'offline-plugin/runtime'  // eslint-disable-line import/first
install()
