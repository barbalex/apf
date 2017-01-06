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
import Helmet from 'react-helmet'

// Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder
import 'sanitize.css/sanitize.css'

import styled from 'styled-components'

import 'file-loader?name=beziehungen.png&outputPath=etc/!./etc/beziehungen.png'

import app from 'ampersand-app'
import Dexie from 'dexie'
import tables from './modules/tables'

// import components
import store from './store'
import styles from './app.css'  // eslint-disable-line no-unused-vars
import AppBar from './components/AppBar'
import Projekte from './components/Projekte'

import apiBaseUrl from './modules/apiBaseUrl'
import updateFromSocket from './modules/updateFromSocket'

// initiate idb
const tablesObject = {}
tables.forEach((t) => {
  if (t.table && t.idField) {
    tablesObject[t.table] = `${t.idField}`
  }
})
// add fields
tablesObject.fields = `[table_schema+table_name+column_name]`
const db = new Dexie(`apflora`)
db  // eslint-disable-line no-trailing-spaces
  .version(1)
  .stores(tablesObject)
app.extend({
  init() {
    this.db = db
  },
})
app.init()

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
window.app.db = db

// load immediately because is used to validate active dataset
store.fetchFields()

const socket = window.io(apiBaseUrl)
socket.on(`tabelle_update`, payload => updateFromSocket(store, payload))

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
`

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider
      muiTheme={getMuiTheme(theme)}
    >
      <AppContainer>
        <Helmet
          title="AP Flora"
          meta={[
            { name: `description`, content: `Aktionspläne für Flora-Projekte` },
          ]}
        />
        { false && <DevTools />}
        <AppBar />
        <Projekte />
      </AppContainer>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById(`app`)
)

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
import { install } from 'offline-plugin/runtime'  // eslint-disable-line import/first
install()
