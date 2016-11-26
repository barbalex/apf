/* eslint-disable camelcase */
import { observable, computed, toJS } from 'mobx'
import sortBy from 'lodash/sortBy'

class Table {
  @observable adb_eigenschaften = new Map()
  @observable adb_eigenschaftenLoading = false
  @computed get artname() {
    const aeEigenschaften = toJS(this.adb_eigenschaften)
    let artname = ``
    if (this.activeNode.row && this.activeNode.row.ApArtId && aeEigenschaften.size > 0) {
      artname = aeEigenschaften.get(this.activeNode.row.ApArtId).Artname
    }
    return artname
  }
  @observable adb_lr = new Map()
  @observable adb_lrLoading = false
  @observable adresse = new Map()
  @observable adresseLoading = false
  @observable ap = new Map()
  @observable apLoading = false
  @observable ap_bearbstand_werte = new Map()
  @observable ap_bearbstand_werteLoading = false
  @observable ap_erfbeurtkrit_werte = new Map()
  @observable ap_erfbeurtkrit_werteLoading = false
  @observable ap_erfkrit_werte = new Map()
  @observable ap_erfkrit_werteLoading = false
  @observable ap_umsetzung_werte = new Map()
  @observable ap_umsetzung_werteLoading = false
  @observable apber = new Map()
  @observable apberLoading = false
  @observable apberuebersicht = new Map()
  @observable apberuebersichtLoading = false
  @observable assozart = new Map()
  @observable assozartLoading = false
  @observable beob_bereitgestellt = new Map()
  @observable beob_bereitgestelltLoading = false
  @observable beob_evab = new Map()
  @observable beob_evabLoading = false
  @observable beob_infospezies = new Map()
  @observable beob_infospeziesLoading = false
  @observable beob_projekt = new Map()
  @observable beob_projektLoading = false
  @observable beob_quelle = new Map()
  @observable beob_quelleLoading = false
  @observable beobzuordnung = new Map()
  @observable beobzuordnungLoading = false
  @observable ber = new Map()
  @observable berLoading = false
  @observable erfkrit = new Map()
  @observable erfkritLoading = false
  @observable evab_tbl_personen = new Map()
  @observable evab_tbl_personenLoading = false
  @observable flora_status_werte = new Map()
  @observable flora_status_werteLoading = false
  @observable gemeinde = new Map()
  @observable gemeindeLoading = false
  @observable idealbiotop = new Map()
  @observable idealbiotopLoading = false
  @observable pop = new Map()
  @observable popLoading = false
  @observable pop_entwicklung_werte = new Map()
  @observable pop_entwicklung_werteLoading = false
  @observable pop_status_werte = new Map()
  @observable pop_status_werteLoading = false
  @observable popber = new Map()
  @observable popberLoading = false
  @observable popmassnber = new Map()
  @observable popmassnberLoading = false
  @observable projekt = new Map()
  @computed get projektNodes() {
    // grab projekte as array and sort them by name
    const projekte = this.projekt.values().sortBy(`ProjName`)
    // map through all projekt and create array of nodes
    return projekte.map(el => ({
      nodeId: `projekt/${el.ProjId}`,
      table: `projekt`,
      row: el,
      expanded: idActive, // || oneProject,  // temporarily disabled
      urlPath: [`Projekte`, el.ProjId],
      nodeIdPath: [`projekt/${el.ProjId}`],
      children: [
        // ap folder
        {
          nodeId: `projekt/${el.ProjId}/ap`,
          folder: `ap`,
          table: `projekt`,
          row: el,
          id: el.ProjId,
          expanded: false,
          children: apFolder.length === 0 ? _.times(el.AnzAp, _.constant(0)) : apFolder,
          urlPath: [`Projekte`, el.ProjId, `Arten`],
          nodeIdPath: [`projekt/${el.ProjId}`, `projekt/${el.ProjId}/ap`],
        },
        // apberuebersicht folder
        {
          nodeId: `projekt/${el.ProjId}/apberuebersicht`,
          folder: `apberuebersicht`,
          table: `projekt`,
          row: el,
          id: el.ProjId,
          expanded: false,
          children: (
            apberuebersichtFolder.length === 0 ?
            _.times(el.AnzApberuebersicht, _.constant(0)) :
            apberuebersichtFolder
          ),
          urlPath: [`Projekte`, el.ProjId, `AP-Berichte`],
          nodeIdPath: [`projekt/${el.ProjId}`, `projekt/${el.ProjId}/apberuebersicht`],
        },
      ],
    }))
  }
  @observable projektLoading = false
  @observable tpop = new Map()
  @observable tpopLoading = false
  @observable tpop_apberrelevant_werte = new Map()
  @observable tpop_apberrelevant_werteLoading = false
  @observable tpop_entwicklung_werte = new Map()
  @observable tpop_entwicklung_werteLoading = false
  @observable tpopber = new Map()
  @observable tpopberLoading = false
  @observable tpopkontr = new Map()
  @observable tpopkontrLoading = false
  @observable tpopkontr_idbiotuebereinst_werte = new Map()
  @observable tpopkontr_idbiotuebereinst_werteLoading = false
  @observable tpopkontr_typ_werte = new Map()
  @observable tpopkontr_typ_werteLoading = false
  @observable tpopkontrzaehl = new Map()
  @observable tpopkontrzaehlLoading = false
  @observable tpopkontrzaehl_einheit_werte = new Map()
  @observable tpopkontrzaehl_einheit_werteLoading = false
  @observable tpopkontrzaehl_methode_werte = new Map()
  @observable tpopkontrzaehl_methode_werteLoading = false
  @observable tpopmassn = new Map()
  @observable tpopmassnLoading = false
  @observable tpopmassn_erfbeurt_werte = new Map()
  @observable tpopmassn_erfbeurt_werteLoading = false
  @observable tpopmassn_typ_werte = new Map()
  @observable tpopmassn_typ_werteLoading = false
  @observable tpopmassnber = new Map()
  @observable tpopmassnberLoading = false
  @observable user = new Map()
  @observable userLoading = false
  @observable userprojekt = new Map()
  @observable userprojektLoading = false
  @observable ziel = new Map()
  @observable zielLoading = false
  @observable ziel_typ_werte = new Map()
  @observable ziel_typ_werteLoading = false
  @observable zielber = new Map()
  @observable zielberLoading = false
}

export default new Table()
