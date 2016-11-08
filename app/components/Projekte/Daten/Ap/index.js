import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import mobX from 'mobx'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import AutoComplete from '../../../shared/Autocomplete'
import LabelWithPopover from '../../../shared/LabelWithPopover'
// import UpdatePropertyHOC from '../../../shared/UpdatePropertyHOC'
import styles from './styles.css'

const Pop = class Pop extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor() {
    super()
    this.updateProperty = this.updateProperty.bind(this)
  }

  componentDidMount() {
    // fetch dropdown data
    const { store } = this.props
    store.fetchAeEigenschaften()
    store.fetchApStatus()
    store.fetchApUmsetzung()
    store.fetchAdresse()
  }

  updateProperty(key, value) {
    const { store } = this.props
    // TODO: make this an action
    // that also updates the database
    store.data.activeDataset.row[key] = value
  }

  render() {
    const { store } = this.props
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
          onChange={this.updateProperty}
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
            name="ApStatus"
            valueSelected={store.data.activeDataset.row.ApStatus}
            floatingLabelText="test"
            onChange={(event, value) => {
              // TODO: if clicked element is active value
              // set null
              console.log(`value clicked:`, value)
            }}
          >
            {
              apStati.map((e, index) =>
                <RadioButton
                  value={e.DomainCode}
                  label={e.DomainTxt}
                  key={index}
                />
              )
            }
          </RadioButtonGroup>
        </div>
        <TextField
          floatingLabelText="Start im Jahr"
          type="number"
          value={store.data.activeDataset.row.ApJahr || ``}
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
            name="ApUmsetzung"
            valueSelected={store.data.activeDataset.row.ApUmsetzung}
            floatingLabelText="test"
            onChange={(event, value) => {
              // TODO: if clicked element is active value
              // set null
              console.log(`value clicked:`, value)
            }}
          >
            {
              apUmsetzungen.map((e, index) =>
                <RadioButton
                  value={e.DomainCode}
                  label={e.DomainTxt}
                  key={index}
                />
              )
            }
          </RadioButtonGroup>
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

Pop.propTypes = {
  store: PropTypes.object,
}

export default inject(`store`)(observer(Pop))
