/* eslint-disable max-len */

const noLabel = `(kein Name)`

export default [
  {
    database: `apflora`,
    table: `ap`,
    label: `Arten`,
    idField: `ApArtId`,
    parentTable: `projekt`,
    parentIdField: `ProjId`,
    mutWannField: `MutWann`,
    mutWerField: `MutWer`,
  },
  {
    database: `apflora`,
    table: `pop`,
    label: `Populationen`,
    idField: `PopId`,
    parentTable: `ap`,
    parentIdField: `ApArtId`,
    mutWannField: `MutWann`,
    mutWerField: `MutWer`,
  },
  {
    database: `apflora`,
    table: `tpop`,
    label: `Teil-Populationen`,
    idField: `TPopId`,
    parentTable: `pop`,
    parentIdField: `PopId`,
    mutWannField: `MutWann`,
    mutWerField: `MutWer`,
    label_(row) {
      if (!row) return noLabel
      return `${row.TPopNr || `(keine Nr)`}: ${row.TPopFlurname || `(kein Flurname)`}`
    },
  },
  {
    database: `apflora`,
    table: `tpopkontr`,
    label: `Freiwilligen-Kontrollen`,
    idField: `TPopKontrId`,
    parentTable: `tpop`,
    parentIdField: `TPopId`,
    mutWannField: `MutWann`,
    mutWerField: `MutWer`,
    label_(row) {
      if (!row) return noLabel
      if (row.TPopKontrTyp && row.TPopKontrTyp === `"Freiwilligen-Erfolgskontrolle"`) {
        return `${row.TPopKontrJahr || `(kein Jahr)`}`
      }
      return `${row.TPopKontrJahr || `(kein Jahr)`}: ${row.TPopKontrTyp || `(kein Typ)`}`
    },
    folder: {
      label(node) {
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
  },
  {
    database: `apflora`,
    table: `tpopkontrzaehl_einheit_werte`,
    idField: `ZaehleinheitCode`,
    mutWannField: `MutWann`,
    mutWerField: `MutWer`,
  },
  {
    database: `apflora`,
    table: `tpopkontrzaehl`,
    label: `Zählungen`,
    idField: `TPopKontrZaehlId`,
    parentTable: `tpopkontr`,
    parentIdField: `TPopKontrId`,
    mutWannField: `MutWann`,
    mutWerField: `MutWer`,
    label_(row, data) {
      if (!row || !data || !data.tpopkontrzaehlEinheit || !data.tpopkontrzaehlMethode) return noLabel
      const zaehleinheit = data.tpopkontrzaehlEinheit.find(e => e.DomainCode === row.Zaehleinheit)
      if (!zaehleinheit) return noLabel
      const zaehleinheitTxt = zaehleinheit.DomainTxt || noLabel
      const methode = data.tpopkontrzaehlMethode.find(e => e.DomainCode === row.Methode)
      if (!methode) return noLabel
      const methodeTxt = methode.DomainTxt || noLabel
      return `${row.Anzahl || `(keine Anzahl)`} ${zaehleinheitTxt || `(keine Einheit)`} ${methodeTxt || `(keine Methode)`}`
    },
  },
  {
    database: `apflora`,
    table: `tpopmassn`,
    label: `Massnahmen`,
    idField: `TPopMassnId`,
    parentTable: `tpop`,
    parentIdField: `TPopId`,
    mutWannField: `MutWann`,
    mutWerField: `MutWer`,
    label_(row, data) {
      if (!row || !data.tpopmassnTyp) return noLabel
      const massnTyp = data.tpopmassnTyp.find(e => e.DomainCode === row.TPopMassnTyp)
      if (!massnTyp) return noLabel
      const massnTypTxt = massnTyp.DomainTxt || noLabel
      return `${row.TPopMassnJahr || `(kein Jahr)`}: ${massnTypTxt || `(kein Typ)`}`
    },
  },
  {
    database: `apflora`,
    table: `tpopmassn_typ_werte`,
    idField: `MassnTypCode`,
    mutWannField: `MutWann`,
    mutWerField: `MutWer`,
  },
  {
    database: `apflora`,
    table: `popmassn_erfbeurt_werte`,
    idField: `BeurteilId`,
    mutWannField: `MutWann`,
    mutWerField: `MutWer`,
  },
  {
    database: `apflora`,
    table: `tpopmassn_erfbeurt_werte`,
    idField: `BeurteilId`,
    mutWannField: `MutWann`,
    mutWerField: `MutWer`,
  },
  {
    database: `apflora`,
    table: `ziel`,
    label: `AP-Ziele`,
    idField: `ZielId`,
    parentTable: `ap`,
    parentIdField: `ApArtId`,
    mutWannField: `MutWann`,
    mutWerField: `MutWer`,
  },
  {
    database: `apflora`,
    table: `ziel_typ_werte`,
    idField: `ZieltypId`,
    mutWannField: `MutWann`,
    mutWerField: `MutWer`,
  },
  {
    database: `apflora`,
    table: `zielber`,
    label: `Berichte`,
    idField: `ZielBerId`,
    parentTable: `ziel`,
    parentIdField: `ZielId`,
    mutWannField: `MutWann`,
    mutWerField: `MutWer`,
  },
  {
    database: `apflora`,
    table: `erfkrit`,
    label: `AP-Erfolgskriterien`,
    idField: `ErfkritId`,
    parentTable: `ap`,
    parentIdField: `ApArtId`,
    mutWannField: `MutWann`,
    mutWerField: `MutWer`,
  },
  {
    database: `apflora`,
    table: `apber`,
    label: `AP-Berichte`,
    idField: `JBerId`,
    parentTable: `ap`,
    parentIdField: `ApArtId`,
    mutWannField: `MutWann`,
    mutWerField: `MutWer`,
  },
  {
    database: `apflora`,
    table: `apberuebersicht`,
    label: `AP-Berichte`,
    idField: `JbuJahr`,
    parentTable: `projekt`,
    parentIdField: `ProjId`,
    mutWannField: `MutWann`,
    mutWerField: `MutWer`,
  },
  {
    database: `apflora`,
    table: `ber`,
    label: `Berichte`,
    idField: `BerId`,
    parentTable: `ap`,
    parentIdField: `ApArtId`,
    mutWannField: `MutWann`,
    mutWerField: `MutWer`,
  },
  {
    database: `apflora`,
    table: `idealbiotop`,
    label: `Idealbiotop`,
    idField: `IbApArtId`,
    parentTable: `ap`,
    parentIdField: `IbApArtId`,
    mutWannField: `MutWann`,
    mutWerField: `MutWer`,
  },
  {
    database: `apflora`,
    table: `assozart`,
    label: `assoziierte Arten`,
    idField: `AaId`,
    parentTable: `ap`,
    parentIdField: `AaApArtId`,
    mutWannField: `MutWann`,
    mutWerField: `MutWer`,
  },
  {
    database: `apflora`,
    table: `popber`,
    label: `Kontroll-Berichte`,
    idField: `PopBerId`,
    parentTable: `pop`,
    parentIdField: `PopId`,
    mutWannField: `MutWann`,
    mutWerField: `MutWer`,
    label_(row) {
      if (!row) return noLabel
      return `${row.PopBerJahr || `(kein Jahr)`}: ${row.EntwicklungTxt || `(nicht beurteilt)`}`
    },
  },
  {
    database: `apflora`,
    table: `popmassnber`,
    label: `Massnahmen-Berichte`,
    idField: `PopMassnBerId`,
    parentTable: `pop`,
    parentIdField: `PopId`,
    mutWannField: `MutWann`,
    mutWerField: `MutWer`,
    label_(row) {
      if (!row) return noLabel
      return `${row.PopMassnBerJahr || `(kein Jahr)`}: ${row.BeurteilTxt || `(nicht beurteilt)`}`
    },
  },
  {
    database: `apflora`,
    table: `tpopber`,
    label: `Kontroll-Berichte`,
    idField: `TPopBerId`,
    parentTable: `tpop`,
    parentIdField: `TPopId`,
    mutWannField: `MutWann`,
    mutWerField: `MutWer`,
    label_(row) {
      if (!row) return noLabel
      return `${row.TPopBerJahr || `(kein Jahr)`}: ${row.EntwicklungTxt || `(nicht beurteilt)`}`
    },
  },
  {
    database: `apflora`,
    table: `tpopmassnber`,
    label: `Massnahmen-Berichte`,
    idField: `TPopMassnBerId`,
    parentTable: `tpop`,
    parentIdField: `TPopId`,
    mutWannField: `MutWann`,
    mutWerField: `MutWer`,
    label_(row, data) {
      if (!row || !data || !data.tpopmassnErfbeurt) return noLabel
      const beurteil = data.tpopmassnErfbeurt.find(e => e.DomainCode === row.TPopMassnBerErfolgsbeurteilung)
      const beurteilTxt = beurteil.DomainTxt || noLabel
      return `${row.TPopMassnBerJahr || `(kein Jahr)`}: ${beurteilTxt || `(keine Beurteilung)`}`
    },
  },
  {
    database: `apflora`,
    table: `beobzuordnung`,
    idField: `NO_NOTE`,
    parentTable: `tpop`,
    parentIdField: `TPopId`,
    filter(row) {
      return !!row.TPopId
    },
    mutWannField: `BeobMutWann`,
    mutWerField: `BeobMutWer`,
    label_(row) {
      if (!row) return noLabel
      return `${row.Datum || `(kein Datum)`}: ${row.Autor || `(kein Autor)`} (${row.Quelle})`
    },
    folder: {
      label(node) {
        if (!node || !node.childrenFilteredByLabel) return `(kein Name)`
        return node.label
      },
    },
  },
  {
    database: `apflora`,
    table: `beobzuordnung`,
    idField: `NO_NOTE`,
    parentTable: ``,
    parentIdField: `NO_NOTE`,
    filter(row) {
      return row.BeobNichtZuordnen && row.BeobNichtZuordnen === 1
    },
    mutWannField: `BeobMutWann`,
    mutWerField: `BeobMutWer`,
    label_(row) {
      if (!row) return noLabel
      return `${row.Datum || `(kein Datum)`}: ${row.Autor || `(kein Autor)`} (${row.Quelle})`
    },
    folder: {
      name: `beobNichtZuzuordnen`,
      label(node) {
        if (!node || !node.childrenFilteredByLabel) return `(kein Name)`
        return node.folderLabel
        // if (!node.childrenFilteredByLabel && node.label) return node.label
        // return `nicht zuzuordnende Beobachtungen (${node.row.AnzBeobNichtZuzuordnen < 100 ? node.row.AnzBeobNichtZuzuordnen : `neuste 100 von ${node.row.AnzBeobNichtZuzuordnen}`})`
      },
    },
  },
  {
    database: `apflora`,
    table: `beobzuordnung`,
    idField: `NO_NOTE`,
    parentTable: ``,
    parentIdField: `NO_NOTE`,
    filter(row) {
      return !row.TPopId && !(row.BeobNichtZuordnen && row.BeobNichtZuordnen === 1)
    },
    mutWannField: `BeobMutWann`,
    mutWerField: `BeobMutWer`,
    label_(row) {
      if (!row) return noLabel
      return `${row.Datum || `(kein Datum)`}: ${row.Autor || `(kein Autor)`} (${row.Quelle})`
    },
    folder: {
      name: `beobNichtBeurteilt`,
      label(node) {
        if (!node || !node.childrenFilteredByLabel) return `(kein Name)`
        return node.folderLabel
        // if (!node.childrenFilteredByLabel && node.label) return node.label
        // return `nicht beurteilte Beobachtungen (${node.row.AnzBeobNichtBeurteilt < 100 ? node.row.AnzBeobNichtBeurteilt : `neuste 100 von ${node.row.AnzBeobNichtBeurteilt}`})`
      },
    },
  },
  {
    database: `apflora`,
    table: `projekt`,
    label: `Projekte`,
    idField: `ProjId`,
    mutWannField: `MutWann`,
    mutWerField: `MutWer`,
  },
  {
    database: `beob`,
    table: `beob_bereitgestellt`,
    idField: `BeobId`,
    mutWannField: null,
    mutWerField: null,
    label_(row) {
      if (!row) return noLabel
      return `${row.Datum || `(kein Datum)`}: ${row.Autor || `(kein Autor)`} (${row.Quelle})`
    },
  },
  {
    database: `beob`,
    table: `adb_eigenschaften`,
    idField: `TaxonomieId`,
    mutWannField: null,
    mitWerField: null,
  },
  {
    database: `apflora`,
    table: `ap_bearbstand_werte`,
    idField: `DomainCode`,
    mutWannField: `MutWann`,
    mitWerField: `MutWer`,
  },
  {
    database: `apflora`,
    table: `ap_umsetzung_werte`,
    idField: `DomainCode`,
    mutWannField: `MutWann`,
    mitWerField: `MutWer`,
  },
  {
    database: `apflora`,
    table: `adresse`,
    idField: `AdrId`,
    mutWannField: `MutWann`,
    mitWerField: `MutWer`,
  },
  {
    database: `apflora`,
    table: `ap_erfkrit_werte`,
    idField: `BeurteilId`,
    mutWannField: `MutWann`,
    mitWerField: `MutWer`,
  },
]
