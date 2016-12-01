import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import sortBy from 'lodash/sortBy'
import RadioButtonGroup from '../../../shared/RadioButtonGroup'
import Label from '../../../shared/Label'
import TextField from '../../../shared/TextField'
import styles from './styles.css'

@inject(`store`)
@observer
class Apber extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: PropTypes.object,
  }

  componentDidMount() {
    // fetch dropdown data
    const { store } = this.props
    store.fetchTable(`apflora`, `ap_erfkrit_werte`)
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
            fieldName="JberBeurteilung"
            value={activeDataset.row.JberBeurteilung}
            errorText={activeDataset.valid.JberBeurteilung}
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
    )
  }
}

export default Apber
