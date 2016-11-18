export default [
  {
    database: `apflora`,
    tabelleInDb: `ap`,
    tabelleIdFeld: `ApArtId`,
    mutWannFeld: `MutWann`,
    mutWerFeld: `MutWer`,
    rowLabel(row, data) {
      if (!data || !data.aeEigenschaften) return ``
      const ae = data.aeEigenschaften.find(e => e.id === row.ApArtId)
      if (!ae) return ``
      return ae.label || ``
    },
    folderLabel(node) {
      if (!node) return ``
      if (!node.childrenFilteredByLabel && node.label) return node.label
      return `Arten (${node.childrenFilteredByLabel.length})`
    },
  },
  {
    database: `apflora`,
    tabelleInDb: `pop`,
    tabelleIdFeld: `PopId`,
    mutWannFeld: `MutWann`,
    mutWerFeld: `MutWer`,
    rowLabel(row) {
      if (!row) return ``
      return `${row.PopNr || `(keine Nr)`}: ${row.PopName || `(kein Name)`}`
    },
    folderLabel(node) {
      if (!node) return ``
      if (!node.childrenFilteredByLabel && node.label) return node.label
      return `Populationen (${node.childrenFilteredByLabel.length})`
    },
  },
  {
    database: `apflora`,
    tabelleInDb: `tpop`,
    tabelleIdFeld: `TPopId`,
    mutWannFeld: `MutWann`,
    mutWerFeld: `MutWer`,
    rowLabel(row) {
      if (!row) return ``
      return `${row.TPopNr || `(keine Nr)`}: ${row.TPopFlurname || `(kein Flurname)`}`
    },
    folderLabel(node) {
      if (!node) return ``
      if (!node.childrenFilteredByLabel && node.label) return node.label
      return `Teil-Populationen (${node.childrenFilteredByLabel.length})`
    },
  },
  {
    database: `apflora`,
    tabelleInDb: `tpopkontr`,
    tabelleIdFeld: `TPopKontrId`,
    mutWannFeld: `MutWann`,
    mutWerFeld: `MutWer`,
    rowLabel(row) {
      if (!row) return ``
      if (row.TPopKontrTyp && row.TPopKontrTyp === `"Freiwilligen-Erfolgskontrolle"`) {
        return `${row.TPopKontrJahr || `(kein Jahr)`}`
      }
      return `${row.TPopKontrJahr || `(kein Jahr)`}: ${row.TPopKontrTyp || `(kein Typ)`}`
    },
    folderLabel(node) {
      if (!node) return ``
      if (!node.childrenFilteredByLabel && node.label) return node.label
      if (!node.row) return ``
      const row = node.row
      if (row.TPopKontrTyp && row.TPopKontrTyp === `"Freiwilligen-Erfolgskontrolle"`) {
        return `Freiwilligen-Kontrollen (${node.childrenFilteredByLabel.length})`
      }
      return `Feld-Kontrollen (${node.childrenFilteredByLabel.length})`
    },
  },
  {
    database: `apflora`,
    tabelleInDb: `tpopkontrzaehl`,
    tabelleIdFeld: `TPopKontrZaehlId`,
    mutWannFeld: `MutWann`,
    mutWerFeld: `MutWer`,
    rowLabel(row, data) {
      if (!row || !data || !data.tpopkontrzaehlEinheit || !data.tpopkontrzaehlMethode) return ``
      const zaehleinheit = data.tpopkontrzaehlEinheit.find(e => e.DomainCode === row.Zaehleinheit)
      if (!zaehleinheit) return ``
      const zaehleinheitTxt = zaehleinheit.DomainTxt || ``
      const methode = data.tpopkontrzaehlMethode.find(e => e.DomainCode === row.Methode)
      if (!methode) return ``
      const methodeTxt = methode.DomainTxt || ``
      return `${row.Anzahl || `(keine Anzahl)`} ${zaehleinheitTxt || `(keine Einheit)`} ${methodeTxt || `(keine Methode)`}`
    },
    folderLabel(node) {
      if (!node) return ``
      if (!node.childrenFilteredByLabel && node.label) return node.label
      return `Zählungen (${node.childrenFilteredByLabel.length})`
    },
  },
  {
    database: `apflora`,
    tabelleInDb: `tpopmassn`,
    tabelleIdFeld: `TPopMassnId`,
    mutWannFeld: `MutWann`,
    mutWerFeld: `MutWer`,
    rowLabel(row, data) {
      if (!row || !data.tpopmassnTyp) return ``
      const massnTyp = data.tpopmassnTyp.find(e => e.DomainCode === row.TPopMassnTyp)
      if (!massnTyp) return ``
      const massnTypTxt = massnTyp.DomainTxt || ``
      return `${row.TPopMassnJahr || `(kein Jahr)`}: ${massnTypTxt || `(kein Typ)`}`
    },
    folderLabel(node) {
      if (!node) return ``
      if (!node.childrenFilteredByLabel && node.label) return node.label
      return `Massnahmen (${node.childrenFilteredByLabel.length})`
    },
  },
  {
    database: `apflora`,
    tabelleInDb: `ziel`,
    tabelleIdFeld: `ZielId`,
    mutWannFeld: `MutWann`,
    mutWerFeld: `MutWer`,
    rowLabel(row, data) {
      if (!row || !data.zielTyp) return ``
      const zielTyp = data.zielTyp.find(e => e.DomainCode === row.ZielTyp)
      if (!zielTyp) return ``
      const zielTypTxt = zielTyp.DomainTxt || ``
      return `${row.ZielJahr || `(kein Jahr)`}: ${row.ZielBezeichnung} (${zielTypTxt})`
    },
    folderLabel(node) {
      if (!node) return ``
      if (!node.childrenFilteredByLabel && node.label) return node.label
      return `AP-Ziele (${node.childrenFilteredByLabel.length})`
    },
  },
  {
    database: `apflora`,
    tabelleInDb: `zielber`,
    tabelleIdFeld: `ZielBerId`,
    mutWannFeld: `MutWann`,
    mutWerFeld: `MutWer`,
    rowLabel(row) {
      if (!row) return ``
      return `${row.ZielBerJahr || `(kein Jahr)`}: ${row.ZielBerErreichung || `(keine Entwicklung)`}`
    },
    folderLabel(node) {
      if (!node) return ``
      if (!node.childrenFilteredByLabel && node.label) return node.label
      return `Berichte (${node.childrenFilteredByLabel.length})`
    },
  },
  {
    database: `apflora`,
    tabelleInDb: `erfkrit`,
    tabelleIdFeld: `ErfkritId`,
    mutWannFeld: `MutWann`,
    mutWerFeld: `MutWer`,
    rowLabel(row) {
      if (!row) return ``
      return `${row.BeurteilTxt || `(nicht beurteilt)`}: ${row.ErfkritTxt || `(keine Kriterien erfasst)`}`
    },
    folderLabel(node) {
      if (!node) return ``
      if (!node.childrenFilteredByLabel && node.label) return node.label
      return `AP-Erfolgskriterien (${node.childrenFilteredByLabel.length})`
    },
  },
  {
    database: `apflora`,
    tabelleInDb: `apber`,
    tabelleIdFeld: `JBerId`,
    mutWannFeld: `MutWann`,
    mutWerFeld: `MutWer`,
    rowLabel(row) {
      if (!row) return ``
      return row.JBerJahr || `(kein Jahr)`
    },
    folderLabel(node) {
      if (!node) return ``
      if (!node.childrenFilteredByLabel && node.label) return node.label
      return `AP-Berichte (${node.childrenFilteredByLabel.length})`
    },
  },
  {
    database: `apflora`,
    tabelleInDb: `apberuebersicht`,
    tabelleIdFeld: `JbuJahr`,
    mutWannFeld: `MutWann`,
    mutWerFeld: `MutWer`,
    rowLabel(row) {
      if (!row) return ``
      return row.JbuJahr || ``
    },
    folderLabel(node) {
      if (!node) return ``
      if (!node.childrenFilteredByLabel && node.label) return node.label
      return `AP-Berichte (${node.childrenFilteredByLabel.length})`
    },
  },
  {
    database: `apflora`,
    tabelleInDb: `ber`,
    tabelleIdFeld: `BerId`,
    mutWannFeld: `MutWann`,
    mutWerFeld: `MutWer`,
    rowLabel(row) {
      if (!row) return ``
      return `${row.BerJahr || `(kein Jahr)`}: ${row.BerTitel || `(kein Titel)`}`
    },
    folderLabel(node) {
      if (!node) return ``
      if (!node.childrenFilteredByLabel && node.label) return node.label
      return `Berichte (${node.childrenFilteredByLabel.length})`
    },
  },
  {
    database: `apflora`,
    tabelleInDb: `idealbiotop`,
    tabelleIdFeld: `IbApArtId`,
    mutWannFeld: `MutWann`,
    mutWerFeld: `MutWer`,
    rowLabel() {
      return `Idealbiotop`
    },
  },
  {
    database: `apflora`,
    tabelleInDb: `assozart`,
    tabelleIdFeld: `AaId`,
    mutWannFeld: `MutWann`,
    mutWerFeld: `MutWer`,
    rowLabel(row, data) {
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
    folderLabel(node) {
      if (!node) return ``
      if (!node.childrenFilteredByLabel && node.label) return node.label
      return `assoziierte Arten (${node.childrenFilteredByLabel.length})`
    },
  },
  {
    database: `apflora`,
    tabelleInDb: `popber`,
    tabelleIdFeld: `PopBerId`,
    mutWannFeld: `MutWann`,
    mutWerFeld: `MutWer`,
    rowLabel(row) {
      if (!row) return ``
      return `${row.PopBerJahr || `(kein Jahr)`}: ${row.EntwicklungTxt || `(nicht beurteilt)`}`
    },
    folderLabel(node) {
      if (!node) return ``
      if (!node.childrenFilteredByLabel && node.label) return node.label
      return `Kontroll-Berichte (${node.childrenFilteredByLabel.length})`
    },
  },
  {
    database: `apflora`,
    tabelleInDb: `popmassnber`,
    tabelleIdFeld: `PopMassnBerId`,
    mutWannFeld: `MutWann`,
    mutWerFeld: `MutWer`,
    rowLabel(row) {
      if (!row) return ``
      return `${row.PopMassnBerJahr || `(kein Jahr)`}: ${row.BeurteilTxt || `(nicht beurteilt)`}`
    },
    folderLabel(node) {
      if (!node) return ``
      if (!node.childrenFilteredByLabel && node.label) return node.label
      return `Massnahmen-Berichte (${node.childrenFilteredByLabel.length})`
    },
  },
  {
    database: `apflora`,
    tabelleInDb: `tpopber`,
    tabelleIdFeld: `TPopBerId`,
    mutWannFeld: `MutWann`,
    mutWerFeld: `MutWer`,
    rowLabel(row) {
      if (!row) return ``
      return `${row.TPopBerJahr || `(kein Jahr)`}: ${row.EntwicklungTxt || `(nicht beurteilt)`}`
    },
    folderLabel(node) {
      if (!node) return ``
      if (!node.childrenFilteredByLabel && node.label) return node.label
      return `Kontroll-Berichte (${node.childrenFilteredByLabel.length})`
    },
  },
  {
    database: `apflora`,
    tabelleInDb: `tpopmassnber`,
    tabelleIdFeld: `TPopMassnBerId`,
    mutWannFeld: `MutWann`,
    mutWerFeld: `MutWer`,
    rowLabel(row, data) {
      if (!row || !data || !data.tpopmassnErfbeurt) return ``
      const beurteil = data.tpopmassnErfbeurt.find(e => e.DomainCode === row.TPopMassnBerErfolgsbeurteilung)
      const beurteilTxt = beurteil.DomainTxt || ``
      return `${row.TPopMassnBerJahr || `(kein Jahr)`}: ${beurteilTxt || `(keine Beurteilung)`}`
    },
    folderLabel(node) {
      if (!node) return ``
      if (!node.childrenFilteredByLabel && node.label) return node.label
      return `Massnahmen-Berichte (${node.childrenFilteredByLabel.length})`
    },
  },
  {
    database: `apflora`,
    tabelleInDb: `beobzuordnung`,
    tabelleIdFeld: `NO_NOTE`,
    mutWannFeld: `BeobMutWann`,
    mutWerFeld: `BeobMutWer`,
    rowLabel(row) {
      if (!row) return ``
      return `${row.Datum || `(kein Datum)`}: ${row.Autor || `(kein Autor)`} (${row.Quelle})`
    },
    folderLabel(node) {
      if (!node) return ``
      return node.label
      // if (!node.childrenFilteredByLabel && node.label) return node.label
      // return `zugeordnete Beobachtungen (${node.childrenFilteredByLabel.length})`
    },
  },
  {
    database: `apflora`,
    tabelleInDb: `beobNichtZuzuordnen`,
    tabelleIdFeld: `NO_NOTE`,
    mutWannFeld: `BeobMutWann`,
    mutWerFeld: `BeobMutWer`,
    rowLabel(row) {
      if (!row) return ``
      return `${row.Datum || `(kein Datum)`}: ${row.Autor || `(kein Autor)`} (${row.Quelle})`
    },
    folderLabel(node) {
      if (!node) return ``
      return node.label
      // if (!node.childrenFilteredByLabel && node.label) return node.label
      // return `nicht zuzuordnende Beobachtungen (${node.row.AnzBeobNichtZuzuordnen < 100 ? node.row.AnzBeobNichtZuzuordnen : `neuste 100 von ${node.row.AnzBeobNichtZuzuordnen}`})`
    },
  },
  {
    database: `apflora`,
    tabelleInDb: `beobNichtBeurteilt`,
    tabelleIdFeld: `NO_NOTE`,
    mutWannFeld: `BeobMutWann`,
    mutWerFeld: `BeobMutWer`,
    rowLabel(row) {
      if (!row) return ``
      return `${row.Datum || `(kein Datum)`}: ${row.Autor || `(kein Autor)`} (${row.Quelle})`
    },
    folderLabel(node) {
      if (!node) return ``
      return node.label
      // if (!node.childrenFilteredByLabel && node.label) return node.label
      // return `nicht beurteilte Beobachtungen (${node.row.AnzBeobNichtBeurteilt < 100 ? node.row.AnzBeobNichtBeurteilt : `neuste 100 von ${node.row.AnzBeobNichtBeurteilt}`})`
    },
  },
  {
    database: `apflora`,
    tabelleInDb: `projekt`,
    tabelleIdFeld: `ProjId`,
    mutWannFeld: `MutWann`,
    mutWerFeld: `MutWer`,
    rowLabel(row) {
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
    rowLabel(row) {
      if (!row) return ``
      return `${row.Datum || `(kein Datum)`}: ${row.Autor || `(kein Autor)`} (${row.Quelle})`
    },
  },
]
