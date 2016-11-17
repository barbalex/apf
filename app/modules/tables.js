export default [
  {
    database: `apflora`,
    tabelleInDb: `ap`,
    tabelleIdFeld: `ApArtId`,
    mutWannFeld: `MutWann`,
    mutWerFeld: `MutWer`,
    label(row, data) {
      if (!data || !data.aeEigenschaften) return ``
      const ae = data.aeEigenschaften.find(e => e.id === row.ApArtId)
      if (!ae) return ``
      return ae.label || ``
    },
  },
  {
    database: `apflora`,
    tabelleInDb: `pop`,
    tabelleIdFeld: `PopId`,
    mutWannFeld: `MutWann`,
    mutWerFeld: `MutWer`,
    label(row) {
      if (!row) return ``
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
      if (!row) return ``
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
      if (!row) return ``
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
      if (!row || !data || !data.tpopkontrzaehlEinheit || !data.tpopkontrzaehlMethode) return ``
      const zaehleinheit = data.tpopkontrzaehlEinheit.find(e => e.DomainCode === row.Zaehleinheit)
      if (!zaehleinheit) return ``
      const zaehleinheitTxt = zaehleinheit.DomainTxt || ``
      const methode = data.tpopkontrzaehlMethode.find(e => e.DomainCode === row.Methode)
      if (!methode) return ``
      const methodeTxt = methode.DomainTxt || ``
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
      if (!row || !data.tpopmassnTyp) return ``
      const massnTyp = data.tpopmassnTyp.find(e => e.DomainCode === row.TPopMassnTyp)
      if (!massnTyp) return ``
      const massnTypTxt = massnTyp.DomainTxt || ``
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
      if (!row || !data.zielTyp) return ``
      const zielTyp = data.zielTyp.find(e => e.DomainCode === row.ZielTyp)
      if (!zielTyp) return ``
      const zielTypTxt = zielTyp.DomainTxt || ``
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
      if (!row) return ``
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
      if (!row) return ``
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
      if (!row) return ``
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
      if (!row) return ``
      return row.JbuJahr || ``
    },
  },
  {
    database: `apflora`,
    tabelleInDb: `ber`,
    tabelleIdFeld: `BerId`,
    mutWannFeld: `MutWann`,
    mutWerFeld: `MutWer`,
    label(row) {
      if (!row) return ``
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
      return `Idealbiotop`
    },
  },
  {
    database: `apflora`,
    tabelleInDb: `assozart`,
    tabelleIdFeld: `AaId`,
    mutWannFeld: `MutWann`,
    mutWerFeld: `MutWer`,
    label(row, data) {
      if (!row) return ``
      let label = `(keine Art gewählt)`
      if (row.AaApArtId && data && data.aeEigenschaften) {
        const ae = data.aeEigenschaften.find(e => e.id === row.AaApArtId)
        if (ae) {
          label = ae.label
        }
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
      if (!row) return ``
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
      if (!row) return ``
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
      if (!row) return ``
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
      if (!row || !data || !data.tpopmassnErfbeurt) return ``
      const beurteil = data.tpopmassnErfbeurt.find(e => e.DomainCode === row.TPopMassnBerErfolgsbeurteilung)
      const beurteilTxt = beurteil.DomainTxt || ``
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
      if (!row) return ``
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
      if (!row) return ``
      return row.ProjName || `(kein Name)`
    },
  },
  {
    database: `beob`,
    tabelleInDb: `beob_bereitgestellt`,
    tabelleIdFeld: `BeobId`,
    mutWannFeld: null,
    mutWerFeld: null,
    label(row) {
      if (!row) return ``
      return `${row.Datum || `(kein Datum)`}: ${row.Autor || `(kein Autor)`} (${row.Quelle})`
    },
  },
]
