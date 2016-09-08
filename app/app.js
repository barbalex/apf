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

// Import all the third party stuff
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()
import store from './store'

// Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder
import 'sanitize.css/sanitize.css'

// Set up the router, wrapping all Routes in the App component
import App from 'containers/App'
import createRoutes from './routes'
const rootRoute = {
  component: App,
  childRoutes: createRoutes(store),
}

ReactDOM.render(
  <Router
    history={browserHistory}
    routes={rootRoute}
  />,
  document.getElementById('app')
)

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
import { install } from 'offline-plugin/runtime'
install()
