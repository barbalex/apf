export default [
  {
    database: `apflora`,
    tabelleInDb: `ap`,
    tabelleIdFeld: `ApArtId`,
    mutWannFeld: `MutWann`,
    mutWerFeld: `MutWer`,
    label(row, data) {
      return data.aeEigenschaften.find(e => e.id === row.ApArtId).label
    },
  },
  {
    database: `apflora`,
    tabelleInDb: `pop`,
    tabelleIdFeld: `PopId`,
    mutWannFeld: `MutWann`,
    mutWerFeld: `MutWer`,
    label(row) {
      return `${row.PopNr || `(keine Nr)`}: ${row.PopName || `(kein Name)`}`
    },
  },
  {
    database: `apflora`,
    tabelleInDb: `tpop`,
    tabelleIdFeld: `TPopId`,
    mutWannFeld: `MutWann`,
    mutWerFeld: `MutWer`,
    label(row) {
      return `${row.TPopNr || `(keine Nr)`}: ${row.TPopFlurname || `(kein Flurname)`}`
    },
  },
  {
    database: `apflora`,
    tabelleInDb: `tpopkontr`,
    tabelleIdFeld: `TPopKontrId`,
    mutWannFeld: `MutWann`,
    mutWerFeld: `MutWer`,
    label(row) {
      if (row.TPopKontrTyp && row.TPopKontrTyp === `"Freiwilligen-Erfolgskontrolle"`) {
        return `${row.TPopKontrJahr || `(kein Jahr)`}`
      }
      return `${row.TPopKontrJahr || `(kein Jahr)`}: ${row.TPopKontrTyp || `(kein Typ)`}`
    },
  },
  {
    database: `apflora`,
    tabelleInDb: `tpopkontrzaehl`,
    tabelleIdFeld: `TPopKontrZaehlId`,
    mutWannFeld: `MutWann`,
    mutWerFeld: `MutWer`,
    label(row, data) {
      const zaehleinheitTxt = data.tpopkontrzaehlEinheit.find(e => e.DomainCode === row.Zaehleinheit).DomainTxt
      const methodeTxt = data.tpopkontrzaehlMethode.find(e => e.DomainCode === row.Methode).DomainTxt
      return `${row.Anzahl || `(keine Anzahl)`} ${zaehleinheitTxt || `(keine Einheit)`} ${methodeTxt || `(keine Methode)`}`
    },
  },
  {
    database: `apflora`,
    tabelleInDb: `tpopmassn`,
    tabelleIdFeld: `TPopMassnId`,
    mutWannFeld: `MutWann`,
    mutWerFeld: `MutWer`,
    label(row, data) {
      const massnTypTxt = data.tpopmassnTyp.find(e => e.DomainCode === row.TPopMassnTyp).DomainTxt
      return `${row.TPopMassnJahr || `(kein Jahr)`}: ${massnTypTxt || `(kein Typ)`}`
    },
  },
  {
    database: `apflora`,
    tabelleInDb: `ziel`,
    tabelleIdFeld: `ZielId`,
    mutWannFeld: `MutWann`,
    mutWerFeld: `MutWer`,
    label(row, data) {
      const zielTypTxt = data.zielTyp.find(e => e.DomainCode === row.ZielTyp).DomainTxt
      return `${row.ZielJahr || `(kein Jahr)`}: ${row.ZielBezeichnung} (${zielTypTxt})`
    },
  },
  {
    database: `apflora`,
    tabelleInDb: `zielber`,
    tabelleIdFeld: `ZielBerId`,
    mutWannFeld: `MutWann`,
    mutWerFeld: `MutWer`,
    label(row) {
      return `${row.ZielBerJahr || `(kein Jahr)`}: ${row.ZielBerErreichung || `(keine Entwicklung)`}`
    },
  },
  {
    database: `apflora`,
    tabelleInDb: `erfkrit`,
    tabelleIdFeld: `ErfkritId`,
    mutWannFeld: `MutWann`,
    mutWerFeld: `MutWer`,
    label(row) {
      return `${row.BeurteilTxt || `(nicht beurteilt)`}: ${row.ErfkritTxt || `(keine Kriterien erfasst)`}`
    },
  },
  {
    database: `apflora`,
    tabelleInDb: `apber`,
    tabelleIdFeld: `JBerId`,
    mutWannFeld: `MutWann`,
    mutWerFeld: `MutWer`,
    label(row) {
      return row.JBerJahr || `(kein Jahr)`
    },
  },
  {
    database: `apflora`,
    tabelleInDb: `apberuebersicht`,
    tabelleIdFeld: `JbuJahr`,
    mutWannFeld: `MutWann`,
    mutWerFeld: `MutWer`,
    label(row) {
      return row.JbuJahr
    },
  },
  {
    database: `apflora`,
    tabelleInDb: `ber`,
    tabelleIdFeld: `BerId`,
    mutWannFeld: `MutWann`,
    mutWerFeld: `MutWer`,
    label(row) {
      return `${row.BerJahr || `(kein Jahr)`}: ${row.BerTitel || `(kein Titel)`}`
    },
  },
  {
    database: `apflora`,
    tabelleInDb: `idealbiotop`,
    tabelleIdFeld: `IbApArtId`,
    mutWannFeld: `MutWann`,
    mutWerFeld: `MutWer`,
    label() {
      return 'Idealbiotop'
    },
  },
  {
    database: `apflora`,
    tabelleInDb: `assozart`,
    tabelleIdFeld: `AaId`,
    mutWannFeld: `MutWann`,
    mutWerFeld: `MutWer`,
    label(row, data) {
      let label = `(keine Art gewählt)`
      if (!row.AaApArtId) {
        label = data.aeEigenschaften.find(e => e.id === row.AaApArtId).label
      }
      return label
    },
  },
  {
    database: `apflora`,
    tabelleInDb: `popber`,
    tabelleIdFeld: `PopBerId`,
    mutWannFeld: `MutWann`,
    mutWerFeld: `MutWer`,
    label(row) {
      return `${row.PopBerJahr || `(kein Jahr)`}: ${row.EntwicklungTxt || `(nicht beurteilt)`}`
    },
  },
  {
    database: `apflora`,
    tabelleInDb: `popmassnber`,
    tabelleIdFeld: `PopMassnBerId`,
    mutWannFeld: `MutWann`,
    mutWerFeld: `MutWer`,
    label(row) {
      return `${row.PopMassnBerJahr || `(kein Jahr)`}: ${row.BeurteilTxt || `(nicht beurteilt)`}`
    },
  },
  {
    database: `apflora`,
    tabelleInDb: `tpopber`,
    tabelleIdFeld: `TPopBerId`,
    mutWannFeld: `MutWann`,
    mutWerFeld: `MutWer`,
    label(row) {
      return `${row.TPopBerJahr || `(kein Jahr)`}: ${row.EntwicklungTxt || `(nicht beurteilt)`}`
    },
  },
  {
    database: `apflora`,
    tabelleInDb: `tpopmassnber`,
    tabelleIdFeld: `TPopMassnBerId`,
    mutWannFeld: `MutWann`,
    mutWerFeld: `MutWer`,
    label(row, data) {
      const beurteilTxt = data.tpopmassnErfbeurt.find(e =>
        e.DomainCode === row.TPopMassnBerErfolgsbeurteilung
      ).DomainTxt
      return `${row.TPopMassnBerJahr || `(kein Jahr)`}: ${beurteilTxt || `(keine Beurteilung)`}`
    },
  },
  {
    database: `apflora`,
    tabelleInDb: `beobzuordnung`,
    tabelleIdFeld: `NO_NOTE`,
    mutWannFeld: `BeobMutWann`,
    mutWerFeld: `BeobMutWer`,
    label(row) {
      return `${row.Datum || `(kein Datum)`}: ${row.Autor || `(kein Autor)`} (${row.Quelle})`
    },
  },
  {
    database: `apflora`,
    tabelleInDb: `projekt`,
    tabelleIdFeld: `ProjId`,
    mutWannFeld: `MutWann`,
    mutWerFeld: `MutWer`,
    label(row) {
      return `${row.ProjName || `(kein Name)`}`
    },
  },
  {
    database: `beob`,
    tabelleInDb: `beob_bereitgestellt`,
    tabelleIdFeld: `BeobId`,
    mutWannFeld: null,
    mutWerFeld: null,
    label(row) {
      return `${row.Datum || `(kein Datum)`}: ${row.Autor || `(kein Autor)`} (${row.Quelle})`
    }
  },
]
