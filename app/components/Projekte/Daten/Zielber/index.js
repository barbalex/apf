import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import sortBy from 'lodash/sortBy'
import RadioButtonGroup from '../../../shared/RadioButtonGroup'
import Label from '../../../shared/Label'
import TextField from '../../../shared/TextField'
import styles from './styles.css'

@inject(`store`)
@observer
class Zielber extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: PropTypes.object,
  }

  render() {
    const { store } = this.props
    const { activeDataset } = store
    return (
      <div className={styles.container}>
        <TextField
          label="Jahr"
          fieldName="ZielBerJahr"
          value={activeDataset.row.ZielBerJahr}
          errorText={activeDataset.valid.ZielBerJahr}
          type="number"
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <TextField
          label="Entwicklung"
          fieldName="ZielBerErreichung"
          value={activeDataset.row.ZielBerErreichung}
          errorText={activeDataset.valid.ZielBerErreichung}
          type="text"
          fullWidth
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <TextField
          label="Bemerkungen"
          fieldName="ZielBerTxt"
          value={activeDataset.row.ZielBerTxt}
          errorText={activeDataset.valid.ZielBerTxt}
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

export default Zielber
