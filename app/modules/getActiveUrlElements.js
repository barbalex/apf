export default (url) => {
  // const pathName = window.location.pathname
  // const url = pathName.split(`/`)
  // get rid of empty element at start
  // url.shift()

  const projektFolder = (url[0] && url[0] === `Projekte`) || false
  const projekt = projektFolder && url[1] ? parseInt(url[1], 10) : null
  const apberuebersichtFolder = (projekt && url[2] && url[2] === `AP-Berichte`) || false
  const apberuebersicht = apberuebersichtFolder && url[3] ? parseInt(url[3], 10) : null
  const apFolder = (projekt && url[2] && url[2] === `Arten`) || false
  const ap = apFolder && url[3] ? parseInt(url[3], 10) : null
  const assozartFolder = (ap && url[4] && url[4] === `assoziierte-Arten`) || false
  const assozart = assozartFolder && url[5] ? parseInt(url[5], 10) : null
  const idealbiotopFolder = (ap && url[4] && url[4] === `Idealbiotop`) || false
  const beobNichtZuzuordnenFolder = (ap && url[4] && url[4] === `nicht-zuzuordnende-Beobachtungen`) || false
  const beobNichtZuzuordnen = beobNichtZuzuordnenFolder && url[5] ? url[5] : null
  const beobzuordnungFolder = (ap && url[4] && url[4] === `nicht-beurteilte-Beobachtungen`) || false
  const beobzuordnung = beobzuordnungFolder && url[5] ? url[5] : null
  const berFolder = (ap && url[4] && url[4] === `Berichte`) || false
  const ber = berFolder && url[5] ? parseInt(url[5], 10) : null
  const apberFolder = (ap && url[4] && url[4] === `AP-Berichte`) || false
  const apber = apberFolder && url[5] ? parseInt(url[5], 10) : null
  const erfkritFolder = (ap && url[4] && url[4] === `AP-Erfolgskriterien`) || false
  const erfkrit = erfkritFolder && url[5] ? parseInt(url[5], 10) : null
  const zielFolder = (ap && url[4] && url[4] === `AP-Ziele`) || false
  const ziel = zielFolder && url[5] ? parseInt(url[5], 10) : null
  const zielberFolder = (ziel && url[6] && url[6] === `Berichte`) || false
  const zielber = zielberFolder && url[7] ? parseInt(url[7], 10) : null
  const popFolder = (ap && url[4] && url[4] === `Populationen`) || false
  const pop = popFolder && url[5] ? parseInt(url[5], 10) : null
  const popberFolder = (pop && url[6] && url[6] === `Kontroll-Berichte`) || false
  const popber = popberFolder && url[7] ? parseInt(url[7], 10) : null
  const popmassnberFolder = (pop && url[6] && url[6] === `Massnahmen-Berichte`) || false
  const popmassnber = popmassnberFolder && url[7] ? parseInt(url[7], 10) : null
  const tpopFolder = (pop && url[6] && url[6] === `Teil-Populationen`) || false
  const tpop = tpopFolder && url[7] ? parseInt(url[7], 10) : null
  const tpopmassnFolder = (tpop && url[8] && url[8] === `Massnahmen`) || false
  const tpopmassn = tpopmassnFolder && url[9] ? parseInt(url[9], 10) : null
  const tpopmassnberFolder = (tpop && url[8] && url[8] === `Massnahmen-Berichte`) || false
  const tpopmassnber = tpopmassnberFolder && url[9] ? parseInt(url[9], 10) : null
  const tpopfeldkontrFolder = (tpop && url[8] && url[8] === `Feld-Kontrollen`) || false
  const tpopfeldkontr = tpopfeldkontrFolder && url[9] ? parseInt(url[9], 10) : null
  const tpopkontrzaehlFolder = (tpopfeldkontr && url[10] && url[10] === `Zählungen`) || false
  const tpopkontrzaehl = tpopkontrzaehlFolder && url[11] ? parseInt(url[11], 10) : null
  const tpopfreiwkontrFolder = (tpop && url[8] && url[8] === `Freiwilligen-Kontrollen`) || false
  const tpopfreiwkontr = tpopfreiwkontrFolder && url[9] ? parseInt(url[9], 10) : null
  const tpopberFolder = (tpop && url[8] && url[8] === `Kontroll-Berichte`) || false
  const tpopber = tpopberFolder && url[9] ? parseInt(url[9], 10) : null
  const tpopBeobzuordnungFolder = (tpop && url[8] && url[8] === `zugeordnete-Beobachtungen`) || false
  const tpopBeobzuordnung = tpopBeobzuordnungFolder && url[9] ? url[9] : null

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
