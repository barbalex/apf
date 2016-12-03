import forEach from 'lodash/forEach'

export default (store) => {
  const activeElements = store.activeUrlElements
  const fetchingFromActiveElements = {
    projektFolder() {
      store.fetchTable(`apflora`, `projekt`)
    },
    projekt() {
      store.fetchTableByParentId(`apflora`, `ap`, activeElements.projekt)
      store.fetchTableByParentId(`apflora`, `apberuebersicht`, activeElements.projekt)
    },
    apberuebersichtFolder() {
      store.fetchTableByParentId(`apflora`, `apberuebersicht`, activeElements.projekt)
    },
    apFolder() {
      store.fetchTableByParentId(`apflora`, `ap`, activeElements.projekt)
      store.fetchTable(`beob`, `adb_eigenschaften`)
    },
    ap() {
      store.fetchTableByParentId(`apflora`, `assozart`, activeElements.ap)
      store.fetchTableByParentId(`apflora`, `idealbiotop`, activeElements.ap)
      store.fetchTableByParentId(`apflora`, `apber`, activeElements.ap)
      store.fetchTable(`apflora`, `ap_erfkrit_werte`)
      store.fetchTableByParentId(`apflora`, `erfkrit`, activeElements.ap)
      store.fetchTableByParentId(`apflora`, `ber`, activeElements.ap)
      store.fetchTableByParentId(`apflora`, `ziel`, activeElements.ap)
      store.fetchTableByParentId(`apflora`, `pop`, activeElements.ap)
      // TODO: add more folders
    },
    assozartFolder() {
      store.fetchTableByParentId(`apflora`, `assozart`, activeElements.ap)
    },
    idealbiotopFolder() {
      store.fetchTableByParentId(`apflora`, `idealbiotop`, activeElements.ap)
    },
    beobNichtZuzuordnenFolder() {
      // TODO
      store.fetchTableByParentId(`apflora`, `ap`, activeElements.projekt)
    },
    beobzuordnungFolder() {
      // TODO
      store.fetchTableByParentId(`apflora`, `ap`, activeElements.projekt)
    },
    berFolder() {
      store.fetchTableByParentId(`apflora`, `ber`, activeElements.ap)
    },
    apberFolder() {
      store.fetchTableByParentId(`apflora`, `apber`, activeElements.ap)
    },
    erfkritFolder() {
      store.fetchTableByParentId(`apflora`, `erfkrit`, activeElements.ap)
    },
    zielFolder() {
      store.fetchTableByParentId(`apflora`, `ziel`, activeElements.ap)
    },
    zieljahr() {
      store.fetchTableByParentId(`apflora`, `ziel`, activeElements.ap)
      store.fetchTable(`apflora`, `ziel_typ_werte`)
    },
    ziel() {
      store.fetchTableByParentId(`apflora`, `zielber`, activeElements.ziel)
    },
    zielberFolder() {
      store.fetchTableByParentId(`apflora`, `zielber`, activeElements.ziel)
    },
    zielber() {
      store.fetchTableByParentId(`apflora`, `zielber`, activeElements.ziel)
    },
    popFolder() {
      store.fetchTableByParentId(`apflora`, `pop`, activeElements.ap)
    },
    popberFolder() {
      store.fetchTableByParentId(`apflora`, `popber`, activeElements.pop)
    },
    popmassnberFolder() {
      store.fetchTableByParentId(`apflora`, `popmassnber`, activeElements.pop)
    },
    tpopFolder() {
      store.fetchTableByParentId(`apflora`, `tpop`, activeElements.pop)
    },
    tpopmassnFolder() {
      store.fetchTableByParentId(`apflora`, `tpopmassn`, activeElements.tpop)
      store.fetchTable(`apflora`, `tpopmassn_typ_werte`)
    },
    tpopmassnberFolder() {
      store.fetchTableByParentId(`apflora`, `tpopmassnber`, activeElements.tpop)
      store.fetchTable(`apflora`, `tpopmassn_erfbeurt_werte`)
    },
    tpopfeldkontrFolder() {
      store.fetchTableByParentId(`apflora`, `tpopkontr`, activeElements.tpop)
    },
    tpopkontrzaehlFolder() {
      store.fetchTableByParentId(`apflora`, `tpopkontrzaehl`, activeElements.tpopfeldkontr)
      store.fetchTable(`apflora`, `tpopkontrzaehl_einheit_werte`)
    },
    tpopfreiwkontrFolder() {
      store.fetchTableByParentId(`apflora`, `tpopkontr`, activeElements.tpop)
    },
    tpopberFolder() {
      store.fetchTableByParentId(`apflora`, `tpopber`, activeElements.tpop)
    },
    tpopBeobzuordnungFolder() {
      // TODO
      store.fetchTableByParentId(`apflora`, `ap`, activeElements.tpop)
    },
  }
  // console.log(`reaction updateData: fetchingFromActiveElements:`, fetchingFromActiveElements)
  // console.log(`reaction updateData: activeElements:`, activeElements)
  forEach(fetchingFromActiveElements, (func, key) => {
    if (activeElements[key]) func()
  })
}
