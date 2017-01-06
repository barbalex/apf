/**
 * Problem: Same data is refetched very often
 * Idea 1: Compare activeUrlElements with previous activeUrlElements
 * and only fetch what is new
 */

import { transaction } from 'mobx'
import forEach from 'lodash/forEach'
import clone from 'lodash/clone'

const fetchDataForActiveUrlElements = (store) => {
  const { activeUrlElements } = store
  const fetchingFromActiveElements = {
    exporte() {
      store.fetchTableByParentId(`apflora`, `ap`, activeUrlElements.projekt)
      store.fetchTable(`beob`, `adb_eigenschaften`)
    },
    projektFolder() {
      store.fetchTable(`apflora`, `projekt`)
    },
    projekt() {
      store.fetchTableByParentId(`apflora`, `ap`, activeUrlElements.projekt)
      store.fetchTableByParentId(`apflora`, `apberuebersicht`, activeUrlElements.projekt)
    },
    apberuebersichtFolder() {
      store.fetchTableByParentId(`apflora`, `apberuebersicht`, activeUrlElements.projekt)
    },
    apFolder() {
      store.fetchTable(`beob`, `adb_eigenschaften`)
    },
    ap() {
      store.fetchTableByParentId(`apflora`, `pop`, activeUrlElements.ap)
      store.fetchTableByParentId(`apflora`, `ziel`, activeUrlElements.ap)
      store.fetchTableByParentId(`apflora`, `erfkrit`, activeUrlElements.ap)
      store.fetchTableByParentId(`apflora`, `apber`, activeUrlElements.ap)
      store.fetchTableByParentId(`apflora`, `ber`, activeUrlElements.ap)
      store.fetchTableByParentId(`apflora`, `assozart`, activeUrlElements.ap)
      store.fetchTableByParentId(`apflora`, `idealbiotop`, activeUrlElements.ap)
      store.fetchTable(`apflora`, `adresse`)
      store.fetchBeobBereitgestellt(activeUrlElements.ap)
      store.fetchBeobzuordnung(activeUrlElements.ap)
    },
    assozartFolder() {},
    idealbiotopFolder() {},
    beobNichtZuzuordnenFolder() {
      store.fetchTable(`beob`, `beob_quelle`)
      store.fetchTpopForAp(activeUrlElements.ap)
    },
    beobzuordnungFolder() {
      store.fetchTable(`beob`, `beob_quelle`)
      store.fetchTpopForAp(activeUrlElements.ap)
    },
    berFolder() {
      store.fetchTableByParentId(`apflora`, `ber`, activeUrlElements.ap)
    },
    apberFolder() {
      store.fetchTableByParentId(`apflora`, `apber`, activeUrlElements.ap)
      store.fetchTable(`apflora`, `ap_erfkrit_werte`)
    },
    erfkritFolder() {
      store.fetchTableByParentId(`apflora`, `erfkrit`, activeUrlElements.ap)
      store.fetchTable(`apflora`, `ap_erfkrit_werte`)
    },
    zielFolder() {
      store.fetchTableByParentId(`apflora`, `ziel`, activeUrlElements.ap)
    },
    zieljahr() {
      store.fetchTableByParentId(`apflora`, `ziel`, activeUrlElements.ap)
      store.fetchTable(`apflora`, `ziel_typ_werte`)
    },
    ziel() {
      store.fetchTableByParentId(`apflora`, `zielber`, activeUrlElements.ziel)
    },
    zielberFolder() {},
    zielber() {},
    popFolder() {
      store.fetchTableByParentId(`apflora`, `pop`, activeUrlElements.ap)
    },
    pop() {
      store.fetchTableByParentId(`apflora`, `tpop`, activeUrlElements.pop)
      store.fetchTableByParentId(`apflora`, `popber`, activeUrlElements.pop)
      store.fetchTable(`apflora`, `pop_entwicklung_werte`)
      store.fetchTableByParentId(`apflora`, `popmassnber`, activeUrlElements.pop)
      store.fetchTable(`apflora`, `tpopmassn_erfbeurt_werte`)
      store.fetchTable(`apflora`, `tpop_apberrelevant_werte`)
    },
    popberFolder() {},
    popmassnberFolder() {},
    tpopFolder() {},
    tpop() {
      store.fetchTable(`apflora`, `gemeinde`)
      store.fetchTable(`apflora`, `tpop_entwicklung_werte`)
      store.fetchTableByParentId(`apflora`, `tpopber`, activeUrlElements.tpop)
      store.fetchTableByParentId(`apflora`, `tpopmassnber`, activeUrlElements.tpop)
      store.fetchTableByParentId(`apflora`, `tpopmassn`, activeUrlElements.tpop)
      store.fetchTable(`apflora`, `tpopmassn_typ_werte`)
      store.fetchTableByParentId(`apflora`, `tpopkontr`, activeUrlElements.tpop)
    },
    tpopmassnFolder() {},
    tpopmassnberFolder() {},
    tpopfeldkontrFolder() {
      store.fetchTable(`apflora`, `tpopkontr_idbiotuebereinst_werte`)
      store.fetchTable(`beob`, `adb_lr`)
    },
    tpopfeldkontr() {
      store.fetchTableByParentId(`apflora`, `tpopkontrzaehl`, activeUrlElements.tpopfeldkontr)
      store.fetchTable(`apflora`, `tpopkontrzaehl_einheit_werte`)
      store.fetchTable(`apflora`, `tpopkontrzaehl_methode_werte`)
    },
    tpopfreiwkontrFolder() {},
    tpopfreiwkontr() {
      store.fetchTableByParentId(`apflora`, `tpopkontrzaehl`, activeUrlElements.tpopfreiwkontr)
      store.fetchTable(`apflora`, `tpopkontrzaehl_einheit_werte`)
      store.fetchTable(`apflora`, `tpopkontrzaehl_methode_werte`)
    },
    tpopkontrzaehlFolder() {},
    tpopberFolder() {},
    tpopbeobFolder() {
      store.fetchTable(`beob`, `beob_quelle`)
      store.fetchTpopForAp(activeUrlElements.ap)
    },
    tpopbeob() {
      const id = activeUrlElements.tpopbeob
      const table = (
        isNaN(id) ?
        `beob_evab` :
        `beob_infospezies`
      )
      store.fetchDatasetById({
        schemaName: `beob`,
        tableName: table,
        id,
      })
    },
  }

  transaction(() => {
    forEach(fetchingFromActiveElements, (func, key) => {
      if (activeUrlElements[key]) {
        func()
      }
    })
  })
  store.previousActiveUrlElements = clone(activeUrlElements)
}

export default fetchDataForActiveUrlElements
