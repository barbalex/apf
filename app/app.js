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
import { BrowserRouter, Match, Redirect } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import DevTools from 'mobx-react-devtools'
import { Provider } from 'mobx-react'
import store from './store'
import AppBar from './components/AppBar'
import styles from './app.css'

// Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder
import 'sanitize.css/sanitize.css'

// import components
import Projekte from './components/Projekte'
import Exporte from './components/Exporte'
import Benutzer from './components/Benutzer'

import getUrlForNode from './modules/getUrlForNode'
const activeNode = store.data.activeNode
let to = null
if (activeNode) {
  to = getUrlForNode(activeNode)
  console.log('redirect to:', to)
} else {
  to = '/Projekte'
}

// TODO: redirect to login if not logged in
/* see: http://stackoverflow.com/questions/35850871/how-to-connect-state-to-props-with-mobx-js-observer-when-use-es6-class/36164488#36164488 */

const theme = Object.assign({}, darkBaseTheme, {
  appBar: {
    height: 51,
  },
})

// make store accessible in dev
window.app = {}
window.app.store = store

// load node
// TODO: make this depend on path
const table = 'projekt'
const id = null
const folder = null
const path = [{ table, id, folder }]
store.fetchAllNodes(path)

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <MuiThemeProvider
        muiTheme={getMuiTheme(theme)}
        className={styles.content}
      >
        <div className={styles.content} >
          <DevTools />
          <Match pattern="*" component={AppBar} />
          <Match exactly pattern="/" render={() => <Redirect to="/Projekte" />} />
          <Match pattern="/Projekte" render={() => <Redirect to={to} />} />
          <Match pattern="/Projekte" component={Projekte} />
          {/*
            <Match exactly pattern="/Projekte" component={Projekte} />
            <Match exactly pattern="/Projekte/:ProjId" component={Projekte} />
            <Match exactly pattern="/Projekte/:ProjId/Arten" component={Projekte} />
            <Match exactly pattern="/Projekte/:ProjId/Arten/:ApArtId" component={Projekte} />
            <Match exactly pattern="/Projekte/:ProjId/Arten/:ApArtId/AP-Berichte" component={Projekte} />
            <Match exactly pattern="/Projekte/:ProjId/Arten/:ApArtId/AP-Berichte/:JBerId" component={Projekte} />
            <Match exactly pattern="/Projekte/:ProjId/Arten/:ApArtId/AP-Berichte-Übersicht" component={Projekte} />
            <Match exactly pattern="/Projekte/:ProjId/Arten/:ApArtId/AP-Berichte-Übersicht/:JbuJahr" component={Projekte} />
            <Match exactly pattern="/Projekte/:ProjId/Arten/:ApArtId/AP-Erfolgskriterien" component={Projekte} />
            <Match exactly pattern="/Projekte/:ProjId/Arten/:ApArtId/AP-Erfolgskriterien/:ErfkritId" component={Projekte} />
            <Match exactly pattern="/Projekte/:ProjId/Arten/:ApArtId/AP-Ziele" component={Projekte} />
            <Match exactly pattern="/Projekte/:ProjId/Arten/:ApArtId/AP-Ziele/:ZielId" component={Projekte} />
            <Match exactly pattern="/Projekte/:ProjId/Arten/:ApArtId/AP-Ziele/:ZielId/Berichte" component={Projekte} />
            <Match exactly pattern="/Projekte/:ProjId/Arten/:ApArtId/AP-Ziele/:ZielId/Berichte/{ZielBerId}" component={Projekte} />
            <Match exactly pattern="/Projekte/:ProjId/Arten/:ApArtId/Berichte" component={Projekte} />
            <Match exactly pattern="/Projekte/:ProjId/Arten/:ApArtId/Berichte/:BerId" component={Projekte} />
            <Match exactly pattern="/Projekte/:ProjId/Arten/:ApArtId/Idealbiotop" component={Projekte} />
            <Match exactly pattern="/Projekte/:ProjId/Arten/:ApArtId/Assoziierte-Arten" component={Projekte} />
            <Match exactly pattern="/Projekte/:ProjId/Arten/:ApArtId/Assoziierte-Arten/:AaSisfNr" component={Projekte} />
            <Match exactly pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen" component={Projekte} />
            <Match exactly pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:ProjId" component={Projekte} />
            <Match exactly pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:ProjId/Kontroll-Berichte" component={Projekte} />
            <Match exactly pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:ProjId/Kontroll-Berichte/:PopBerId" component={Projekte} />
            <Match exactly pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:ProjId/Massnahmen-Berichte" component={Projekte} />
            <Match exactly pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:ProjId/Massnahmen-Berichte/:PopMassnBerId" component={Projekte} />
            <Match exactly pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:ProjId/Teilpopulationen" component={Projekte} />
            <Match exactly pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:ProjId/Teilpopulationen/:TPopId" component={Projekte} />
            <Match exactly pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:ProjId/Teilpopulationen/:TPopId/Kontroll-Berichte" component={Projekte} />
            <Match exactly pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:ProjId/Teilpopulationen/:TPopId/Kontroll-Berichte/:TPopBerId" component={Projekte} />
            <Match exactly pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:ProjId/Teilpopulationen/:TPopId/Massnahmen" component={Projekte} />
            <Match exactly pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:ProjId/Teilpopulationen/:TPopId/Massnahmen/:TPopMassnId" component={Projekte} />
            <Match exactly pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:ProjId/Teilpopulationen/:TPopId/Massnahmen-Berichte" component={Projekte} />
            <Match exactly pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:ProjId/Teilpopulationen/:TPopId/Massnahmen-Berichte/:TPopMassnBerId" component={Projekte} />
            <Match exactly pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:ProjId/Teilpopulationen/:TPopId/Beobachtungs-Zuordnungen" component={Projekte} />
            <Match exactly pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:ProjId/Teilpopulationen/:TPopId/Beobachtungs-Zuordnungen/:BeobId" component={Projekte} />
            <Match exactly pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:ProjId/Teilpopulationen/:TPopId/Kontrollen" component={Projekte} />
            <Match exactly pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:ProjId/Teilpopulationen/:TPopId/Kontrollen/:TPopKontrId" component={Projekte} />
            <Match exactly pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:ProjId/Teilpopulationen/:TPopId/Kontrollen/:TPopKontrId/Zählungen" component={Projekte} />
            <Match exactly pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:ProjId/Teilpopulationen/:TPopId/Kontrollen/:TPopKontrId/Zählungen/:TPopKontrZaehlId" component={Projekte} />
          */}
          <Match pattern="/Exporte" component={Exporte} />
          <Match pattern="/Benutzer" component={Benutzer} />
        </div>
      </MuiThemeProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('app')
)

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
import { install } from 'offline-plugin/runtime'
install()
