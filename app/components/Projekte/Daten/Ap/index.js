import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import mobX from 'mobx'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import AutoComplete from '../../../shared/Autocomplete'
import RadioButtonGroup from '../../../shared/RadioButtonGroup'
import LabelWithPopover from '../../../shared/LabelWithPopover'
import MyTextField from '../../../shared/TextField'
import updatePropertyHOC from '../../../shared/updatePropertyHOC'
import styles from './styles.css'

const Ap = class Ap extends Component { // eslint-disable-line react/prefer-stateless-function

  /*
  constructor() {
    super()
  }*/

  componentDidMount() {
    // fetch dropdown data
    const { store } = this.props
    store.fetchAeEigenschaften()
    store.fetchApStatus()
    store.fetchApUmsetzung()
    store.fetchAdresse()
  }

  render() {
    const { store, updateProperty } = this.props
    const aeEigenschaften = mobX.toJS(store.data.aeEigenschaften)
    const apStati = mobX.toJS(store.data.apStatus)
    const apUmsetzungen = mobX.toJS(store.data.apUmsetzung)
    const adressen = mobX.toJS(store.data.adresse)
    adressen.unshift({
      id: null,
      AdrName: ``,
    })
    const ApArtId = (
      store.data.activeDataset
      && store.data.activeDataset.row
      && store.data.activeDataset.row.ApArtId ?
      store.data.activeDataset.row.ApArtId :
      null
    )
    let artwert = ``
    if (ApArtId && aeEigenschaften.length > 0) {
      const aeEigenschaftenRow = aeEigenschaften.find(e => e.id === ApArtId)
      artwert = aeEigenschaftenRow.artwert
    }
    return (
      <div className={styles.container}>
        <AutoComplete
          label="Art"
          fieldName="ApArtId"
          value={ApArtId}
          dataSource={aeEigenschaften}
          updateProperty={updateProperty}
        />
        <div className={styles.fieldContainer}>
          <LabelWithPopover label="Aktionsplan">
            <div className={styles.labelPopoverTitleRow}>
              Legende
            </div>
            <div className={styles.labelPopoverContentRow}>
              <div className={styles.labelPopoverRowColumnLeft}>
                keiner:
              </div>
              <div className={styles.labelPopoverRowColumnRight}>
                kein Aktionsplan vorgesehen
              </div>
            </div>
            <div className={styles.labelPopoverContentRow}>
              <div className={styles.labelPopoverRowColumnLeft}>
                erstellt:
              </div>
              <div className={styles.labelPopoverRowColumnRight}>
                Aktionsplan fertig, auf der Webseite der FNS
              </div>
            </div>
          </LabelWithPopover>
          <RadioButtonGroup
            fieldName="ApStatus"
            value={store.data.activeDataset.row.ApStatus}
            dataSource={apStati}
            updateProperty={updateProperty}
          />
        </div>
        <MyTextField
          label="Start im Jahr"
          fieldName="ApJahr"
          value={store.data.activeDataset.row.ApJahr}
          type="number"
          updateProperty={updateProperty}
        />
        <div className={styles.fieldContainer}>
          <LabelWithPopover label="Stand Umsetzung">
            <div className={styles.labelPopoverTitleRow}>
              Legende
            </div>
            <div className={styles.labelPopoverContentRow}>
              <div className={styles.labelPopoverRowColumnLeft}>
                noch keine<br />Umsetzung:
              </div>
              <div className={styles.labelPopoverRowColumnRight}>
                noch keine Massnahmen ausgeführt
              </div>
            </div>
            <div className={styles.labelPopoverContentRow}>
              <div className={styles.labelPopoverRowColumnLeft}>
                in Umsetzung:
              </div>
              <div className={styles.labelPopoverRowColumnRight}>
                bereits Massnahmen ausgeführt (auch wenn AP noch nicht erstellt)
              </div>
            </div>
          </LabelWithPopover>
          <RadioButtonGroup
            fieldName="ApUmsetzung"
            value={store.data.activeDataset.row.ApUmsetzung}
            dataSource={apUmsetzungen}
            updateProperty={updateProperty}
          />
        </div>
        <SelectField
          floatingLabelText="Verantwortlich"
          value={store.data.activeDataset.row.ApBearb || ``}
          autoWidth
          onChange={(e, value) => {
            console.log(`value clicked:`, value)
          }}
        >
          {
            adressen.map((e, index) =>
              <MenuItem value={e.id} primaryText={e.AdrName} key={index} />
            )
          }
        </SelectField>
        <div className={styles.fieldContainer}>
          <TextField
            floatingLabelText="Artwert"
            type="number"
            value={artwert || ``}
            disabled
          />
        </div>
      </div>
    )
  }
}

Ap.propTypes = {
  store: PropTypes.object,
  updateProperty: PropTypes.func,
}

export default inject(`store`)(updatePropertyHOC(observer(Ap)))
