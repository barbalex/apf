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

import { Lokka } from 'lokka'
import { Transport } from 'lokka-transport-http'

// Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder
import 'sanitize.css/sanitize.css'

// import components
import store from './store'
import styles from './app.css'  // eslint-disable-line no-unused-vars
import Router from './components/Router'
import graphqlBaseUrl from './modules/graphqlBaseUrl'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

const theme = Object.assign({}, darkBaseTheme, {
  appBar: {
    height: 51,
  },
})

// connect to graphql
const gql = new Lokka({
  transport: new Transport(graphqlBaseUrl),
})

// make store accessible in dev
window.app = {}
window.app.store = store
window.app.gql = gql

store.fetchFields()
// fetch this data immediately
// because it is used in the tree
store.fetchTable(`adb_eigenschaften`, `beob`)
store.fetchTable(`tpopkontrzaehl_einheit_werte`)
store.fetchTable(`tpopmassn_typ_werte`)
store.fetchTable(`ziel_typ_werte`)
store.fetchTable(`tpopmassn_erfbeurt_werte`)

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider
      muiTheme={getMuiTheme(theme)}
    >
      <div>
        <DevTools />
        <Router />
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
