import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import sortBy from 'lodash/sortBy'
import RadioButtonGroup from '../../../shared/RadioButtonGroup'
import Label from '../../../shared/Label'
import DatePicker from '../../../shared/DatePicker'
import TextField from '../../../shared/TextField'
import SelectField from '../../../shared/SelectField'
import RadioButton from '../../../shared/RadioButton'
import styles from './styles.css'

@inject(`store`)
@observer
class Tpopmassn extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: PropTypes.object,
  }

  render() {
    const { store } = this.props
    const { activeDataset } = store
    let tpopMassnTypWerte = Array.from(store.table.tpopmassn_typ_werte.values())
    tpopMassnTypWerte = sortBy(tpopMassnTypWerte, `MassnTypOrd`)
    tpopMassnTypWerte = tpopMassnTypWerte.map(el => ({
      value: el.MassnTypCode,
      label: el.MassnTypTxt,
    }))
    const adressen = Array.from(store.table.adresse.values())
    adressen.unshift({
      id: null,
      AdrName: ``,
    })
    return (
      <div className={styles.container}>
        <TextField
          label="Jahr"
          fieldName="TPopMassnJahr"
          value={activeDataset.row.TPopMassnJahr}
          errorText={activeDataset.valid.TPopMassnJahr}
          type="number"
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <DatePicker
          label="Datum"
          fieldName="TPopMassnDatum"
          value={activeDataset.row.TPopMassnDatum}
          errorText={activeDataset.valid.TPopMassnDatum}
          fullWidth
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <div className={styles.fieldContainer}>
          <Label label="Typ" />
          <RadioButtonGroup
            fieldName="TPopMassnTyp"
            value={activeDataset.row.TPopMassnTyp}
            errorText={activeDataset.valid.TPopMassnTyp}
            dataSource={tpopMassnTypWerte}
            updatePropertyInDb={store.updatePropertyInDb}
          />
        </div>
        <TextField
          label="Massnahme"
          fieldName="TPopMassnTxt"
          value={activeDataset.row.TPopMassnTxt}
          errorText={activeDataset.valid.TPopMassnTxt}
          type="text"
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <SelectField
          label="BearbeiterIn"
          fieldName="TPopMassnBearb"
          value={activeDataset.row.TPopMassnBearb}
          errorText={activeDataset.valid.TPopMassnBearb}
          dataSource={adressen}
          valueProp="AdrId"
          labelProp="AdrName"
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <TextField
          label="Bemerkungen"
          fieldName="TPopMassnBemTxt"
          value={activeDataset.row.TPopMassnBemTxt}
          errorText={activeDataset.valid.TPopMassnBemTxt}
          type="text"
          multiLine
          fullWidth
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <Label label="Plan vorhanden" />
        <RadioButton
          fieldName="TPopMassnPlan"
          value={activeDataset.row.TPopMassnPlan}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <TextField
          label="Plan Bezeichnung"
          fieldName="TPopMassnPlanBez"
          value={activeDataset.row.TPopMassnPlanBez}
          errorText={activeDataset.valid.TPopMassnPlanBez}
          type="text"
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <TextField
          label="Fläche (m2)"
          fieldName="TPopMassnFlaeche"
          value={activeDataset.row.TPopMassnFlaeche}
          errorText={activeDataset.valid.TPopMassnFlaeche}
          type="number"
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <div style={{ height: `55px` }} />
      </div>
    )
  }
}

export default Tpopmassn
