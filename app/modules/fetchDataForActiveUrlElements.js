import forEach from 'lodash/forEach'

export default (store) => {
  const activeElements = store.activeUrlElements
  const fetchingFromActiveElements = {
    projektFolder() {
      return store.fetchTable(`apflora`, `projekt`)
    },
    apberuebersichtFolder() {
      return store.fetchTableByParentId(`apflora`, `apberuebersicht`, activeElements.projekt)
    },
    apFolder() {
      return store.fetchTableByParentId(`apflora`, `ap`, activeElements.projekt)
    },
    assozartFolder() {
      return store.fetchTableByParentId(`apflora`, `assozart`, activeElements.ap)
    },
    idealbiotopFolder() {
      return store.fetchTableByParentId(`apflora`, `idealbiotop`, activeElements.ap)
    },
    beobNichtZuzuordnenFolder() {
      // TODO
      return store.fetchTableByParentId(`apflora`, `ap`, activeElements.projekt)
    },
    beobzuordnungFolder() {
      // TODO
      return store.fetchTableByParentId(`apflora`, `ap`, activeElements.projekt)
    },
    berFolder() {
      return store.fetchTableByParentId(`apflora`, `ber`, activeElements.ap)
    },
    apberFolder() {
      return store.fetchTableByParentId(`apflora`, `apber`, activeElements.ap)
    },
    erfkritFolder() {
      return store.fetchTableByParentId(`apflora`, `erfkrit`, activeElements.ap)
    },
    zielFolder() {
      return store.fetchTableByParentId(`apflora`, `ziel`, activeElements.ap)
    },
    zielberFolder() {
      return store.fetchTableByParentId(`apflora`, `zielber`, activeElements.ziel)
    },
    popFolder() {
      return store.fetchTableByParentId(`apflora`, `pop`, activeElements.ap)
    },
    popberFolder() {
      return store.fetchTableByParentId(`apflora`, `popber`, activeElements.pop)
    },
    popmassnberFolder() {
      return store.fetchTableByParentId(`apflora`, `popmassnber`, activeElements.pop)
    },
    tpopFolder() {
      return store.fetchTableByParentId(`apflora`, `tpop`, activeElements.pop)
    },
    tpopmassnFolder() {
      return store.fetchTableByParentId(`apflora`, `tpopmassn`, activeElements.tpop)
    },
    tpopmassnberFolder() {
      return store.fetchTableByParentId(`apflora`, `tpopmassnber`, activeElements.tpop)
    },
    tpopfeldkontrFolder() {
      return store.fetchTableByParentId(`apflora`, `tpopkontr`, activeElements.tpop)
    },
    tpopkontrzaehlFolder() {
      return store.fetchTableByParentId(`apflora`, `tpopkontrzaehl`, activeElements.tpopfeldkontr)
    },
    tpopfreiwkontrFolder() {
      return store.fetchTableByParentId(`apflora`, `tpopkontr`, activeElements.tpop)
    },
    tpopberFolder() {
      return store.fetchTableByParentId(`apflora`, `tpopber`, activeElements.tpop)
    },
    tpopBeobzuordnungFolder() {
      // TODO
      return store.fetchTableByParentId(`apflora`, `ap`, activeElements.tpop)
    },
  }
  console.log(`reaction updateData: fetchingFromActiveElements:`, fetchingFromActiveElements)
  console.log(`reaction updateData: activeElements:`, activeElements)
  forEach(fetchingFromActiveElements, (func, key) => {
    if (activeElements[key]) func()
  })
}
