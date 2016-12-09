import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import sortBy from 'lodash/sortBy'
import RadioButtonGroup from '../../../shared/RadioButtonGroup'
import Label from '../../../shared/Label'
import TextField from '../../../shared/TextField'
import FormTitle from '../../../shared/FormTitle'
import SelectField from '../../../shared/SelectField'
import styles from './styles.css'

@inject(`store`)
@observer
class Tpopkontrzaehl extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: PropTypes.object,
  }

  render() {
    const { store } = this.props
    const { activeDataset } = store
    const zaehleinheitWerte = sortBy(
      Array.from(store.table.tpopkontrzaehl_einheit_werte.values()),
      `ZaehleinheitOrd`
    ).map(el => ({
      value: el.ZaehleinheitCode,
      label: el.ZaehleinheitTxt,
    }))
    const methodeWerte = sortBy(
      Array.from(store.table.tpopkontrzaehl_methode_werte.values()),
      `BeurteilOrd`
    ).map(el => ({
      value: el.BeurteilCode,
      label: el.BeurteilTxt,
    }))

    return (
      <div className={styles.container}>
        <FormTitle title="Zählung" />
        <div className={styles.fieldsContainer}>
          <TextField
            label="Anzahl"
            fieldName="Anzahl"
            value={activeDataset.row.Anzahl}
            errorText={activeDataset.valid.Anzahl}
            type="number"
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <SelectField
            label="Einheit"
            fieldName="Zaehleinheit"
            value={activeDataset.row.Zaehleinheit}
            errorText={activeDataset.valid.Zaehleinheit}
            dataSource={zaehleinheitWerte}
            valueProp="value"
            labelProp="label"
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <Label label="Methode" />
          <RadioButtonGroup
            fieldName="Methode"
            value={activeDataset.row.Methode}
            errorText={activeDataset.valid.Methode}
            dataSource={methodeWerte}
            updatePropertyInDb={store.updatePropertyInDb}
          />
        </div>
      </div>
    )
  }
}

export default Tpopkontrzaehl
