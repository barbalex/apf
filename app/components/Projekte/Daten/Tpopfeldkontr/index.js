import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import sortBy from 'lodash/sortBy'
import { Tabs, Tab } from 'material-ui/Tabs'
import RadioButtonGroup from '../../../shared/RadioButtonGroup'
import Label from '../../../shared/Label'
import TextField from '../../../shared/TextField'
import DatePicker from '../../../shared/DatePicker'
import styles from './styles.css'

@inject(`store`)
@observer
class Tpopfeldkontr extends Component { // eslint-disable-line react/prefer-stateless-function

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
        <Tabs>
          <Tab label="Entwicklung">
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
            </div>
          </Tab>
          <Tab label="Biotop">
            <div className={styles.formContainer}>

            </div>
          </Tab>
        </Tabs>
      </div>
    )
  }
}

export default Tpopfeldkontr
