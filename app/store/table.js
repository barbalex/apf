/* eslint-disable camelcase */
import { observable, map } from 'mobx'

class Table {
  constructor() {
    this.adb_eigenschaften = map()
    this.adb_lr = map()
    this.adresse = map()
    this.ap = map()
    this.ap_bearbstand_werte = map()
    this.ap_erfbeurtkrit_werte = map()
    this.ap_erfkrit_werte = map()
    this.ap_umsetzung_werte = map()
    this.apber = map()
    this.apberuebersicht = map()
    this.assozart = map()
    this.beob_bereitgestellt = map()
    this.beob_evab = map()
    this.beob_infospezies = map()
    this.beob_projekt = map()
    this.beob_quelle = map()
    this.beobzuordnung = map()
    this.ber = map()
    this.erfkrit = map()
    this.evab_tbl_personen = map()
    this.flora_status_werte = map()
    this.gemeinde = map()
    this.idealbiotop = map()
    this.pop = map()
    this.pop_entwicklung_werte = map()
    this.pop_status_werte = map()
    this.popber = map()
    this.popmassnber = map()
    this.projekt = map()
    this.tpop = map()
    this.tpop_apberrelevant_werte = map()
    this.tpop_entwicklung_werte = map()
    this.tpopber = map()
    this.tpopkontr = map()
    this.tpopkontr_idbiotuebereinst_werte = map()
    this.tpopkontr_typ_werte = map()
    this.tpopkontrzaehl = map()
    this.tpopkontrzaehl_einheit_werte = map()
    this.tpopkontrzaehl_methode_werte = map()
    this.tpopmassn = map()
    this.tpopmassn_erfbeurt_werte = map()
    this.tpopmassn_typ_werte = map()
    this.tpopmassnber = map()
    this.user = map()
    this.userprojekt = map()
    this.ziel = map()
    this.ziel_typ_werte = map()
    this.zielber = map()
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

// TODO:
// check localState
// and export deserialized state if possible

export default new Table()
