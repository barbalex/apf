export default (table) => {
  const names = {
    projekt: 'Projekt',
    ap: 'Art',
    apber: 'AP-Bericht',
    apberuebersicht: 'AP-Bericht-Übersicht',
    beob: 'Beobachtung',
    beobzuordnung: 'Beobachtung-Zuordnung',
    pop: 'Population',
    popber: 'Populations-Bericht',
    popmassnber: 'Populations-Massnahmenbericht',
    tpop: 'Teilpopulation',
    tpopber: 'Teilpopulations-Bericht',
    tpopkontr: 'Kontrolle',
    tpopkontrzaehl: 'Zählung',
    tpopmassn: 'Massnahme',
    tpopmassnber: 'Massnahmen-Bericht',
    erfkrit: 'Erfolgskriterium',
    ber: 'Bericht',
    idealbiotop: 'Idealbiotop',
    assozart: 'Assoziierte Art',
    user: 'Benutzer',
    userprojekt: 'Benutzer-Projekt',
    ziel: 'Ziel',
    zielber: 'Ziel-Bericht',
  }
  const name = names[table]
  if (!name) throw new Error(`Der Tabelle ${table} konnte kein Namen zugewiesen werden`)
  return name
}
