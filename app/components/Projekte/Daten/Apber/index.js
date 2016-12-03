import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import sortBy from 'lodash/sortBy'
import RadioButtonGroup from '../../../shared/RadioButtonGroup'
import Label from '../../../shared/Label'
import TextField from '../../../shared/TextField'
import DatePicker from '../../../shared/DatePicker'
import SelectField from '../../../shared/SelectField'
import styles from './styles.css'

@inject(`store`)
@observer
class Apber extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: PropTypes.object,
  }

  render() {
    const { store } = this.props
    const { activeDataset } = store
    let apErfkritWerte = Array.from(store.table.ap_erfkrit_werte.values())
    apErfkritWerte = sortBy(apErfkritWerte, `BeurteilOrd`)
    apErfkritWerte = apErfkritWerte.map(el => ({
      value: el.BeurteilId,
      label: el.BeurteilTxt,
    }))
    const veraenGegenVorjahrWerte = [
      { value: `+`, label: `+` },
      { value: `-`, label: `-` },
    ]
    const adressen = Array.from(store.table.adresse.values())
    adressen.unshift({
      id: null,
      AdrName: ``,
    })
    return (
      <div className={styles.container}>
        <TextField
          label="Jahr"
          fieldName="JBerJahr"
          value={activeDataset.row.JBerJahr}
          errorText={activeDataset.valid.JBerJahr}
          type="number"
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <div className={styles.fieldContainer}>
          <Label label="Beurteilung" />
          <RadioButtonGroup
            fieldName="JBerBeurteilung"
            value={activeDataset.row.JBerBeurteilung}
            errorText={activeDataset.valid.JBerBeurteilung}
            dataSource={apErfkritWerte}
            updatePropertyInDb={store.updatePropertyInDb}
          />
        </div>
        <div className={styles.fieldContainer}>
          <Label label="Veränderung zum Vorjahr" />
          <RadioButtonGroup
            fieldName="JBerVeraenGegenVorjahr"
            value={activeDataset.row.JBerVeraenGegenVorjahr}
            errorText={activeDataset.valid.JBerVeraenGegenVorjahr}
            dataSource={veraenGegenVorjahrWerte}
            updatePropertyInDb={store.updatePropertyInDb}
          />
        </div>
        <TextField
          label="Analyse"
          fieldName="JBerAnalyse"
          value={activeDataset.row.JBerAnalyse}
          errorText={activeDataset.valid.JBerAnalyse}
          type="text"
          multiLine
          fullWidth
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <TextField
          label="Konsequenzen Umsetzung"
          fieldName="JBerUmsetzung"
          value={activeDataset.row.JBerUmsetzung}
          errorText={activeDataset.valid.JBerUmsetzung}
          type="text"
          multiLine
          fullWidth
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <TextField
          label="Konsequenzen Erfolgskontrolle"
          fieldName="JBerErfko"
          value={activeDataset.row.JBerErfko}
          errorText={activeDataset.valid.JBerErfko}
          type="text"
          multiLine
          fullWidth
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <TextField
          label="Bemerkungen zum Aussagebereich A (neue Biotope)"
          fieldName="JBerATxt"
          value={activeDataset.row.JBerATxt}
          errorText={activeDataset.valid.JBerATxt}
          type="text"
          multiLine
          fullWidth
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <TextField
          label="Bemerkungen zum Aussagebereich B (Optimierung Biotope)"
          fieldName="JBerBTxt"
          value={activeDataset.row.JBerBTxt}
          errorText={activeDataset.valid.JBerBTxt}
          type="text"
          multiLine
          fullWidth
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <TextField
          label="Bemerkungen zum Aussagebereich C (Optimierung Massnahmen)"
          fieldName="JBerCTxt"
          value={activeDataset.row.JBerCTxt}
          errorText={activeDataset.valid.JBerCTxt}
          type="text"
          multiLine
          fullWidth
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <TextField
          label="Bemerkungen zum Aussagebereich D"
          fieldName="JBerDTxt"
          value={activeDataset.row.JBerDTxt}
          errorText={activeDataset.valid.JBerDTxt}
          type="text"
          multiLine
          fullWidth
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <DatePicker
          label="Datum"
          fieldName="JBerDatum"
          value={activeDataset.row.JBerDatum}
          errorText={activeDataset.valid.JBerDatum}
          fullWidth
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <SelectField
          label="BearbeiterIn"
          fieldName="JBerBearb"
          value={activeDataset.row.JBerBearb}
          errorText={activeDataset.valid.JBerBearb}
          dataSource={adressen}
          valueProp="AdrId"
          labelProp="AdrName"
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <div style={{ height: `55px` }} />
      </div>
    )
  }
}

export default Apber
