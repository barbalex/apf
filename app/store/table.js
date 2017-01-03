/* eslint-disable camelcase, no-unused-vars */
import { observable, map } from 'mobx'
import localforage from 'localforage'

import tableNames from '../modules/tableStoreNames'

const initiateObservables = (tableClass) => {
  tableNames.forEach((tableName) => {
    tableClass[tableName] = map()
  })
}

class Table {
  constructor() {
    initiateObservables(this)
  }
  @observable adb_eigenschaften
  @observable adb_lr
  @observable adresse
  @observable ap
  @observable ap_bearbstand_werte
  @observable ap_erfbeurtkrit_werte
  @observable ap_erfkrit_werte
  @observable ap_umsetzung_werte
  @observable apber
  @observable apberuebersicht
  @observable assozart
  @observable beob_bereitgestellt
  @observable beob_evab
  @observable beob_infospezies
  @observable beob_projekt
  @observable beob_quelle
  @observable beobzuordnung
  @observable ber
  @observable erfkrit
  @observable evab_tbl_personen
  @observable flora_status_werte
  @observable gemeinde
  @observable idealbiotop
  @observable pop
  @observable pop_entwicklung_werte
  @observable pop_status_werte
  @observable popber
  @observable popmassnber
  @observable projekt
  @observable tpop
  @observable tpop_apberrelevant_werte
  @observable tpop_entwicklung_werte
  @observable tpopber
  @observable tpopkontr
  @observable tpopkontr_idbiotuebereinst_werte
  @observable tpopkontr_typ_werte
  @observable tpopkontrzaehl
  @observable tpopkontrzaehl_einheit_werte
  @observable tpopkontrzaehl_methode_werte
  @observable tpopmassn
  @observable tpopmassn_erfbeurt_werte
  @observable tpopmassn_typ_werte
  @observable tpopmassnber
  @observable user
  @observable userprojekt
  @observable ziel
  @observable ziel_typ_werte
  @observable zielber
}

export default new Table()
