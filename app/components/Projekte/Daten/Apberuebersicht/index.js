import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import TextField from '../../../shared/TextField'
import FormTitle from '../../../shared/FormTitle'
import styles from './styles.css'

@inject(`store`)
@observer
class Apberuebersicht extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: PropTypes.object,
  }

  render() {
    const { store } = this.props
    const { activeDataset } = store
    return (
      <div className={styles.container}>
        <FormTitle title="AP-Bericht Jahresübersicht" />
        <div className={styles.fieldsContainer}>
          <TextField
            label="Jahr"
            fieldName="JbuJahr"
            value={activeDataset.row.JbuJahr}
            errorText={activeDataset.valid.JbuJahr}
            type="number"
            fullWidth={false}
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <TextField
            label="Bemerkungen"
            fieldName="JbuBemerkungen"
            value={activeDataset.row.JbuBemerkungen}
            errorText={activeDataset.valid.JbuBemerkungen}
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

export default Apberuebersicht
