import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import sortBy from 'lodash/sortBy'
import { Tabs, Tab } from 'material-ui/Tabs'
import AutoComplete from 'material-ui/AutoComplete'
import RadioButtonGroup from '../../../shared/RadioButtonGroup'
import Label from '../../../shared/Label'
import TextField from '../../../shared/TextField'
import SelectField from '../../../shared/SelectField'
import RadioButtonGroupWithInfo from '../../../shared/RadioButtonGroupWithInfo'
import StringToCopy from '../../../shared/StringToCopy'
import FormTitle from '../../../shared/FormTitle'
import YearDatePair from '../../../shared/YearDatePair'
import styles from './styles.css'

@inject(`store`)
@observer
class Tpopfeldkontr extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: PropTypes.object,
  }

  constructor() {
    super()
    this.onChangeTab = this.onChangeTab.bind(this)
  }

  onChangeTab(value) {
    const { store } = this.props
    store.setUrlQuery(`feldkontrTab`, value)
  }

  render() {
    const { store } = this.props
    const { activeDataset } = store
    const tpopkontrTypWerte = [{
      value: `Ausgangszustand`,
      label: `Ausgangszustand`,
    }, {
      value: `Zwischenbeurteilung`,
      label: `Zwischenbeurteilung`,
    }]
    const adressen = Array.from(store.table.adresse.values())
    adressen.unshift({
      id: null,
      AdrName: ``,
    })
    const entwicklungPopover = (
      <div>
        <div className={styles.labelPopoverTitleRow}>
          Legende
        </div>
        <div className={styles.labelPopoverContentRow}>
          Im 1. Jahr der Beobachtung die Entwicklung an der Massnahme beurteilen, nachher an vorhergehenden EK.
        </div>
        <div className={styles.labelPopoverContentRow}>
          <div className={styles.labelPopoverRowColumnLeft}>
            {`zunehmend:`}
          </div>
          <div className={styles.labelPopoverRowColumnRight}>
            {`> 10% Zunahme`}
          </div>
        </div>
        <div className={styles.labelPopoverContentRow}>
          <div className={styles.labelPopoverRowColumnLeft}>
            stabil:
          </div>
          <div className={styles.labelPopoverRowColumnRight}>
            {`± 10%`}
          </div>
        </div>
        <div className={styles.labelPopoverContentRow}>
          <div className={styles.labelPopoverRowColumnLeft}>
            abnehmend:
          </div>
          <div className={styles.labelPopoverRowColumnRight}>
            {`> 10% Abnahme`}
          </div>
        </div>
        <div className={styles.labelPopoverContentRow}>
          <div className={styles.labelPopoverRowColumnLeft}>
            erloschen / nicht etabliert:
          </div>
          <div className={styles.labelPopoverRowColumnRight}>
            {`nach 2 aufeinander folgenden Kontrollen ohne Funde oder nach Einschätzung AP-VerantwortlicheR`}
          </div>
        </div>
        <div className={styles.labelPopoverContentRow}>
          <div className={styles.labelPopoverRowColumnLeft}>
            unsicher:
          </div>
          <div className={styles.labelPopoverRowColumnRight}>
            {`keine Funde aber noch nicht erloschen (nach zwei Kontrollen ohne Funde kann Status erloschen/nicht etabliert gewählt werden)`}
          </div>
        </div>
      </div>
    )
    // get entwicklungWerte
    let tpopEntwicklungWerte = Array.from(store.table.tpop_entwicklung_werte.values())
    tpopEntwicklungWerte = sortBy(tpopEntwicklungWerte, `EntwicklungOrd`)
    tpopEntwicklungWerte = tpopEntwicklungWerte.map(el => ({
      value: el.EntwicklungCode,
      label: el.EntwicklungTxt,
    }))
    // prepare lr
    const lrArray = Array.from(store.table.adb_lr.values())
    const lr = lrArray.map(e => e.Einheit.replace(/  +/g, ` `)) // eslint-disable-line no-regex-spaces
    // prepare tpopkontr_idbiotuebereinst_werte
    let idbiotopuebereinstWerte = Array.from(store.table.tpopkontr_idbiotuebereinst_werte.values())
    idbiotopuebereinstWerte = sortBy(idbiotopuebereinstWerte, `DomainOrd`)
    idbiotopuebereinstWerte = idbiotopuebereinstWerte.map(el => ({
      value: el.DomainCode,
      label: el.DomainTxt,
    }))
    const tab = store.urlQuery.feldkontrTab || `entwicklung`

    return (
      <div className={styles.container}>
        <FormTitle title="Feld-Kontrolle" />
        <div className={styles.fieldsContainer}>
          <Tabs
            value={tab}
            onChange={this.onChangeTab}
          >
            <Tab
              label="Entwicklung"
              value="entwicklung"
            >
              <div className={styles.formContainer}>
                <YearDatePair
                  yearLabel="Jahr"
                  yearFieldName="TPopKontrJahr"
                  yearValue={activeDataset.row.TPopKontrJahr}
                  yearErrorText={activeDataset.valid.TPopKontrJahr}
                  dateLabel="Datum"
                  dateFieldName="TPopKontrDatum"
                  dateValue={activeDataset.row.TPopKontrDatum}
                  dateErrorText={activeDataset.valid.TPopKontrDatum}
                  updateProperty={store.updateProperty}
                  updatePropertyInDb={store.updatePropertyInDb}
                />
                <Label label="Kontrolltyp" />
                <RadioButtonGroup
                  fieldName="TPopKontrTyp"
                  value={activeDataset.row.TPopKontrTyp}
                  errorText={activeDataset.valid.TPopKontrTyp}
                  dataSource={tpopkontrTypWerte}
                  updatePropertyInDb={store.updatePropertyInDb}
                />
                <SelectField
                  label="BearbeiterIn"
                  fieldName="TPopKontrBearb"
                  value={activeDataset.row.TPopKontrBearb}
                  errorText={activeDataset.valid.TPopKontrBearb}
                  dataSource={adressen}
                  valueProp="AdrId"
                  labelProp="AdrName"
                  updatePropertyInDb={store.updatePropertyInDb}
                />
                <TextField
                  label="Anzahl Jungpflanzen"
                  fieldName="TPopKontrJungpfl"
                  value={activeDataset.row.TPopKontrJungpfl}
                  errorText={activeDataset.valid.TPopKontrJungpfl}
                  type="number"
                  updateProperty={store.updateProperty}
                  updatePropertyInDb={store.updatePropertyInDb}
                />
                <TextField
                  label="Vitalität"
                  fieldName="TPopKontrVitalitaet"
                  value={activeDataset.row.TPopKontrVitalitaet}
                  errorText={activeDataset.valid.TPopKontrVitalitaet}
                  type="text"
                  updateProperty={store.updateProperty}
                  updatePropertyInDb={store.updatePropertyInDb}
                />
                <TextField
                  label="Überlebensrate"
                  fieldName="TPopKontrUeberleb"
                  value={activeDataset.row.TPopKontrUeberleb}
                  errorText={activeDataset.valid.TPopKontrUeberleb}
                  type="number"
                  updateProperty={store.updateProperty}
                  updatePropertyInDb={store.updatePropertyInDb}
                />
                <Label label="Entwicklung" />
                <RadioButtonGroupWithInfo
                  fieldName="TPopKontrEntwicklung"
                  value={activeDataset.row.TPopKontrEntwicklung}
                  dataSource={tpopEntwicklungWerte}
                  updatePropertyInDb={store.updatePropertyInDb}
                  popover={entwicklungPopover}
                />
                <TextField
                  label="Ursachen"
                  fieldName="TPopKontrUrsach"
                  value={activeDataset.row.TPopKontrUrsach}
                  errorText={activeDataset.valid.TPopKontrUrsach}
                  hintText="Standort: ..., Klima: ..., anderes: ..."
                  type="text"
                  multiLine
                  fullWidth
                  updateProperty={store.updateProperty}
                  updatePropertyInDb={store.updatePropertyInDb}
                />
                <TextField
                  label="Erfolgsbeurteilung"
                  fieldName="TPopKontrUrteil"
                  value={activeDataset.row.TPopKontrUrteil}
                  errorText={activeDataset.valid.TPopKontrUrteil}
                  type="text"
                  multiLine
                  fullWidth
                  updateProperty={store.updateProperty}
                  updatePropertyInDb={store.updatePropertyInDb}
                />
                <TextField
                  label="Änderungs-Vorschläge Umsetzung"
                  fieldName="TPopKontrAendUms"
                  value={activeDataset.row.TPopKontrAendUms}
                  errorText={activeDataset.valid.TPopKontrAendUms}
                  type="text"
                  multiLine
                  fullWidth
                  updateProperty={store.updateProperty}
                  updatePropertyInDb={store.updatePropertyInDb}
                />
                <TextField
                  label="Änderungs-Vorschläge Kontrolle"
                  fieldName="TPopKontrAendKontr"
                  value={activeDataset.row.TPopKontrAendKontr}
                  errorText={activeDataset.valid.TPopKontrAendKontr}
                  type="text"
                  multiLine
                  fullWidth
                  updateProperty={store.updateProperty}
                  updatePropertyInDb={store.updatePropertyInDb}
                />
                <TextField
                  label="Bemerkungen"
                  fieldName="TPopKontrTxt"
                  value={activeDataset.row.TPopKontrTxt}
                  errorText={activeDataset.valid.TPopKontrTxt}
                  type="text"
                  multiLine
                  fullWidth
                  updateProperty={store.updateProperty}
                  updatePropertyInDb={store.updatePropertyInDb}
                />
                <Label label="GUID" />
                <StringToCopy text={activeDataset.row.TPopKontrGuid} />
                <div style={{ height: `55px` }} ></div>
              </div>
            </Tab>
            <Tab
              label="Biotop"
              value="biotop"
            >
              <div className={styles.formContainer}>
                <TextField
                  label="Fläche"
                  fieldName="TPopKontrFlaeche"
                  value={activeDataset.row.TPopKontrFlaeche}
                  errorText={activeDataset.valid.TPopKontrFlaeche}
                  type="number"
                  updateProperty={store.updateProperty}
                  updatePropertyInDb={store.updatePropertyInDb}
                />
                <div className={styles.section}>Vegetation</div>
                <AutoComplete
                  floatingLabelText="Lebensraum nach Delarze"
                  openOnFocus
                  fullWidth
                  searchText={activeDataset.row.TPopKontrLeb || ``}
                  errorText={activeDataset.valid.TPopKontrLeb}
                  dataSource={lr}
                  filter={AutoComplete.caseInsensitiveFilter}
                  maxSearchResults={20}
                  onNewRequest={val =>
                    store.updatePropertyInDb(`TPopKontrLeb`, val)
                  }
                  onBlur={e =>
                    store.updatePropertyInDb(`TPopKontrLeb`, e.target.value)
                  }
                />
                <AutoComplete
                  floatingLabelText="Umgebung nach Delarze"
                  openOnFocus
                  fullWidth
                  searchText={activeDataset.row.TPopKontrLebUmg || ``}
                  errorText={activeDataset.valid.TPopKontrLebUmg}
                  dataSource={lr}
                  filter={AutoComplete.caseInsensitiveFilter}
                  maxSearchResults={20}
                  onNewRequest={val =>
                    store.updatePropertyInDb(`TPopKontrLebUmg`, val)
                  }
                  onBlur={e =>
                    store.updatePropertyInDb(`TPopKontrLebUmg`, e.target.value)
                  }
                />
                <TextField
                  label="Vegetationstyp"
                  fieldName="TPopKontrVegTyp"
                  value={activeDataset.row.TPopKontrVegTyp}
                  errorText={activeDataset.valid.TPopKontrVegTyp}
                  type="text"
                  updateProperty={store.updateProperty}
                  updatePropertyInDb={store.updatePropertyInDb}
                />
                <TextField
                  label="Konkurrenz"
                  fieldName="TPopKontrKonkurrenz"
                  value={activeDataset.row.TPopKontrKonkurrenz}
                  errorText={activeDataset.valid.TPopKontrKonkurrenz}
                  type="text"
                  updateProperty={store.updateProperty}
                  updatePropertyInDb={store.updatePropertyInDb}
                />
                <TextField
                  label="Moosschicht"
                  fieldName="TPopKontrMoosschicht"
                  value={activeDataset.row.TPopKontrMoosschicht}
                  errorText={activeDataset.valid.TPopKontrMoosschicht}
                  type="text"
                  updateProperty={store.updateProperty}
                  updatePropertyInDb={store.updatePropertyInDb}
                />
                <TextField
                  label="Krautschicht"
                  fieldName="TPopKontrKrautschicht"
                  value={activeDataset.row.TPopKontrKrautschicht}
                  errorText={activeDataset.valid.TPopKontrKrautschicht}
                  type="text"
                  updateProperty={store.updateProperty}
                  updatePropertyInDb={store.updatePropertyInDb}
                />
                <TextField
                  label="Strauchschicht"
                  fieldName="TPopKontrStrauchschicht"
                  value={activeDataset.row.TPopKontrStrauchschicht}
                  errorText={activeDataset.valid.TPopKontrStrauchschicht}
                  type="text"
                  updateProperty={store.updateProperty}
                  updatePropertyInDb={store.updatePropertyInDb}
                />
                <TextField
                  label="Baumschicht"
                  fieldName="TPopKontrBaumschicht"
                  value={activeDataset.row.TPopKontrBaumschicht}
                  errorText={activeDataset.valid.TPopKontrBaumschicht}
                  type="text"
                  updateProperty={store.updateProperty}
                  updatePropertyInDb={store.updatePropertyInDb}
                />
                <div className={styles.section}>Boden</div>
                <TextField
                  label="Typ"
                  fieldName="TPopKontrBodenTyp"
                  value={activeDataset.row.TPopKontrBodenTyp}
                  errorText={activeDataset.valid.TPopKontrBodenTyp}
                  type="text"
                  updateProperty={store.updateProperty}
                  updatePropertyInDb={store.updatePropertyInDb}
                />
                <TextField
                  label="Kalkgehalt"
                  fieldName="TPopKontrBodenKalkgehalt"
                  value={activeDataset.row.TPopKontrBodenKalkgehalt}
                  errorText={activeDataset.valid.TPopKontrBodenKalkgehalt}
                  type="text"
                  updateProperty={store.updateProperty}
                  updatePropertyInDb={store.updatePropertyInDb}
                />
                <TextField
                  label="Durchlässigkeit"
                  fieldName="TPopKontrBodenDurchlaessigkeit"
                  value={activeDataset.row.TPopKontrBodenDurchlaessigkeit}
                  errorText={activeDataset.valid.TPopKontrBodenDurchlaessigkeit}
                  type="text"
                  updateProperty={store.updateProperty}
                  updatePropertyInDb={store.updatePropertyInDb}
                />
                <TextField
                  label="Humusgehalt"
                  fieldName="TPopKontrBodenHumus"
                  value={activeDataset.row.TPopKontrBodenHumus}
                  errorText={activeDataset.valid.TPopKontrBodenHumus}
                  type="text"
                  updateProperty={store.updateProperty}
                  updatePropertyInDb={store.updatePropertyInDb}
                />
                <TextField
                  label="Nährstoffgehalt"
                  fieldName="TPopKontrBodenNaehrstoffgehalt"
                  value={activeDataset.row.TPopKontrBodenNaehrstoffgehalt}
                  errorText={activeDataset.valid.TPopKontrBodenNaehrstoffgehalt}
                  type="text"
                  updateProperty={store.updateProperty}
                  updatePropertyInDb={store.updatePropertyInDb}
                />
                <TextField
                  label="Bodenabtrag"
                  fieldName="TPopKontrBodenAbtrag"
                  value={activeDataset.row.TPopKontrBodenAbtrag}
                  errorText={activeDataset.valid.TPopKontrBodenAbtrag}
                  type="text"
                  updateProperty={store.updateProperty}
                  updatePropertyInDb={store.updatePropertyInDb}
                />
                <TextField
                  label="Wasserhaushalt"
                  fieldName="TPopKontrWasserhaushalt"
                  value={activeDataset.row.TPopKontrWasserhaushalt}
                  errorText={activeDataset.valid.TPopKontrWasserhaushalt}
                  type="text"
                  updateProperty={store.updateProperty}
                  updatePropertyInDb={store.updatePropertyInDb}
                />
                <div className={styles.section}>Beurteilung</div>
                <TextField
                  label="Handlungsbedarf"
                  fieldName="TPopKontrHandlungsbedarf"
                  value={activeDataset.row.TPopKontrHandlungsbedarf}
                  errorText={activeDataset.valid.TPopKontrHandlungsbedarf}
                  type="text"
                  multiline
                  updateProperty={store.updateProperty}
                  updatePropertyInDb={store.updatePropertyInDb}
                />
                <Label label="Übereinstimmung mit Idealbiotop" />
                <RadioButtonGroup
                  fieldName="TPopKontrIdealBiotopUebereinst"
                  value={activeDataset.row.TPopKontrIdealBiotopUebereinst}
                  errorText={activeDataset.valid.TPopKontrIdealBiotopUebereinst}
                  dataSource={idbiotopuebereinstWerte}
                  updatePropertyInDb={store.updatePropertyInDb}
                />
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    )
  }
}

export default Tpopfeldkontr
