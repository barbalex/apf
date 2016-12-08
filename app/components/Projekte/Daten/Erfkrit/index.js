import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import sortBy from 'lodash/sortBy'
import RadioButtonGroup from '../../../shared/RadioButtonGroup'
import Label from '../../../shared/Label'
import TextField from '../../../shared/TextField'
import FormTitle from '../../../shared/FormTitle'
import styles from './styles.css'

@inject(`store`)
@observer
class Erfkrit extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: PropTypes.object,
  }

  render() {
    const { store } = this.props
    let apErfkritWerte = Array.from(store.table.ap_erfkrit_werte.values())
    apErfkritWerte = sortBy(apErfkritWerte, `BeurteilOrd`)
    apErfkritWerte = apErfkritWerte.map(el => ({
      value: el.BeurteilId,
      label: el.BeurteilTxt,
    }))
    const { activeDataset } = store
    return (
      <div>
        <FormTitle title="Erfolgs-Kriterium" />
        <div className={styles.fieldsContainer}>
          <div className={styles.fieldContainer}>
            <Label label="Beurteilung" />
            <RadioButtonGroup
              fieldName="ErfkritErreichungsgrad"
              value={activeDataset.row.ErfkritErreichungsgrad}
              errorText={activeDataset.valid.ErfkritErreichungsgrad}
              dataSource={apErfkritWerte}
              updatePropertyInDb={store.updatePropertyInDb}
            />
          </div>
          <TextField
            label="Kriterien"
            fieldName="ErfkritTxt"
            value={activeDataset.row.ErfkritTxt}
            errorText={activeDataset.valid.ErfkritTxt}
            type="text"
            multiLine
            fullWidth
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
        </div>
      </div>
    )
  }
}

export default Erfkrit
