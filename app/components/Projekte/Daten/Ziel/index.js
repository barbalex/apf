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
class Ziel extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: PropTypes.object,
  }

  render() {
    const { store } = this.props
    const { activeDataset } = store
    let zielTypWerte = Array.from(store.table.ziel_typ_werte.values())
    zielTypWerte = sortBy(zielTypWerte, `ZieltypOrd`)
    zielTypWerte = zielTypWerte.map(el => ({
      value: el.ZieltypId,
      label: el.ZieltypTxt,
    }))
    return (
      <div>
        <FormTitle title="Ziel" />
        <div className={styles.fieldsContainer}>
          <TextField
            label="Jahr"
            fieldName="ZielJahr"
            value={activeDataset.row.ZielJahr}
            errorText={activeDataset.valid.ZielJahr}
            type="number"
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <div className={styles.fieldContainer}>
            <Label label="Zieltyp" />
            <RadioButtonGroup
              fieldName="ZielTyp"
              value={activeDataset.row.ZielTyp}
              errorText={activeDataset.valid.ZielTyp}
              dataSource={zielTypWerte}
              updatePropertyInDb={store.updatePropertyInDb}
            />
          </div>
          <TextField
            label="Ziel"
            fieldName="ZielBezeichnung"
            value={activeDataset.row.ZielBezeichnung}
            errorText={activeDataset.valid.ZielBezeichnung}
            type="text"
            multiLine
            fullWidth
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <div style={{ height: `55px` }} />
        </div>
      </div>
    )
  }
}

export default Ziel
