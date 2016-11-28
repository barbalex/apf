/* eslint-disable camelcase */
import { observable, asMap, computed, toJS } from 'mobx'

// TODO: apply asMap

class Table {
  @observable adb_eigenschaften = asMap(new Map())
  @observable adb_eigenschaftenLoading = false
  @computed get artname() {
    const aeEigenschaften = toJS(this.adb_eigenschaften)
    let artname = ``
    if (this.activeNode.row && this.activeNode.row.ApArtId && aeEigenschaften.size > 0) {
      artname = aeEigenschaften.get(this.activeNode.row.ApArtId).Artname
    }
    return artname
  }
  @observable adb_lr = asMap(new Map())
  @observable adb_lrLoading = false
  @observable adresse = asMap(new Map())
  @observable adresseLoading = false
  @observable ap = asMap(new Map())
  @observable apLoading = false
  @observable ap_bearbstand_werte = asMap(new Map())
  @observable ap_bearbstand_werteLoading = false
  @observable ap_erfbeurtkrit_werte = asMap(new Map())
  @observable ap_erfbeurtkrit_werteLoading = false
  @observable ap_erfkrit_werte = asMap(new Map())
  @observable ap_erfkrit_werteLoading = false
  @observable ap_umsetzung_werte = asMap(new Map())
  @observable ap_umsetzung_werteLoading = false
  @observable apber = asMap(new Map())
  @observable apberLoading = false
  @observable apberuebersicht = asMap(new Map())
  @observable apberuebersichtLoading = false
  @observable assozart = asMap(new Map())
  @observable assozartLoading = false
  @observable beob_bereitgestellt = asMap(new Map())
  @observable beob_bereitgestelltLoading = false
  @observable beob_evab = asMap(new Map())
  @observable beob_evabLoading = false
  @observable beob_infospezies = asMap(new Map())
  @observable beob_infospeziesLoading = false
  @observable beob_projekt = asMap(new Map())
  @observable beob_projektLoading = false
  @observable beob_quelle = asMap(new Map())
  @observable beob_quelleLoading = false
  @observable beobzuordnung = asMap(new Map())
  @observable beobzuordnungLoading = false
  @observable ber = asMap(new Map())
  @observable berLoading = false
  @observable erfkrit = asMap(new Map())
  @observable erfkritLoading = false
  @observable evab_tbl_personen = asMap(new Map())
  @observable evab_tbl_personenLoading = false
  @observable flora_status_werte = asMap(new Map())
  @observable flora_status_werteLoading = false
  @observable gemeinde = asMap(new Map())
  @observable gemeindeLoading = false
  @observable idealbiotop = asMap(new Map())
  @observable idealbiotopLoading = false
  @observable pop = asMap(new Map())
  @observable popLoading = false
  @observable pop_entwicklung_werte = asMap(new Map())
  @observable pop_entwicklung_werteLoading = false
  @observable pop_status_werte = asMap(new Map())
  @observable pop_status_werteLoading = false
  @observable popber = asMap(new Map())
  @observable popberLoading = false
  @observable popmassnber = asMap(new Map())
  @observable popmassnberLoading = false
  @observable projekt = asMap(new Map())
  @observable projektLoading = false
  @observable tpop = asMap(new Map())
  @observable tpopLoading = false
  @observable tpop_apberrelevant_werte = asMap(new Map())
  @observable tpop_apberrelevant_werteLoading = false
  @observable tpop_entwicklung_werte = asMap(new Map())
  @observable tpop_entwicklung_werteLoading = false
  @observable tpopber = asMap(new Map())
  @observable tpopberLoading = false
  @observable tpopkontr = asMap(new Map())
  @observable tpopkontrLoading = false
  @observable tpopkontr_idbiotuebereinst_werte = asMap(new Map())
  @observable tpopkontr_idbiotuebereinst_werteLoading = false
  @observable tpopkontr_typ_werte = asMap(new Map())
  @observable tpopkontr_typ_werteLoading = false
  @observable tpopkontrzaehl = asMap(new Map())
  @observable tpopkontrzaehlLoading = false
  @observable tpopkontrzaehl_einheit_werte = asMap(new Map())
  @observable tpopkontrzaehl_einheit_werteLoading = false
  @observable tpopkontrzaehl_methode_werte = asMap(new Map())
  @observable tpopkontrzaehl_methode_werteLoading = false
  @observable tpopmassn = asMap(new Map())
  @observable tpopmassnLoading = false
  @observable tpopmassn_erfbeurt_werte = asMap(new Map())
  @observable tpopmassn_erfbeurt_werteLoading = false
  @observable tpopmassn_typ_werte = asMap(new Map())
  @observable tpopmassn_typ_werteLoading = false
  @observable tpopmassnber = asMap(new Map())
  @observable tpopmassnberLoading = false
  @observable user = asMap(new Map())
  @observable userLoading = false
  @observable userprojekt = asMap(new Map())
  @observable userprojektLoading = false
  @observable ziel = asMap(new Map())
  @observable zielLoading = false
  @observable ziel_typ_werte = asMap(new Map())
  @observable ziel_typ_werteLoading = false
  @observable zielber = asMap(new Map())
  @observable zielberLoading = false
  @observable activeDataset = null
}

export default new Table()
