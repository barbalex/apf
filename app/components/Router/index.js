/**
 * app.js
 *
 * This is the entry file for the application.
 * Contains setup, boilerplate and routing
 *
 */

/* eslint-disable no-unused-expressions */

// Import all the third party stuff
import React, { Component, PropTypes } from 'react'
import { BrowserRouter, Match, Redirect } from 'react-router'
import { observer, inject } from 'mobx-react'

// import components
import AppBar from '../../components/AppBar'
import Projekte from '../../components/Projekte'
import ProjekteRedirector from '../../components/ProjekteRedirector'
import Exporte from '../../components/Exporte'
import Benutzer from '../../components/Benutzer'
import styles from './styles.css'

import storeIsNew from '../../modules/storeIsNew'

// TODO: redirect to login if not logged in
// see: http://stackoverflow.com/questions/35850871/how-to-connect-state-to-props-with-mobx-js-observer-when-use-es6-class/36164488#36164488
// see: https://react-router.now.sh/auth-workflow

const Router = class Router extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { store } = this.props
    const newStore = storeIsNew(store)
    return (
      <BrowserRouter>
        <div className={styles.content}>
          <Match
            exactly
            pattern="/"
            render={() =>
              <Redirect to="/Projekte" />
            }
          />
          <Match pattern="*" component={AppBar} />
          {
            !newStore
            && <Match pattern="/Projekte" component={ProjekteRedirector} />
          }
          <Match
            exactly
            pattern="/Projekte"
            render={() => {
              newStore && store.fetchAllNodes([{ table: 'projekt', id: null, folder: null }])
              return <Projekte />
            }}
          />
          <Match
            exactly
            pattern="/Projekte/:ProjId"
            render={({ params }) => {
              newStore && store.fetchAllNodes([{ table: 'projekt', id: params.ProjId, folder: null }])
              return <Projekte />
            }}
          />
          <Match
            exactly
            pattern="/Projekte/:ProjId/Arten"
            render={({ params }) => {
              newStore && store.fetchAllNodes([{ table: 'projekt', id: params.ProjId, folder: null }])
              return <Projekte />
            }}
          />
          <Match
            exactly
            pattern="/Projekte/:ProjId/Arten/:ApArtId"
            render={({ params }) => {
              newStore && store.fetchAllNodes([{ table: 'ap', id: params.ApArtId, folder: null }])
              return <Projekte />
            }}
          />
          <Match
            exactly
            pattern="/Projekte/:ProjId/Arten/:ApArtId/AP-Berichte"
            render={({ params }) => {
              newStore && store.fetchAllNodes([{ table: 'ap', id: params.ApArtId, folder: 'AP-Berichte' }])
              return <Projekte />
            }}
          />
          <Match
            exactly
            pattern="/Projekte/:ProjId/Arten/:ApArtId/AP-Berichte/:JBerId"
            render={({ params }) => {
              newStore && store.fetchAllNodes([{ table: 'apber', id: params.JBerId, folder: null }])
              return <Projekte />
            }}
          />
          <Match
            exactly
            pattern="/Projekte/:ProjId/Arten/:ApArtId/AP-Berichte-Übersicht"
            render={({ params }) => {
              newStore && store.fetchAllNodes([{ table: 'ap', id: params.ApArtId, folder: 'AP-Berichte-Übersicht' }])
              return <Projekte />
            }}
          />
          <Match
            exactly
            pattern="/Projekte/:ProjId/Arten/:ApArtId/AP-Berichte-Übersicht/:JbuJahr"
            render={({ params }) => {
              newStore && store.fetchAllNodes([{ table: 'apberuebersicht', id: params.ApArtId, folder: null }])
              return <Projekte />
            }}
          />
          <Match
            exactly
            pattern="/Projekte/:ProjId/Arten/:ApArtId/AP-Erfolgskriterien"
            render={({ params }) => {
              newStore && store.fetchAllNodes([{ table: 'ap', id: params.ApArtId, folder: 'AP-Erfolgskriterien' }])
              return <Projekte />
            }}
          />
          <Match
            exactly
            pattern="/Projekte/:ProjId/Arten/:ApArtId/AP-Erfolgskriterien/:ErfkritId"
            render={({ params }) => {
              newStore && store.fetchAllNodes([{ table: 'erfkrit', id: params.ErfkritId, folder: null }])
              return <Projekte />
            }}
          />
          <Match
            exactly
            pattern="/Projekte/:ProjId/Arten/:ApArtId/AP-Ziele"
            render={({ params }) => {
              newStore && store.fetchAllNodes([{ table: 'ap', id: params.ApArtId, folder: 'AP-Ziele' }])
              return <Projekte />
            }}
          />
          <Match
            exactly
            pattern="/Projekte/:ProjId/Arten/:ApArtId/AP-Ziele/:ZielId"
            render={({ params }) => {
              newStore && store.fetchAllNodes([{ table: 'ziel', id: params.ZielId, folder: null }])
              return <Projekte />
            }}
          />
          <Match
            exactly
            pattern="/Projekte/:ProjId/Arten/:ApArtId/AP-Ziele/:ZielId/Berichte"
            component={Projekte}
          />
          <Match
            exactly
            pattern="/Projekte/:ProjId/Arten/:ApArtId/AP-Ziele/:ZielId/Berichte/{ZielBerId}"
            component={Projekte}
          />
          <Match
            exactly
            pattern="/Projekte/:ProjId/Arten/:ApArtId/Berichte"
            component={Projekte}
          />
          <Match
            exactly
            pattern="/Projekte/:ProjId/Arten/:ApArtId/Berichte/:BerId"
            component={Projekte}
          />
          <Match
            exactly
            pattern="/Projekte/:ProjId/Arten/:ApArtId/Idealbiotop"
            component={Projekte}
          />
          <Match
            exactly
            pattern="/Projekte/:ProjId/Arten/:ApArtId/Assoziierte-Arten"
            component={Projekte}
          />
          <Match
            exactly
            pattern="/Projekte/:ProjId/Arten/:ApArtId/Assoziierte-Arten/:AaSisfNr"
            component={Projekte}
          />
          <Match
            exactly
            pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen"
            component={Projekte}
          />
          <Match
            exactly
            pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:ProjId"
            component={Projekte}
          />
          <Match
            exactly
            pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:ProjId/Kontroll-Berichte"
            component={Projekte}
          />
          <Match
            exactly
            pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:ProjId/Kontroll-Berichte/:PopBerId"
            component={Projekte}
          />
          <Match
            exactly
            pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:ProjId/Massnahmen-Berichte"
            component={Projekte}
          />
          <Match
            exactly
            pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:ProjId/Massnahmen-Berichte/:PopMassnBerId"
            component={Projekte}
          />
          <Match
            exactly
            pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:ProjId/Teilpopulationen"
            component={Projekte}
          />
          <Match
            exactly
            pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:ProjId/Teilpopulationen/:TPopId"
            component={Projekte}
          />
          <Match
            exactly
            pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:ProjId/Teilpopulationen/:TPopId/Kontroll-Berichte"
            component={Projekte}
          />
          <Match
            exactly
            pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:ProjId/Teilpopulationen/:TPopId/Kontroll-Berichte/:TPopBerId"
            component={Projekte}
          />
          <Match
            exactly
            pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:ProjId/Teilpopulationen/:TPopId/Massnahmen"
            component={Projekte}
          />
          <Match
            exactly
            pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:ProjId/Teilpopulationen/:TPopId/Massnahmen/:TPopMassnId"
            component={Projekte}
          />
          <Match
            exactly
            pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:ProjId/Teilpopulationen/:TPopId/Massnahmen-Berichte"
            component={Projekte}
          />
          <Match
            exactly
            pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:ProjId/Teilpopulationen/:TPopId/Massnahmen-Berichte/:TPopMassnBerId"
            component={Projekte}
          />
          <Match
            exactly
            pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:ProjId/Teilpopulationen/:TPopId/Beobachtungs-Zuordnungen"
            component={Projekte}
          />
          <Match
            exactly
            pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:ProjId/Teilpopulationen/:TPopId/Beobachtungs-Zuordnungen/:BeobId"
            component={Projekte}
          />
          <Match
            exactly
            pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:ProjId/Teilpopulationen/:TPopId/Kontrollen"
            component={Projekte}
          />
          <Match
            exactly
            pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:ProjId/Teilpopulationen/:TPopId/Kontrollen/:TPopKontrId"
            component={Projekte}
          />
          <Match
            exactly
            pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:ProjId/Teilpopulationen/:TPopId/Kontrollen/:TPopKontrId/Zählungen"
            component={Projekte}
          />
          <Match
            exactly
            pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:ProjId/Teilpopulationen/:TPopId/Kontrollen/:TPopKontrId/Zählungen/:TPopKontrZaehlId"
            component={Projekte}
          />
          <Match
            pattern="/Exporte"
            component={Exporte}
          />
          <Match
            pattern="/Benutzer"
            component={Benutzer}
          />
        </div>
      </BrowserRouter>
    )
  }
}

Router.propTypes = {
  store: PropTypes.object,
}

export default inject('store')(observer(Router))
