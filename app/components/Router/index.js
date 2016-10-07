/**
 * app.js
 *
 * This is the entry file for the application.
 * Contains setup, boilerplate and routing
 *
 */

/* eslint-disable no-unused-expressions */

// Import all the third party stuff
import React, { PropTypes } from 'react'
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

const Router = ({ store }) => {
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
          pattern="/Projekte/:ProjId/AP-Berichte"
          render={({ params }) => {
            newStore && store.fetchAllNodes([{ table: 'projekt', id: params.ProjId, folder: 'apberuebersicht' }])
            return <Projekte />
          }}
        />
        <Match
          exactly
          pattern="/Projekte/:ProjId/AP-Berichte/:JbuJahr"
          render={({ params }) => {
            newStore && store.fetchAllNodes([{ table: 'apberuebersicht', id: params.JbuJahr, folder: null }])
            return <Projekte />
          }}
        />
        <Match
          exactly
          pattern="/Projekte/:ProjId/Arten"
          render={({ params }) => {
            newStore && store.fetchAllNodes([{ table: 'projekt', id: params.ProjId, folder: 'ap' }])
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
            newStore && store.fetchAllNodes([{ table: 'ap', id: params.ApArtId, folder: 'apber' }])
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
          pattern="/Projekte/:ProjId/Arten/:ApArtId/AP-Erfolgskriterien"
          render={({ params }) => {
            newStore && store.fetchAllNodes([{ table: 'ap', id: params.ApArtId, folder: 'erfkrit' }])
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
            newStore && store.fetchAllNodes([{ table: 'ap', id: params.ApArtId, folder: 'ziel' }])
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
          pattern="/Projekte/:ProjId/Arten/:ApArtId/AP-Ziele/:ZielId/Berichte/:ZielBerId"
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
          pattern="/Projekte/:ProjId/Arten/:ApArtId/nicht-beurteilte-Beobachtungen"
          component={Projekte}
        />
        <Match
          exactly
          pattern="/Projekte/:ProjId/Arten/:ApArtId/nicht-beurteilte-Beobachtungen/:BeobId"
          component={Projekte}
        />
        <Match
          exactly
          pattern="/Projekte/:ProjId/Arten/:ApArtId/nicht-zuzuordnende-Beobachtungen"
          component={Projekte}
        />
        <Match
          exactly
          pattern="/Projekte/:ProjId/Arten/:ApArtId/nicht-zuzuordnende-Beobachtungen/:NO_NOTE"
          component={Projekte}
        />
        <Match
          exactly
          pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen"
          component={Projekte}
        />
        <Match
          exactly
          pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:PopId"
          component={Projekte}
        />
        <Match
          exactly
          pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:PopId/Kontroll-Berichte"
          component={Projekte}
        />
        <Match
          exactly
          pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:PopId/Kontroll-Berichte/:PopBerId"
          component={Projekte}
        />
        <Match
          exactly
          pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:PopId/Massnahmen-Berichte"
          component={Projekte}
        />
        <Match
          exactly
          pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:PopId/Massnahmen-Berichte/:PopMassnBerId"
          component={Projekte}
        />
        <Match
          exactly
          pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:PopId/Teil-Populationen"
          component={Projekte}
        />
        <Match
          exactly
          pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:PopId/Teil-Populationen/:TPopId"
          component={Projekte}
        />
        <Match
          exactly
          pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:PopId/Teil-Populationen/:TPopId/Massnahmen"
          component={Projekte}
        />
        <Match
          exactly
          pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:PopId/Teil-Populationen/:TPopId/Massnahmen/:TPopMassnId"
          component={Projekte}
        />
        <Match
          exactly
          pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:PopId/Teil-Populationen/:TPopId/Massnahmen-Berichte"
          component={Projekte}
        />
        <Match
          exactly
          pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:PopId/Teil-Populationen/:TPopId/Massnahmen-Berichte/:TPopMassnBerId"
          component={Projekte}
        />
        <Match
          exactly
          pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:PopId/Teil-Populationen/:TPopId/Kontroll-Berichte"
          component={Projekte}
        />
        <Match
          exactly
          pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:PopId/Teil-Populationen/:TPopId/Kontroll-Berichte/:TPopKontrId"
          component={Projekte}
        />
        <Match
          exactly
          pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:PopId/Teil-Populationen/:TPopId/zugeordnete-Beobachtungen"
          component={Projekte}
        />
        <Match
          exactly
          pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:PopId/Teil-Populationen/:TPopId/zugeordnete-Beobachtungen/:BeobId"
          component={Projekte}
        />
        <Match
          exactly
          pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:PopId/Teil-Populationen/:TPopId/Feld-Kontrollen"
          component={Projekte}
        />
        <Match
          exactly
          pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:PopId/Teil-Populationen/:TPopId/Feld-Kontrollen/:TPopKontrId"
          component={Projekte}
        />
        <Match
          exactly
          pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:PopId/Teil-Populationen/:TPopId/Feld-Kontrollen/:TPopKontrId/Zählungen"
          component={Projekte}
        />
        <Match
          exactly
          pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:PopId/Teil-Populationen/:TPopId/Feld-Kontrollen/:TPopKontrId/Zählungen/:TPopKontrZaehlId"
          component={Projekte}
        />
        <Match
          exactly
          pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:PopId/Teil-Populationen/:TPopId/Freiwilligen-Kontrollen"
          component={Projekte}
        />
        <Match
          exactly
          pattern="/Projekte/:ProjId/Arten/:ApArtId/Populationen/:PopId/Teil-Populationen/:TPopId/Freiwilligen-Kontrollen/:TPopKontrId"
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

Router.propTypes = {
  store: PropTypes.object,
}

export default inject('store')(observer(Router))
