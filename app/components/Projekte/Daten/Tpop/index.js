import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import TextField from '../../../shared/TextField'
import InfoWithPopover from '../../../shared/InfoWithPopover'
import Status from '../../../shared/Status'
import RadioButton from '../../../shared/RadioButton'
import RadioButtonGroupWithInfo from '../../../shared/RadioButtonGroupWithInfo'
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
    let tpopApBerichtRelevantWerte = Array.from(store.table.tpop_apberrelevant_werte.values())
    tpopApBerichtRelevantWerte = tpopApBerichtRelevantWerte.map(t => ({
      value: t.DomainCode,
      label: t.DomainTxt,
    }))
    const tpopAbBerRelevantInfoPopover = (
      <div>
        <div className={styles.labelPopoverTitleRow}>
          Legende
        </div>
        <div className={styles.labelPopoverContentRow}>
          Dieses Feld möglichst immer ausfüllen.
        </div>
        <div className={styles.labelPopoverContentRow}>
          <div className={styles.labelPopoverRowColumnLeft}>
            nein (historisch):
          </div>
          <div className={styles.labelPopoverRowColumnRight}>
            erloschen, vor 1950 ohne Kontrolle
          </div>
        </div>
        <div className={styles.labelPopoverContentRow}>
          <div className={styles.labelPopoverRowColumnLeft}>
            nein (kein Vorkommen):
          </div>
          <div className={styles.labelPopoverRowColumnRight}>
            {`siehe bei Populationen "überprüft, kein Vorkommen"`}
          </div>
        </div>
      </div>
    )

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
        <Label label="Für AP-Bericht relevant" />
        <RadioButtonGroupWithInfo
          fieldName="TPopApBerichtRelevant"
          value={activeDataset.row.TPopApBerichtRelevant}
          dataSource={tpopApBerichtRelevantWerte}
          updatePropertyInDb={store.updatePropertyInDb}
          popover={tpopAbBerRelevantInfoPopover}
        />
        <div style={{ height: `55px` }} />
      </div>
    )
  }
}

export default Tpop
