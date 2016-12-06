import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import sortBy from 'lodash/sortBy'
import RadioButtonGroup from '../../../shared/RadioButtonGroup'
import Label from '../../../shared/Label'
import TextField from '../../../shared/TextField'
import styles from './styles.css'

@inject(`store`)
@observer
class Tpopber extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: PropTypes.object,
  }

  render() {
    const { store } = this.props
    const { activeDataset } = store
    let tpopEntwicklungWerte = Array.from(store.table.tpop_entwicklung_werte.values())
    tpopEntwicklungWerte = sortBy(tpopEntwicklungWerte, `EntwicklungOrd`)
    tpopEntwicklungWerte = tpopEntwicklungWerte.map(el => ({
      value: el.EntwicklungCode,
      label: el.EntwicklungTxt,
    }))
    return (
      <div className={styles.container}>
        <TextField
          label="Jahr"
          fieldName="TPopBerJahr"
          value={activeDataset.row.TPopBerJahr}
          errorText={activeDataset.valid.TPopBerJahr}
          type="number"
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <div className={styles.fieldContainer}>
          <Label label="Entwicklung" />
          <RadioButtonGroup
            fieldName="TPopBerEntwicklung"
            value={activeDataset.row.TPopBerEntwicklung}
            errorText={activeDataset.valid.TPopBerEntwicklung}
            dataSource={tpopEntwicklungWerte}
            updatePropertyInDb={store.updatePropertyInDb}
          />
        </div>
        <TextField
          label="Bemerkungen"
          fieldName="TPopBerTxt"
          value={activeDataset.row.TPopBerTxt}
          errorText={activeDataset.valid.TPopBerTxt}
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

export default Tpopber
