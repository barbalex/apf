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
class Popmassnber extends Component { // eslint-disable-line react/prefer-stateless-function

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
      <div className={styles.container}>
        <FormTitle title="Massnahmen-Bericht Population" />
        <div className={styles.fieldsContainer}>
          <TextField
            label="Jahr"
            fieldName="PopMassnBerJahr"
            value={activeDataset.row.PopMassnBerJahr}
            errorText={activeDataset.valid.PopMassnBerJahr}
            type="number"
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <div className={styles.fieldContainer}>
            <Label label="Entwicklung" />
            <RadioButtonGroup
              fieldName="PopMassnBerErfolgsbeurteilung"
              value={activeDataset.row.PopMassnBerErfolgsbeurteilung}
              errorText={activeDataset.valid.PopMassnBerErfolgsbeurteilung}
              dataSource={tpopmassnErfbeurtWerte}
              updatePropertyInDb={store.updatePropertyInDb}
            />
          </div>
          <TextField
            label="Interpretation"
            fieldName="PopMassnBerTxt"
            value={activeDataset.row.PopMassnBerTxt}
            errorText={activeDataset.valid.PopMassnBerTxt}
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

export default Popmassnber
