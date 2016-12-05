import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import sortBy from 'lodash/sortBy'
import RadioButtonGroup from '../../../shared/RadioButtonGroup'
import Label from '../../../shared/Label'
import TextField from '../../../shared/TextField'
import styles from './styles.css'

@inject(`store`)
@observer
class Popber extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: PropTypes.object,
  }

  render() {
    const { store } = this.props
    const { activeDataset } = store
    let popEntwicklungWerte = Array.from(store.table.pop_entwicklung_werte.values())
    popEntwicklungWerte = sortBy(popEntwicklungWerte, `EntwicklungOrd`)
    popEntwicklungWerte = popEntwicklungWerte.map(el => ({
      value: el.EntwicklungId,
      label: el.EntwicklungTxt,
    }))
    return (
      <div className={styles.container}>
        <TextField
          label="Jahr"
          fieldName="PopBerJahr"
          value={activeDataset.row.PopBerJahr}
          errorText={activeDataset.valid.PopBerJahr}
          type="number"
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <div className={styles.fieldContainer}>
          <Label label="Entwicklung" />
          <RadioButtonGroup
            fieldName="PopBerEntwicklung"
            value={activeDataset.row.PopBerEntwicklung}
            errorText={activeDataset.valid.PopBerEntwicklung}
            dataSource={popEntwicklungWerte}
            updatePropertyInDb={store.updatePropertyInDb}
          />
        </div>
        <TextField
          label="Bemerkungen"
          fieldName="PopBerTxt"
          value={activeDataset.row.PopBerTxt}
          errorText={activeDataset.valid.PopBerTxt}
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

export default Popber
