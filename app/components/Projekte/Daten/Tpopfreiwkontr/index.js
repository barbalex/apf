import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import sortBy from 'lodash/sortBy'
import { Tabs, Tab } from 'material-ui/Tabs'
import AutoComplete from 'material-ui/AutoComplete'
import RadioButtonGroup from '../../../shared/RadioButtonGroup'
import Label from '../../../shared/Label'
import TextField from '../../../shared/TextField'
import DatePicker from '../../../shared/DatePicker'
import SelectField from '../../../shared/SelectField'
import StringToCopy from '../../../shared/StringToCopy'
import styles from './styles.css'

@inject(`store`)
@observer
class Tpopfreiwkontr extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: PropTypes.object,
  }

  render() {
    const { store } = this.props
    const { activeDataset } = store
    const adressen = Array.from(store.table.adresse.values())
    adressen.unshift({
      id: null,
      AdrName: ``,
    })

    return (
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <TextField
            label="Jahr"
            fieldName="TPopKontrJahr"
            value={activeDataset.row.TPopKontrJahr}
            errorText={activeDataset.valid.TPopKontrJahr}
            type="number"
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <DatePicker
            label="Datum"
            fieldName="TPopKontrDatum"
            value={activeDataset.row.TPopKontrDatum}
            errorText={activeDataset.valid.TPopKontrDatum}
            fullWidth
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <SelectField
            label="BearbeiterIn"
            fieldName="TPopKontrBearb"
            value={activeDataset.row.TPopKontrBearb}
            errorText={activeDataset.valid.TPopKontrBearb}
            dataSource={adressen}
            valueProp="AdrId"
            labelProp="AdrName"
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <TextField
            label="Bemerkungen"
            fieldName="TPopKontrTxt"
            value={activeDataset.row.TPopKontrTxt}
            errorText={activeDataset.valid.TPopKontrTxt}
            type="text"
            multiLine
            fullWidth
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <TextField
            label="Fläche"
            fieldName="TPopKontrFlaeche"
            value={activeDataset.row.TPopKontrFlaeche}
            errorText={activeDataset.valid.TPopKontrFlaeche}
            type="number"
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <Label label="GUID" />
          <StringToCopy text={activeDataset.row.TPopKontrGuid} />
          <div style={{ height: `55px` }} />
        </div>
      </div>
    )
  }
}

export default Tpopfreiwkontr
