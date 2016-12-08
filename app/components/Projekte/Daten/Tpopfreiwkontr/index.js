import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import RadioButton from '../../../shared/RadioButton'
import Label from '../../../shared/Label'
import TextField from '../../../shared/TextField'
import DatePicker from '../../../shared/DatePicker'
import SelectField from '../../../shared/SelectField'
import StringToCopy from '../../../shared/StringToCopy'
import FormTitle from '../../../shared/FormTitle'
import styles from './styles.css'

@inject(`store`)
@observer
class Tpopfreiwkontr extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: PropTypes.object,
  }

  render() {
    const { store } = this.props
    const { activeDataset } = store
    const adressen = Array.from(store.table.adresse.values())
    adressen.unshift({
      id: null,
      AdrName: ``,
    })

    return (
      <div className={styles.container}>
        <FormTitle title="Freiwilligen-Kontrolle" />
        <div className={styles.fieldsContainer}>
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
          <Label label="Auf Plan eingezeichnet" />
          <RadioButton
            fieldName="TPopKontrPlan"
            value={activeDataset.row.TPopKontrPlan}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <TextField
            label="Überprüfte Fläche in m2"
            fieldName="TPopKontrUebFlaeche"
            value={activeDataset.row.TPopKontrUebFlaeche}
            errorText={activeDataset.valid.TPopKontrUebFlaeche}
            type="number"
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <TextField
            label="Deckung überprüfte Art (%)"
            fieldName="TPopKontrUebPfl"
            value={activeDataset.row.TPopKontrUebPfl}
            errorText={activeDataset.valid.TPopKontrUebPfl}
            type="number"
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <TextField
            label="Deckung nackter Boden (%)"
            fieldName="TPopKontrNaBo"
            value={activeDataset.row.TPopKontrNaBo}
            errorText={activeDataset.valid.TPopKontrNaBo}
            type="number"
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <Label label="Auch junge Pflanzen vorhanden" />
          <RadioButton
            fieldName="TPopKontrJungPflJN"
            value={activeDataset.row.TPopKontrJungPflJN}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <TextField
            label="Maximum der Vegetationshöhe in cm"
            fieldName="TPopKontrVegHoeMax"
            value={activeDataset.row.TPopKontrVegHoeMax}
            errorText={activeDataset.valid.TPopKontrVegHoeMax}
            type="number"
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <TextField
            label="Mittelwert der Vegetationshöhe in cm"
            fieldName="TPopKontrVegHoeMit"
            value={activeDataset.row.TPopKontrVegHoeMit}
            errorText={activeDataset.valid.TPopKontrVegHoeMit}
            type="number"
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <TextField
            label="Gefährdung"
            fieldName="TPopKontrGefaehrdung"
            value={activeDataset.row.TPopKontrGefaehrdung}
            errorText={activeDataset.valid.TPopKontrGefaehrdung}
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
        </div>
      </div>
    )
  }
}

export default Tpopfreiwkontr
