import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import sortBy from 'lodash/sortBy'
import RadioButtonGroup from '../../../shared/RadioButtonGroup'
import Label from '../../../shared/Label'
import TextField from '../../../shared/TextField'
import FormTitle from '../../../shared/FormTitle'
import styles from './styles.css'

@inject(`store`)
@observer
class Tpopmassnber extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: PropTypes.object,
  }

  render() {
    const { store } = this.props
    const { activeDataset } = store
    let tpopmassnErfbeurtWerte = Array.from(store.table.tpopmassn_erfbeurt_werte.values())
    tpopmassnErfbeurtWerte = sortBy(tpopmassnErfbeurtWerte, `BeurteilOrd`)
    tpopmassnErfbeurtWerte = tpopmassnErfbeurtWerte.map(el => ({
      value: el.BeurteilId,
      label: el.BeurteilTxt,
    }))
    return (
      <div>
        <FormTitle title="Massnahmen-Bericht Teil-Population" />
        <div className={styles.fieldsContainer}>
          <TextField
            label="Jahr"
            fieldName="TPopMassnBerJahr"
            value={activeDataset.row.TPopMassnBerJahr}
            errorText={activeDataset.valid.TPopMassnBerJahr}
            type="number"
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <div className={styles.fieldContainer}>
            <Label label="Entwicklung" />
            <RadioButtonGroup
              fieldName="TPopMassnBerErfolgsbeurteilung"
              value={activeDataset.row.TPopMassnBerErfolgsbeurteilung}
              errorText={activeDataset.valid.TPopMassnBerErfolgsbeurteilung}
              dataSource={tpopmassnErfbeurtWerte}
              updatePropertyInDb={store.updatePropertyInDb}
            />
          </div>
          <TextField
            label="Interpretation"
            fieldName="TPopMassnBerTxt"
            value={activeDataset.row.TPopMassnBerTxt}
            errorText={activeDataset.valid.TPopMassnBerTxt}
            type="text"
            multiLine
            fullWidth
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <div style={{ height: `55px` }} />
        </div>
      </div>
    )
  }
}

export default Tpopmassnber
