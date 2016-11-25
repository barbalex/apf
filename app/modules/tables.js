import { toJS } from 'mobX'

const noLabel = `(kein Name)`

export default [
  {
    database: `apflora`,
    table: `ap`,
    idField: `ApArtId`,
    parentIdField: `ProjId`,
    mutWannField: `MutWann`,
    mutWerField: `MutWer`,
    label(row, data) {
      if (!data || !data.aeEigenschaften) return noLabel
      const ae = toJS(data.aeEigenschaften).get(row.ApArtId)
      if (!ae) return noLabel
      return ae.Artname || noLabel
    },
    folder: {
      label(node) {
        if (!node || !node.childrenFilteredByLabel) return `Arten`
        return `Arten (${node.childrenFilteredByLabel.length})`
      },
    },
  },
  {
    database: `apflora`,
    table: `pop`,
    idField: `PopId`,
    parentIdField: `ApArtId`,
    mutWannField: `MutWann`,
    mutWerField: `MutWer`,
    label(row) {
      if (!row) return noLabel
      return `${row.PopNr || `(keine Nr)`}: ${row.PopName || `(kein Name)`}`
    },
    folder: {
      label(node) {
        if (!node || !node.childrenFilteredByLabel) return `Populationen`
        return `Populationen (${node.childrenFilteredByLabel.length})`
      },
    },
  },
  {
    database: `apflora`,
    table: `tpop`,
    idField: `TPopId`,
    parentIdField: `PopId`,
    mutWannField: `MutWann`,
    mutWerField: `MutWer`,
    label(row) {
      if (!row) return noLabel
      return `${row.TPopNr || `(keine Nr)`}: ${row.TPopFlurname || `(kein Flurname)`}`
    },
    folder: {
      label(node) {
        if (!node || !node.childrenFilteredByLabel) return `Teil-Populationen`
        return `Teil-Populationen (${node.childrenFilteredByLabel.length})`
      },
    },
  },
  {
    database: `apflora`,
    table: `tpopkontr`,
    idField: `TPopKontrId`,
    parentIdField: `TPopId`,
    mutWannField: `MutWann`,
    mutWerField: `MutWer`,
    label(row) {
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
    parentIdField: `Zaehleinheit`,
    mutWannField: `MutWann`,
    mutWerField: `MutWer`,
    label() {
      return `dont need a label`
    },
    folder: {
      label() {
        return `dont need a folder label`
      },
    },
  },
  {
    database: `apflora`,
    table: `tpopkontrzaehl`,
    idField: `TPopKontrZaehlId`,
    parentIdField: `TPopKontrId`,
    mutWannField: `MutWann`,
    mutWerField: `MutWer`,
    label(row, data) {
      if (!row || !data || !data.tpopkontrzaehlEinheit || !data.tpopkontrzaehlMethode) return noLabel
      const zaehleinheit = data.tpopkontrzaehlEinheit.find(e => e.DomainCode === row.Zaehleinheit)
      if (!zaehleinheit) return noLabel
      const zaehleinheitTxt = zaehleinheit.DomainTxt || noLabel
      const methode = data.tpopkontrzaehlMethode.find(e => e.DomainCode === row.Methode)
      if (!methode) return noLabel
      const methodeTxt = methode.DomainTxt || noLabel
      return `${row.Anzahl || `(keine Anzahl)`} ${zaehleinheitTxt || `(keine Einheit)`} ${methodeTxt || `(keine Methode)`}`
    },
    folder: {
      label(node) {
        if (!node || !node.childrenFilteredByLabel) return `Zählungen`
        return `Zählungen (${node.childrenFilteredByLabel.length})`
      },
    },
  },
  {
    database: `apflora`,
    table: `tpopmassn`,
    idField: `TPopMassnId`,
    parentIdField: `TPopId`,
    mutWannField: `MutWann`,
    mutWerField: `MutWer`,
    label(row, data) {
      if (!row || !data.tpopmassnTyp) return noLabel
      const massnTyp = data.tpopmassnTyp.find(e => e.DomainCode === row.TPopMassnTyp)
      if (!massnTyp) return noLabel
      const massnTypTxt = massnTyp.DomainTxt || noLabel
      return `${row.TPopMassnJahr || `(kein Jahr)`}: ${massnTypTxt || `(kein Typ)`}`
    },
    folder: {
      label(node) {
        if (!node || !node.childrenFilteredByLabel) return `Massnahmen`
        return `Massnahmen (${node.childrenFilteredByLabel.length})`
      },
    },
  },
  {
    database: `apflora`,
    table: `tpopmassn_typ_werte`,
    idField: `MassnTypCode`,
    parentIdField: `TPopMassnTyp`,
    mutWannField: `MutWann`,
    mutWerField: `MutWer`,
    label() {
      return `dont need a label`
    },
    folder: {
      label() {
        return `dont need a label`
      },
    },
  },
  {
    database: `apflora`,
    table: `popmassn_erfbeurt_werte`,
    idField: `BeurteilId`,
    parentIdField: `PopMassnBerErfolgsbeurteilung`,
    mutWannField: `MutWann`,
    mutWerField: `MutWer`,
    label() {
      return `dont need a label`
    },
    folder: {
      label() {
        return `dont need a label`
      },
    },
  },
  {
    database: `apflora`,
    table: `tpopmassn_erfbeurt_werte`,
    idField: `BeurteilId`,
    parentIdField: `TPopMassnBerErfolgsbeurteilung`,
    mutWannField: `MutWann`,
    mutWerField: `MutWer`,
    label() {
      return `dont need a label`
    },
    folder: {
      label() {
        return `dont need a label`
      },
    },
  },
  {
    database: `apflora`,
    table: `ziel`,
    idField: `ZielId`,
    parentIdField: `ApArtId`,
    mutWannField: `MutWann`,
    mutWerField: `MutWer`,
    label(row, data) {
      if (!row || !data.zielTyp) return noLabel
      const zielTyp = data.zielTyp.find(e => e.DomainCode === row.ZielTyp)
      if (!zielTyp) return noLabel
      const zielTypTxt = zielTyp.DomainTxt || noLabel
      return `${row.ZielJahr || `(kein Jahr)`}: ${row.ZielBezeichnung} (${zielTypTxt})`
    },
    folder: {
      label(node) {
        if (!node || !node.childrenFilteredByLabel) return `AP-Ziele`
        return `AP-Ziele (${node.childrenFilteredByLabel.length})`
      },
    },
  },
  {
    database: `apflora`,
    table: `ziel_typ_werte`,
    idField: `ZieltypId`,
    parentIdField: `ZielTyp`,
    mutWannField: `MutWann`,
    mutWerField: `MutWer`,
    label() {
      return `dont need a label`
    },
    folder: {
      label() {
        return `dont need a label`
      },
    },
  },
  {
    database: `apflora`,
    table: `zielber`,
    idField: `ZielBerId`,
    parentIdField: `ZielId`,
    mutWannField: `MutWann`,
    mutWerField: `MutWer`,
    label(row) {
      if (!row) return noLabel
      return `${row.ZielBerJahr || `(kein Jahr)`}: ${row.ZielBerErreichung || `(keine Entwicklung)`}`
    },
    folder: {
      label(node) {
        if (!node || !node.childrenFilteredByLabel) return `Berichte`
        return `Berichte (${node.childrenFilteredByLabel.length})`
      },
    },
  },
  {
    database: `apflora`,
    table: `erfkrit`,
    idField: `ErfkritId`,
    parentIdField: `ApArtId`,
    mutWannField: `MutWann`,
    mutWerField: `MutWer`,
    label(row) {
      if (!row) return noLabel
      return `${row.BeurteilTxt || `(nicht beurteilt)`}: ${row.ErfkritTxt || `(keine Kriterien erfasst)`}`
    },
    folder: {
      label(node) {
        if (!node || !node.childrenFilteredByLabel) return `AP-Erfolgskriterien`
        return `AP-Erfolgskriterien (${node.childrenFilteredByLabel.length})`
      },
    },
  },
  {
    database: `apflora`,
    table: `apber`,
    idField: `JBerId`,
    parentIdField: `ApArtId`,
    mutWannField: `MutWann`,
    mutWerField: `MutWer`,
    label(row) {
      if (!row) return noLabel
      return row.JBerJahr || `(kein Jahr)`
    },
    folder: {
      label(node) {
        if (!node || !node.childrenFilteredByLabel) return `AP-Berichte`
        return `AP-Berichte (${node.childrenFilteredByLabel.length})`
      },
    },
  },
  {
    database: `apflora`,
    table: `apberuebersicht`,
    idField: `JbuJahr`,
    parentIdField: `ProjId`,
    mutWannField: `MutWann`,
    mutWerField: `MutWer`,
    label(row) {
      if (!row) return noLabel
      return row.JbuJahr || noLabel
    },
    folder: {
      label(node) {
        if (!node || !node.childrenFilteredByLabel) return `AP-Berichte`
        return `AP-Berichte (${node.childrenFilteredByLabel.length})`
      },
    },
  },
  {
    database: `apflora`,
    table: `ber`,
    idField: `BerId`,
    parentIdField: `ApArtId`,
    mutWannField: `MutWann`,
    mutWerField: `MutWer`,
    label(row) {
      if (!row) return noLabel
      return `${row.BerJahr || `(kein Jahr)`}: ${row.BerTitel || `(kein Titel)`}`
    },
    folder: {
      label(node) {
        if (!node || !node.childrenFilteredByLabel) return `Berichte`
        return `Berichte (${node.childrenFilteredByLabel.length})`
      },
    },
  },
  {
    database: `apflora`,
    table: `idealbiotop`,
    idField: `IbApArtId`,
    parentIdField: `IbApArtId`,
    mutWannField: `MutWann`,
    mutWerField: `MutWer`,
    label() {
      return `Idealbiotop`
    },
  },
  {
    database: `apflora`,
    table: `assozart`,
    idField: `AaId`,
    parentIdField: `AaApArtId`,
    mutWannField: `MutWann`,
    mutWerField: `MutWer`,
    label(row, data) {
      if (!row) return noLabel
      let label = `(keine Art gewählt)`
      if (row.AaApArtId && data && data.aeEigenschaften) {
        const ae = toJS(data.aeEigenschaften).get(row.AaApArtId)
        if (ae) {
          label = ae.Artname
        }
      }
      return label
    },
    folder: {
      label(node) {
        if (!node || !node.childrenFilteredByLabel) return `assoziierte Arten`
        return `assoziierte Arten (${node.childrenFilteredByLabel.length})`
      },
    },
  },
  {
    database: `apflora`,
    table: `popber`,
    idField: `PopBerId`,
    parentIdField: `PopId`,
    mutWannField: `MutWann`,
    mutWerField: `MutWer`,
    label(row) {
      if (!row) return noLabel
      return `${row.PopBerJahr || `(kein Jahr)`}: ${row.EntwicklungTxt || `(nicht beurteilt)`}`
    },
    folder: {
      label(node) {
        if (!node || !node.childrenFilteredByLabel) return `Kontroll-Berichte`
        return `Kontroll-Berichte (${node.childrenFilteredByLabel.length})`
      },
    },
  },
  {
    database: `apflora`,
    table: `popmassnber`,
    idField: `PopMassnBerId`,
    parentIdField: `PopId`,
    mutWannField: `MutWann`,
    mutWerField: `MutWer`,
    label(row) {
      if (!row) return noLabel
      return `${row.PopMassnBerJahr || `(kein Jahr)`}: ${row.BeurteilTxt || `(nicht beurteilt)`}`
    },
    folder: {
      label(node) {
        if (!node || !node.childrenFilteredByLabel) return `Massnahmen-Berichte`
        return `Massnahmen-Berichte (${node.childrenFilteredByLabel.length})`
      },
    },
  },
  {
    database: `apflora`,
    table: `tpopber`,
    idField: `TPopBerId`,
    parentIdField: `TPopId`,
    mutWannField: `MutWann`,
    mutWerField: `MutWer`,
    label(row) {
      if (!row) return noLabel
      return `${row.TPopBerJahr || `(kein Jahr)`}: ${row.EntwicklungTxt || `(nicht beurteilt)`}`
    },
    folder: {
      label(node) {
        if (!node || !node.childrenFilteredByLabel) return `Kontroll-Berichte`
        return `Kontroll-Berichte (${node.childrenFilteredByLabel.length})`
      },
    },
  },
  {
    database: `apflora`,
    table: `tpopmassnber`,
    idField: `TPopMassnBerId`,
    parentIdField: `TPopId`,
    mutWannField: `MutWann`,
    mutWerField: `MutWer`,
    label(row, data) {
      if (!row || !data || !data.tpopmassnErfbeurt) return noLabel
      const beurteil = data.tpopmassnErfbeurt.find(e => e.DomainCode === row.TPopMassnBerErfolgsbeurteilung)
      const beurteilTxt = beurteil.DomainTxt || noLabel
      return `${row.TPopMassnBerJahr || `(kein Jahr)`}: ${beurteilTxt || `(keine Beurteilung)`}`
    },
    folder: {
      label(node) {
        if (!node || !node.childrenFilteredByLabel) return `Massnahmen-Berichte`
        return `Massnahmen-Berichte (${node.childrenFilteredByLabel.length})`
      },
    },
  },
  {
    database: `apflora`,
    table: `beobzuordnung`,
    idField: `NO_NOTE`,
    parentIdField: `TPopId`,
    filter(row) {
      return !!row.TPopId
    },
    mutWannField: `BeobMutWann`,
    mutWerField: `BeobMutWer`,
    label(row) {
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
    parentIdField: `NO_NOTE`,
    filter(row) {
      return row.BeobNichtZuordnen && row.BeobNichtZuordnen === 1
    },
    mutWannField: `BeobMutWann`,
    mutWerField: `BeobMutWer`,
    label(row) {
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
    parentIdField: `NO_NOTE`,
    filter(row) {
      return !row.TPopId && !(row.BeobNichtZuordnen && row.BeobNichtZuordnen === 1)
    },
    mutWannField: `BeobMutWann`,
    mutWerField: `BeobMutWer`,
    label(row) {
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
    idField: `ProjId`,
    parentIdField: ``,
    mutWannField: `MutWann`,
    mutWerField: `MutWer`,
    label(row) {
      if (!row) return noLabel
      return row.ProjName || `(kein Name)`
    },
  },
  {
    database: `beob`,
    table: `beob_bereitgestellt`,
    idField: `BeobId`,
    parentIdField: ``,
    mutWannField: null,
    mutWerField: null,
    label(row) {
      if (!row) return noLabel
      return `${row.Datum || `(kein Datum)`}: ${row.Autor || `(kein Autor)`} (${row.Quelle})`
    },
  },
  {
    database: `beob`,
    table: `adb_eigenschaften`,
    idField: `TaxonomieId`,
    parentIdField: `TaxonomieId`,
    mutWannField: null,
    mitWerField: null,
    label(row) {
      return row.Artname
    },
  },
]
