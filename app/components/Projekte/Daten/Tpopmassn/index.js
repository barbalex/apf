import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import sortBy from 'lodash/sortBy'
import RadioButtonGroup from '../../../shared/RadioButtonGroup'
import Label from '../../../shared/Label'
import TextField from '../../../shared/TextField'
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
        <div style={{ height: `55px` }} />
      </div>
    )
  }
}

export default Tpopmassn
