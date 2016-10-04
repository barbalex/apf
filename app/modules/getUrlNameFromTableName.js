export default (table) => {
  const names = {
    ap: 'Arten',
    apber: 'AP-Berichte',
    apberuebersicht: 'AP-Berichte-Übersicht',
    assozart: 'Assoziierte-Arten',
    beob: 'Beobachtung',
    beobzuordnung: 'Beobachtungs-Zuordnungen',
    ber: 'Berichte',
    erfkrit: 'AP-Erfolgskriterien',
    idealbiotop: 'Idealbiotop',
    pop: 'Populationen',
    popber: 'Kontroll-Berichte',
    popmassnber: 'Massnahmen-Berichte',
    projekt: 'Projekte',
    tpop: 'Teilpopulationen',
    tpopber: 'Kontroll-Berichte',
    tpopkontr: 'Kontrollen',
    tpopkontrzaehl: 'Zählungen',
    tpopmassn: 'Massnahmen',
    tpopmassnber: 'Massnahmen-Berichte',
    user: 'Benutzer',
    userprojekt: 'Benutzer-Projekte',
    ziel: 'AP-Ziele',
    zielber: 'AP-Berichte',
  }
  const name = names[table]
  if (!name) throw new Error(`Der Tabelle ${table} konnte kein Namen zugewiesen werden`)
  return name
}
