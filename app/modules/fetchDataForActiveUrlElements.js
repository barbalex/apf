/**
 * Problem: Same data is refetched very often
 * Idea 1: Compare activeUrlElements with previous activeUrlElements
 * and only fetch what is new
 */

import forEach from 'lodash/forEach'
import clone from 'lodash/clone'

export default (store) => {
  const { activeUrlElements, previousActiveUrlElements } = store
  const inPreviousActiveUrlElements = (attribute) => {
    // console.log(`previousActiveUrlElements:`, previousActiveUrlElements)
    // console.log(`activeUrlElements:`, activeUrlElements)
    // console.log(`attribute:`, attribute)
    return (
      previousActiveUrlElements &&
      previousActiveUrlElements[attribute] &&
      activeUrlElements &&
      activeUrlElements[attribute] &&
      previousActiveUrlElements[attribute] === activeUrlElements[attribute]
    )
  }
  const fetchingFromActiveElements = {
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
      store.fetchTableByParentId(`apflora`, `ap`, activeUrlElements.projekt)
      store.fetchTable(`beob`, `adb_eigenschaften`)
    },
    ap() {
      if (!inPreviousActiveUrlElements(`ap`)) {
        store.fetchTableByParentId(`apflora`, `assozart`, activeUrlElements.ap)
        store.fetchTableByParentId(`apflora`, `idealbiotop`, activeUrlElements.ap)
        store.fetchTableByParentId(`apflora`, `apber`, activeUrlElements.ap)
        store.fetchTableByParentId(`apflora`, `erfkrit`, activeUrlElements.ap)
        store.fetchTableByParentId(`apflora`, `ber`, activeUrlElements.ap)
        store.fetchTableByParentId(`apflora`, `ziel`, activeUrlElements.ap)
        store.fetchTableByParentId(`apflora`, `pop`, activeUrlElements.ap)
      }
    },
    assozartFolder() {
      if (!inPreviousActiveUrlElements(`ap`)) {
        store.fetchTableByParentId(`apflora`, `assozart`, activeUrlElements.ap)
      }
    },
    idealbiotopFolder() {
      if (!inPreviousActiveUrlElements(`ap`)) {
        store.fetchTableByParentId(`apflora`, `idealbiotop`, activeUrlElements.ap)
      }
    },
    beobNichtZuzuordnenFolder() {
      // TODO
      store.fetchTableByParentId(`apflora`, `ap`, activeUrlElements.projekt)
    },
    beobzuordnungFolder() {
      // TODO
      store.fetchTableByParentId(`apflora`, `ap`, activeUrlElements.projekt)
    },
    berFolder() {
      if (!inPreviousActiveUrlElements(`ap`)) {
        store.fetchTableByParentId(`apflora`, `ber`, activeUrlElements.ap)
      }
    },
    apberFolder() {
      if (!inPreviousActiveUrlElements(`ap`)) {
        store.fetchTableByParentId(`apflora`, `apber`, activeUrlElements.ap)
      }
    },
    erfkritFolder() {
      if (!inPreviousActiveUrlElements(`ap`)) {
        store.fetchTableByParentId(`apflora`, `erfkrit`, activeUrlElements.ap)
      }
      store.fetchTable(`apflora`, `ap_erfkrit_werte`)
    },
    zielFolder() {
      if (!inPreviousActiveUrlElements(`ap`)) {
        store.fetchTableByParentId(`apflora`, `ziel`, activeUrlElements.ap)
      }
    },
    zieljahr() {
      if (!inPreviousActiveUrlElements(`ap`)) {
        store.fetchTableByParentId(`apflora`, `ziel`, activeUrlElements.ap)
      }
      store.fetchTable(`apflora`, `ziel_typ_werte`)
    },
    ziel() {
      if (!inPreviousActiveUrlElements(`ziel`)) {
        store.fetchTableByParentId(`apflora`, `zielber`, activeUrlElements.ziel)
      }
    },
    zielberFolder() {
      if (!inPreviousActiveUrlElements(`ziel`)) {
        store.fetchTableByParentId(`apflora`, `zielber`, activeUrlElements.ziel)
      }
    },
    zielber() {
      if (!inPreviousActiveUrlElements(`ziel`)) {
        store.fetchTableByParentId(`apflora`, `zielber`, activeUrlElements.ziel)
      }
    },
    popFolder() {
      if (!inPreviousActiveUrlElements(`pop`)) {
        store.fetchTableByParentId(`apflora`, `pop`, activeUrlElements.ap)
      }
    },
    popberFolder() {
      if (!inPreviousActiveUrlElements(`pop`)) {
        store.fetchTableByParentId(`apflora`, `popber`, activeUrlElements.pop)
      }
    },
    popmassnberFolder() {
      if (!inPreviousActiveUrlElements(`pop`)) {
        store.fetchTableByParentId(`apflora`, `popmassnber`, activeUrlElements.pop)
      }
    },
    tpopFolder() {
      if (!inPreviousActiveUrlElements(`pop`)) {
        store.fetchTableByParentId(`apflora`, `tpop`, activeUrlElements.pop)
      }
    },
    tpopmassnFolder() {
      if (!inPreviousActiveUrlElements(`tpop`)) {
        store.fetchTableByParentId(`apflora`, `tpopmassn`, activeUrlElements.tpop)
      }
      store.fetchTable(`apflora`, `tpopmassn_typ_werte`)
    },
    tpopmassnberFolder() {
      if (!inPreviousActiveUrlElements(`tpop`)) {
        store.fetchTableByParentId(`apflora`, `tpopmassnber`, activeUrlElements.tpop)
      }
      store.fetchTable(`apflora`, `tpopmassn_erfbeurt_werte`)
    },
    tpopfeldkontrFolder() {
      if (!inPreviousActiveUrlElements(`tpop`)) {
        store.fetchTableByParentId(`apflora`, `tpopkontr`, activeUrlElements.tpop)
      }
    },
    tpopkontrzaehlFolder() {
      if (!inPreviousActiveUrlElements(`tpopfeldkontr`)) {
        store.fetchTableByParentId(`apflora`, `tpopkontrzaehl`, activeUrlElements.tpopfeldkontr)
      }
      store.fetchTable(`apflora`, `tpopkontrzaehl_einheit_werte`)
    },
    tpopfreiwkontrFolder() {
      if (!inPreviousActiveUrlElements(`tpop`)) {
        store.fetchTableByParentId(`apflora`, `tpopkontr`, activeUrlElements.tpop)
      }
    },
    tpopberFolder() {
      if (!inPreviousActiveUrlElements(`tpop`)) {
        store.fetchTableByParentId(`apflora`, `tpopber`, activeUrlElements.tpop)
      }
    },
    tpopBeobzuordnungFolder() {
      // TODO
      if (!inPreviousActiveUrlElements(`tpop`)) {
        store.fetchTableByParentId(`apflora`, `ap`, activeUrlElements.tpop)
      }
    },
  }
  // console.log(`reaction updateData: fetchingFromActiveElements:`, fetchingFromActiveElements)
  // console.log(`reaction updateData: activeUrlElements:`, activeUrlElements)
  forEach(fetchingFromActiveElements, (func, key) => {
    if (activeUrlElements[key]) func()
  })
  store.previousActiveUrlElements = clone(activeUrlElements)
}
