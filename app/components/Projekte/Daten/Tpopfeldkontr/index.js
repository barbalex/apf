import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import sortBy from 'lodash/sortBy'
import { Tabs, Tab } from 'material-ui/Tabs'
import RadioButtonGroup from '../../../shared/RadioButtonGroup'
import Label from '../../../shared/Label'
import TextField from '../../../shared/TextField'
import DatePicker from '../../../shared/DatePicker'
import SelectField from '../../../shared/SelectField'
import RadioButtonGroupWithInfo from '../../../shared/RadioButtonGroupWithInfo'
import StringToCopy from '../../../shared/StringToCopy'
import styles from './styles.css'

@inject(`store`)
@observer
class Tpopfeldkontr extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: PropTypes.object,
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

    return (
      <div className={styles.container}>
        <Tabs>
          <Tab label="Entwicklung">
            <div className={styles.formContainer}>
              <TextField
                label="Jahr"
                fieldName="TPopKontrJahr"
                value={activeDataset.row.TPopKontrJahr}
                errorText={activeDataset.valid.TPopKontrJahr}
                type="number"
                updateProperty={store.updateProperty}
                updatePropertyInDb={store.updatePropertyInDb}
              />
              <DatePicker
                label="Datum"
                fieldName="TPopKontrDatum"
                value={activeDataset.row.TPopKontrDatum}
                errorText={activeDataset.valid.TPopKontrDatum}
                fullWidth
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
              <div style={{ height: `55px` }} />
            </div>
          </Tab>
          <Tab label="Biotop">
            <div className={styles.formContainer}>

            </div>
          </Tab>
        </Tabs>
      </div>
    )
  }
}

export default Tpopfeldkontr
