import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import Linkify from 'react-linkify'
import TextField from '../../../shared/TextField'
import styles from './styles.css'

@inject(`store`)
@observer
class Ber extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: PropTypes.object,
  }

  render() {
    const { store } = this.props
    const { activeDataset } = store
    return (
      <div className={styles.container}>
        <TextField
          label="AutorIn"
          fieldName="BerAutor"
          value={activeDataset.row.BerAutor}
          errorText={activeDataset.valid.BerAutor}
          type="text"
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <TextField
          label="Jahr"
          fieldName="BerJahr"
          value={activeDataset.row.BerJahr}
          errorText={activeDataset.valid.BerJahr}
          type="number"
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <TextField
          label="Titel"
          fieldName="BerTitel"
          value={activeDataset.row.BerTitel}
          errorText={activeDataset.valid.BerTitel}
          type="text"
          multiLine
          fullWidth
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <Linkify>
          <TextField
            label="URL"
            fieldName="BerURL"
            value={activeDataset.row.BerURL}
            errorText={activeDataset.valid.BerURL}
            type="text"
            multiLine
            fullWidth
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
        </Linkify>
        <div style={{ height: `55px` }} />
      </div>
    )
  }
}

export default Ber
