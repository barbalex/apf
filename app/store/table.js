/* eslint-disable camelcase, no-unused-vars */
import { observable, map } from 'mobx'
import localforage from 'localforage'

import tableNames from '../modules/tableStoreNames'

const initiateObservables = (tableClass) => {
  tableNames.forEach((tableName) => {
    tableClass[tableName] = observable.map()
  })
}

class Table {
  constructor() {
    initiateObservables(this)
  }
  @observable adb_eigenschaften
  @observable adb_eigenschaftenLoading
  @observable adb_lr
  @observable adb_lrLoading
  @observable adresse
  @observable adresseLoading
  @observable ap
  @observable apLoading
  @observable ap_bearbstand_werte
  @observable ap_bearbstand_werteLoading
  @observable ap_erfbeurtkrit_werte
  @observable ap_erfbeurtkrit_werteLoading
  @observable ap_erfkrit_werte
  @observable ap_erfkrit_werteLoading
  @observable ap_umsetzung_werte
  @observable ap_umsetzung_werteLoading
  @observable apber
  @observable apberLoading
  @observable apberuebersicht
  @observable apberuebersichtLoading
  @observable assozart
  @observable assozartLoading
  @observable beob_bereitgestellt
  @observable beob_bereitgestelltLoading
  @observable beob_evab
  @observable beob_evabLoading
  @observable beob_infospezies
  @observable beob_infospeziesLoading
  @observable beob_projekt
  @observable beob_projektLoading
  @observable beob_quelle
  @observable beob_quelleLoading
  @observable beobzuordnung
  @observable beobzuordnungLoading
  @observable ber
  @observable berLoading
  @observable erfkrit
  @observable erfkritLoading
  @observable evab_tbl_personen
  @observable evab_tbl_personenLoading
  @observable flora_status_werte
  @observable flora_status_werteLoading
  @observable gemeinde
  @observable gemeindeLoading
  @observable idealbiotop
  @observable idealbiotopLoading
  @observable pop
  @observable popLoading
  @observable pop_entwicklung_werte
  @observable pop_entwicklung_werteLoading
  @observable pop_status_werte
  @observable pop_status_werteLoading
  @observable popber
  @observable popberLoading
  @observable popmassnber
  @observable popmassnberLoading
  @observable projekt
  @observable projektLoading
  @observable tpop
  @observable tpopLoading
  @observable tpop_apberrelevant_werte
  @observable tpop_apberrelevant_werteLoading
  @observable tpop_entwicklung_werte
  @observable tpop_entwicklung_werteLoading
  @observable tpopber
  @observable tpopberLoading
  @observable tpopkontr
  @observable tpopkontrLoading
  @observable tpopkontr_idbiotuebereinst_werte
  @observable tpopkontr_idbiotuebereinst_werteLoading
  @observable tpopkontr_typ_werte
  @observable tpopkontr_typ_werteLoading
  @observable tpopkontrzaehl
  @observable tpopkontrzaehlLoading
  @observable tpopkontrzaehl_einheit_werte
  @observable tpopkontrzaehl_einheit_werteLoading
  @observable tpopkontrzaehl_methode_werte
  @observable tpopkontrzaehl_methode_werteLoading
  @observable tpopmassn
  @observable tpopmassnLoading
  @observable tpopmassn_erfbeurt_werte
  @observable tpopmassn_erfbeurt_werteLoading
  @observable tpopmassn_typ_werte
  @observable tpopmassn_typ_werteLoading
  @observable tpopmassnber
  @observable tpopmassnberLoading
  @observable user
  @observable userLoading
  @observable userprojekt
  @observable userprojektLoading
  @observable ziel
  @observable zielLoading
  @observable ziel_typ_werte
  @observable ziel_typ_werteLoading
  @observable zielber
  @observable zielberLoading
}

export default new Table()
