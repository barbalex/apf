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
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import mobx from 'mobx'
import injectTapEventPlugin from 'react-tap-event-plugin'
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

// Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder
import 'sanitize.css/sanitize.css'

// create store
import store from './store'
const props = mobx.toJS(store)
console.log('store:', store)
console.log('props:', props)

// TODO: use ampersand-app for store
const createElement = function (Component, props) {
  return <Component store={props} />
}

// import components
import App from './containers/App'
import Arten from './containers/Arten'
import Exporte from './containers/Exporte'
import Benutzer from './containers/Benutzer'

ReactDOM.render(
  <Router history={browserHistory}>
    <Route
      path="/"
      name="home"
      component={createElement(App, props)}
      store={props}
    >
      <IndexRoute
        component={Arten}
        store={props}
      />
      <Route
        path="Arten"
        component={Arten}
        store={props}
      />
      <Route
        path="exporte"
        component={Exporte}
        store={props}
      />
      <Route
        path="benutzer"
        component={Benutzer}
        store={props}
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
