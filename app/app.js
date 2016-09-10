/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */
import 'babel-polyfill'

/* eslint-disable import/no-unresolved */
// Load the manifest.json file and the .htaccess file
import '!file?name=[name].[ext]!./manifest.json'
import 'file?name=[name].[ext]!./.htaccess'
/* eslint-enable import/no-unresolved */

import 'script!jquery'

// Import all the third party stuff
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

// Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder
import 'sanitize.css/sanitize.css'

// import components
import App from './containers/App'
import Projekte from './containers/Projekte'
import Exporte from './containers/Exporte'
import Benutzer from './containers/Benutzer'

// TODO: redirect to login if not logged in
/* see: http://stackoverflow.com/questions/35850871/how-to-connect-state-to-props-with-mobx-js-observer-when-use-es6-class/36164488#36164488 */

ReactDOM.render(
  <Router history={browserHistory}>
    <Route
      path="/"
      component={App}
    >
      <IndexRedirect
        to="/projekte"
      />
      <Route
        path="projekte"
        component={Projekte}
      />
      <Route
        path="exporte"
        component={Exporte}
      />
      <Route
        path="benutzer"
        component={Benutzer}
      />
    </Route>
  </Router>,
  document.getElementById('app')
)

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
import { install } from 'offline-plugin/runtime'
install()
