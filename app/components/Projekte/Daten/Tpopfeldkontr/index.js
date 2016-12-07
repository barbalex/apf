import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import { Tabs, Tab } from 'material-ui/Tabs'
import RadioButtonGroup from '../../../shared/RadioButtonGroup'
import Label from '../../../shared/Label'
import TextField from '../../../shared/TextField'
import DatePicker from '../../../shared/DatePicker'
import SelectField from '../../../shared/SelectField'
import RadioButtonGroupWithInfo from '../../../shared/RadioButtonGroupWithInfo'
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
          Dieses Feld möglichst immer ausfüllen.
        </div>
        <div className={styles.labelPopoverContentRow}>
          <div className={styles.labelPopoverRowColumnLeft}>
            nein (historisch):
          </div>
          <div className={styles.labelPopoverRowColumnRight}>
            erloschen, vor 1950 ohne Kontrolle
          </div>
        </div>
        <div className={styles.labelPopoverContentRow}>
          <div className={styles.labelPopoverRowColumnLeft}>
            nein (kein Vorkommen):
          </div>
          <div className={styles.labelPopoverRowColumnRight}>
            {`siehe bei Populationen "überprüft, kein Vorkommen"`}
          </div>
        </div>
      </div>
    )
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
