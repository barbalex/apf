import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import filter from 'lodash/filter'
import TextField from '../../../shared/TextField'
import AutoComplete from '../../../shared/Autocomplete'
import FormTitle from '../../../shared/FormTitle'
import styles from './styles.css'

@inject(`store`)
@observer
class Assozart extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: PropTypes.object,
  }

  render() {
    const { store } = this.props
    const { adb_eigenschaften } = store.table
    const { activeDataset } = store
    const sisfNrOfAp = Array.from(store.table.assozart.values()).filter(a =>
      a.AaApArtId === activeDataset.row.AaApArtId
    )
    const dataSource = filter(Array.from(adb_eigenschaften.values()), r =>
      !sisfNrOfAp.includes(r.TaxonomieId) || r.TaxonomieId === activeDataset.row.AaSisfNr
    )
    const artname = () => {
      let name
      if (activeDataset.row.AaSisfNr && adb_eigenschaften.size > 0) {
        name = adb_eigenschaften.get(activeDataset.row.AaSisfNr).Artname
      }
      return name || ``
    }
    return (
      <div className={styles.container}>
        <FormTitle title="assoziierte Art" />
        <div className={styles.fieldsContainer}>
          <AutoComplete
            label="Art"
            fieldName="AaSisfNr"
            value={activeDataset.row.AaSisfNr}
            valueText={artname()}
            errorText={activeDataset.valid.ApArtId}
            dataSource={dataSource}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <TextField
            label="Bemerkungen zur Assoziation"
            fieldName="AaBem"
            value={activeDataset.row.AaBem}
            errorText={activeDataset.valid.AaBem}
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

export default Assozart
