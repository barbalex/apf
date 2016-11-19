const noLabel = `(kein Name)`
export default [
  {
    database: `apflora`,
    tabelleInDb: `ap`,
    tabelleIdFeld: `ApArtId`,
    mutWannFeld: `MutWann`,
    mutWerFeld: `MutWer`,
    rowLabel(row, data) {
      if (!data || !data.aeEigenschaften) return noLabel
      const ae = data.aeEigenschaften.find(e => e.id === row.ApArtId)
      if (!ae) return noLabel
      return ae.label || noLabel
    },
    folderLabel(node) {
      if (!node || !node.childrenFilteredByLabel) return `Arten`
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
      if (!row) return noLabel
      return `${row.PopNr || `(keine Nr)`}: ${row.PopName || `(kein Name)`}`
    },
    folderLabel(node) {
      if (!node || !node.childrenFilteredByLabel) return `Populationen`
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
      if (!row) return noLabel
      return `${row.TPopNr || `(keine Nr)`}: ${row.TPopFlurname || `(kein Flurname)`}`
    },
    folderLabel(node) {
      if (!node || !node.childrenFilteredByLabel) return `Teil-Populationen`
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
      if (!row) return noLabel
      if (row.TPopKontrTyp && row.TPopKontrTyp === `"Freiwilligen-Erfolgskontrolle"`) {
        return `${row.TPopKontrJahr || `(kein Jahr)`}`
      }
      return `${row.TPopKontrJahr || `(kein Jahr)`}: ${row.TPopKontrTyp || `(kein Typ)`}`
    },
    folderLabel(node) {
      if (!node || !node.row || !node.row.TPopKontrTyp) return `Kontrollen`
      const row = node.row
      if (row.TPopKontrTyp && row.TPopKontrTyp === `"Freiwilligen-Erfolgskontrolle"`) {
        if (!node.childrenFilteredByLabel) return `Freiwilligen-Kontrollen`
        return `Freiwilligen-Kontrollen (${node.childrenFilteredByLabel.length})`
      }
      if (!node.childrenFilteredByLabel) return `Feld-Kontrollen`
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
      if (!row || !data || !data.tpopkontrzaehlEinheit || !data.tpopkontrzaehlMethode) return noLabel
      const zaehleinheit = data.tpopkontrzaehlEinheit.find(e => e.DomainCode === row.Zaehleinheit)
      if (!zaehleinheit) return noLabel
      const zaehleinheitTxt = zaehleinheit.DomainTxt || noLabel
      const methode = data.tpopkontrzaehlMethode.find(e => e.DomainCode === row.Methode)
      if (!methode) return noLabel
      const methodeTxt = methode.DomainTxt || noLabel
      return `${row.Anzahl || `(keine Anzahl)`} ${zaehleinheitTxt || `(keine Einheit)`} ${methodeTxt || `(keine Methode)`}`
    },
    folderLabel(node) {
      if (!node || !node.childrenFilteredByLabel) return `Zählungen`
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
      if (!row || !data.tpopmassnTyp) return noLabel
      const massnTyp = data.tpopmassnTyp.find(e => e.DomainCode === row.TPopMassnTyp)
      if (!massnTyp) return noLabel
      const massnTypTxt = massnTyp.DomainTxt || noLabel
      return `${row.TPopMassnJahr || `(kein Jahr)`}: ${massnTypTxt || `(kein Typ)`}`
    },
    folderLabel(node) {
      if (!node || !node.childrenFilteredByLabel) return `Massnahmen`
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
      if (!row || !data.zielTyp) return noLabel
      const zielTyp = data.zielTyp.find(e => e.DomainCode === row.ZielTyp)
      if (!zielTyp) return noLabel
      const zielTypTxt = zielTyp.DomainTxt || noLabel
      return `${row.ZielJahr || `(kein Jahr)`}: ${row.ZielBezeichnung} (${zielTypTxt})`
    },
    folderLabel(node) {
      if (!node || !node.childrenFilteredByLabel) return `AP-Ziele`
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
      if (!row) return noLabel
      return `${row.ZielBerJahr || `(kein Jahr)`}: ${row.ZielBerErreichung || `(keine Entwicklung)`}`
    },
    folderLabel(node) {
      if (!node || !node.childrenFilteredByLabel) return `Berichte`
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
      if (!row) return noLabel
      return `${row.BeurteilTxt || `(nicht beurteilt)`}: ${row.ErfkritTxt || `(keine Kriterien erfasst)`}`
    },
    folderLabel(node) {
      if (!node || !node.childrenFilteredByLabel) return `AP-Erfolgskriterien`
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
      if (!row) return noLabel
      return row.JBerJahr || `(kein Jahr)`
    },
    folderLabel(node) {
      if (!node || !node.childrenFilteredByLabel) return `AP-Berichte`
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
      if (!row) return noLabel
      return row.JbuJahr || noLabel
    },
    folderLabel(node) {
      if (!node || !node.childrenFilteredByLabel) return `AP-Berichte`
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
      if (!row) return noLabel
      return `${row.BerJahr || `(kein Jahr)`}: ${row.BerTitel || `(kein Titel)`}`
    },
    folderLabel(node) {
      if (!node || !node.childrenFilteredByLabel) return `Berichte`
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
      if (!row) return noLabel
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
      if (!node || !node.childrenFilteredByLabel) return `assoziierte Arten`
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
      if (!row) return noLabel
      return `${row.PopBerJahr || `(kein Jahr)`}: ${row.EntwicklungTxt || `(nicht beurteilt)`}`
    },
    folderLabel(node) {
      if (!node || !node.childrenFilteredByLabel) return `Kontroll-Berichte`
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
      if (!row) return noLabel
      return `${row.PopMassnBerJahr || `(kein Jahr)`}: ${row.BeurteilTxt || `(nicht beurteilt)`}`
    },
    folderLabel(node) {
      if (!node || !node.childrenFilteredByLabel) return `Massnahmen-Berichte`
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
      if (!row) return noLabel
      return `${row.TPopBerJahr || `(kein Jahr)`}: ${row.EntwicklungTxt || `(nicht beurteilt)`}`
    },
    folderLabel(node) {
      if (!node || !node.childrenFilteredByLabel) return `Kontroll-Berichte`
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
      if (!row || !data || !data.tpopmassnErfbeurt) return noLabel
      const beurteil = data.tpopmassnErfbeurt.find(e => e.DomainCode === row.TPopMassnBerErfolgsbeurteilung)
      const beurteilTxt = beurteil.DomainTxt || noLabel
      return `${row.TPopMassnBerJahr || `(kein Jahr)`}: ${beurteilTxt || `(keine Beurteilung)`}`
    },
    folderLabel(node) {
      if (!node || !node.childrenFilteredByLabel) return `Massnahmen-Berichte`
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
      if (!row) return noLabel
      return `${row.Datum || `(kein Datum)`}: ${row.Autor || `(kein Autor)`} (${row.Quelle})`
    },
    folderLabel(node) {
      if (!node || !node.childrenFilteredByLabel) return `(kein Name)`
      return node.label
    },
  },
  {
    database: `apflora`,
    tabelleInDb: `beobNichtZuzuordnen`,
    tabelleIdFeld: `NO_NOTE`,
    mutWannFeld: `BeobMutWann`,
    mutWerFeld: `BeobMutWer`,
    rowLabel(row) {
      if (!row) return noLabel
      return `${row.Datum || `(kein Datum)`}: ${row.Autor || `(kein Autor)`} (${row.Quelle})`
    },
    folderLabel(node) {
      if (!node || !node.childrenFilteredByLabel) return `(kein Name)`
      return node.folderLabel
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
      if (!row) return noLabel
      return `${row.Datum || `(kein Datum)`}: ${row.Autor || `(kein Autor)`} (${row.Quelle})`
    },
    folderLabel(node) {
      if (!node || !node.childrenFilteredByLabel) return `(kein Name)`
      return node.folderLabel
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
      if (!row) return noLabel
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
      if (!row) return noLabel
      return `${row.Datum || `(kein Datum)`}: ${row.Autor || `(kein Autor)`} (${row.Quelle})`
    },
  },
]
