import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import TextField from '../../../shared/TextField'
import InfoWithPopover from '../../../shared/InfoWithPopover'
import Status from '../../../shared/Status'
import RadioButton from '../../../shared/RadioButton'
import Label from '../../../shared/Label'
import styles from './styles.css'

@inject(`store`)
@observer
class Tpop extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: PropTypes.object,
  }

  render() {
    const { store } = this.props
    const { activeDataset } = store
    const apArtId = store.table.pop.get(activeDataset.row.PopId).ApArtId
    const apJahr = store.table.ap.get(apArtId).ApJahr

    return (
      <div className={styles.container}>
        <TextField
          label="Nr."
          fieldName="TPopNr"
          value={activeDataset.row.TPopNr}
          errorText={activeDataset.valid.TPopNr}
          type="number"
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <div className={styles.fieldWithInfoContainer}>
          <TextField
            label="Flurname"
            fieldName="TPopFlurname"
            value={activeDataset.row.TPopFlurname}
            errorText={activeDataset.valid.TPopFlurname}
            type="text"
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <InfoWithPopover>
            <div className={styles.popoverContentRow}>
              Dieses Feld möglichst immer ausfüllen
            </div>
          </InfoWithPopover>
        </div>
        <Status
          apJahr={apJahr}
          herkunftFieldName="TPopHerkunft"
          herkunftValue={activeDataset.row.TPopHerkunft}
          bekanntSeitFieldName="TPopBekanntSeit"
          bekanntSeitValue={activeDataset.row.TPopBekanntSeit}
          bekanntSeitValid={activeDataset.valid.TPopBekanntSeit}
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <Label label="Status unklar" />
        <RadioButton
          fieldName="TPopHerkunftUnklar"
          value={activeDataset.row.TPopHerkunftUnklar}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <TextField
          label="Begründung"
          fieldName="TPopHerkunftUnklarBegruendung"
          value={activeDataset.row.TPopHerkunftUnklarBegruendung}
          errorText={activeDataset.valid.TPopHerkunftUnklarBegruendung}
          type="text"
          multiLine
          fullWidth
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <TextField
          label="X-Koordinaten"
          fieldName="TPopXKoord"
          value={activeDataset.row.TPopXKoord}
          errorText={activeDataset.valid.TPopXKoord}
          type="number"
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <TextField
          label="Y-Koordinaten"
          fieldName="TPopYKoord"
          value={activeDataset.row.TPopYKoord}
          errorText={activeDataset.valid.TPopYKoord}
          type="number"
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <div style={{ height: `55px` }} />
      </div>
    )
  }
}

export default Tpop
