export default () => {
  const pathName = window.location.pathname
  const pathElements = pathName.split(`/`)
  // get rid of empty element at start
  pathElements.shift()
  const projektFolder = (pathElements[0] && pathElements[0] === `Projekte`) || false
  const projekt = projektFolder && pathElements[1] ? parseInt(pathElements[1], 10) : null
  const apberuebersichtFolder = (projekt && pathElements[2] && pathElements[2] === `AP-Berichte`) || false
  const apberuebersicht = apberuebersichtFolder && pathElements[3] ? parseInt(pathElements[3], 10) : null
  const apFolder = (projekt && pathElements[2] && pathElements[2] === `Arten`) || false
  const ap = apFolder && pathElements[3] ? parseInt(pathElements[3], 10) : null
  const assozartFolder = (ap && pathElements[4] && pathElements[4] === `assoziierte-Arten`) || false
  const assozart = assozartFolder && pathElements[5] ? parseInt(pathElements[5], 10) : null
  const idealbiotopFolder = (ap && pathElements[4] && pathElements[4] === `Idealbiotop`) || false
  const beobNichtZuzuordnenFolder = (ap && pathElements[4] && pathElements[4] === `nicht-zuzuordnende-Beobachtungen`) || false
  const beobNichtZuzuordnen = beobNichtZuzuordnenFolder && pathElements[5] ? pathElements[5] : null
  const beobzuordnungFolder = (ap && pathElements[4] && pathElements[4] === `nicht-beurteilte-Beobachtungen`) || false
  const beobzuordnung = beobzuordnungFolder && pathElements[5] ? pathElements[5] : null
  const berFolder = (ap && pathElements[4] && pathElements[4] === `Berichte`) || false
  const ber = berFolder && pathElements[5] ? parseInt(pathElements[5], 10) : null
  const apberFolder = (ap && pathElements[4] && pathElements[4] === `AP-Berichte`) || false
  const apber = apberFolder && pathElements[5] ? parseInt(pathElements[5], 10) : null
  const erfkritFolder = (ap && pathElements[4] && pathElements[4] === `AP-Erfolgskriterien`) || false
  const erfkrit = erfkritFolder && pathElements[5] ? parseInt(pathElements[5], 10) : null
  const zielFolder = (ap && pathElements[4] && pathElements[4] === `AP-Ziele`) || false
  const ziel = zielFolder && pathElements[5] ? parseInt(pathElements[5], 10) : null
  const zielberFolder = (ziel && pathElements[6] && pathElements[6] === `Berichte`) || false
  const zielber = zielberFolder && pathElements[7] ? parseInt(pathElements[7], 10) : null
  const popFolder = (ap && pathElements[4] && pathElements[4] === `Populationen`) || false
  const pop = popFolder && pathElements[5] ? parseInt(pathElements[5], 10) : null
  const popberFolder = (pop && pathElements[6] && pathElements[6] === `Kontroll-Berichte`) || false
  const popber = popberFolder && pathElements[7] ? parseInt(pathElements[7], 10) : null
  const popmassnberFolder = (pop && pathElements[6] && pathElements[6] === `Massnahmen-Berichte`) || false
  const popmassnber = popmassnberFolder && pathElements[7] ? parseInt(pathElements[7], 10) : null
  const tpopFolder = (pop && pathElements[6] && pathElements[6] === `Teil-Populationen`) || false
  const tpop = tpopFolder && pathElements[7] ? parseInt(pathElements[7], 10) : null
  const tpopmassnFolder = (tpop && pathElements[8] && pathElements[8] === `Massnahmen`) || false
  const tpopmassn = tpopmassnFolder && pathElements[9] ? parseInt(pathElements[9], 10) : null
  const tpopmassnberFolder = (tpop && pathElements[8] && pathElements[8] === `Massnahmen-Berichte`) || false
  const tpopmassnber = tpopmassnberFolder && pathElements[9] ? parseInt(pathElements[9], 10) : null
  const tpopfeldkontrFolder = (tpop && pathElements[8] && pathElements[8] === `Feld-Kontrollen`) || false
  const tpopfeldkontr = tpopfeldkontrFolder && pathElements[9] ? parseInt(pathElements[9], 10) : null
  const tpopkontrzaehlFolder = (tpopfeldkontr && pathElements[10] && pathElements[10] === `Zählungen`) || false
  const tpopkontrzaehl = tpopkontrzaehlFolder && pathElements[11] ? parseInt(pathElements[11], 10) : null
  const tpopfreiwkontrFolder = (tpop && pathElements[8] && pathElements[8] === `Freiwilligen-Kontrollen`) || false
  const tpopfreiwkontr = tpopfreiwkontrFolder && pathElements[9] ? parseInt(pathElements[9], 10) : null
  const tpopberFolder = (tpop && pathElements[8] && pathElements[8] === `Kontroll-Berichte`) || false
  const tpopber = tpopberFolder && pathElements[9] ? parseInt(pathElements[9], 10) : null
  const tpopBeobzuordnungFolder = (tpop && pathElements[8] && pathElements[8] === `zugeordnete-Beobachtungen`) || false
  const tpopBeobzuordnung = tpopBeobzuordnungFolder && pathElements[9] ? pathElements[9] : null
  return {
    projektFolder,
    projekt,
    apberuebersichtFolder,
    apberuebersicht,
    apFolder,
    ap,
    assozartFolder,
    assozart,
    idealbiotopFolder,
    beobNichtZuzuordnenFolder,
    beobNichtZuzuordnen,
    beobzuordnungFolder,
    beobzuordnung,
    berFolder,
    ber,
    apberFolder,
    apber,
    erfkritFolder,
    erfkrit,
    zielFolder,
    ziel,
    zielberFolder,
    zielber,
    popFolder,
    pop,
    popberFolder,
    popber,
    popmassnberFolder,
    popmassnber,
    tpopFolder,
    tpop,
    tpopmassnFolder,
    tpopmassn,
    tpopmassnberFolder,
    tpopmassnber,
    tpopfeldkontrFolder,
    tpopfeldkontr,
    tpopkontrzaehlFolder,
    tpopkontrzaehl,
    tpopfreiwkontrFolder,
    tpopfreiwkontr,
    tpopberFolder,
    tpopber,
    tpopBeobzuordnungFolder,
    tpopBeobzuordnung,
  }
}
