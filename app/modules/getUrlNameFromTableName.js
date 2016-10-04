export default (table) => {
  const names = {
    projekt: 'Projekte',
    ap: 'Arten',
    apber: 'AP-Berichte',
    apberuebersicht: 'AP-Berichte-Übersicht',
    beob: 'Beobachtung',
    beobzuordnung: 'Beobachtungs-Zuordnungen',
    pop: 'Populationen',
    popber: 'Kontroll-Berichte',
    popmassnber: 'Massnahmen-Berichte',
    tpop: 'Teilpopulationen',
    tpopber: 'Kontroll-Berichte',
    tpopkontr: 'Kontrollen',
    tpopkontrzaehl: 'Zählungen',
    tpopmassn: 'Massnahmen',
    tpopmassnber: 'Massnahmen-Berichte',
    erfkrit: 'AP-Erfolgskriterien',
    ber: 'Berichte',
    idealbiotop: 'Idealbiotop',
    assozart: 'Assoziierte-Arten',
    user: 'Benutzer',
    userprojekt: 'Benutzer-Projekte',
    ziel: 'AP-Ziele',
    zielber: 'Berichte',
  }
  const name = names[table]
  if (!name) throw new Error(`Der Tabelle ${table} konnte kein Namen zugewiesen werden`)
  return name
}
