import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import filter from 'lodash/filter'
import sortBy from 'lodash/sortBy'
import AutoComplete from '../../../shared/Autocomplete'
import RadioButtonGroup from '../../../shared/RadioButtonGroup'
import LabelWithPopover from '../../../shared/LabelWithPopover'
import TextField from '../../../shared/TextField'
import SelectField from '../../../shared/SelectField'
import styles from './styles.css'

@inject(`store`)
@observer
class Ap extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: PropTypes.object,
  }

  componentDidMount() {
    // fetch dropdown data
    const { store } = this.props
    store.fetchTable(`apflora`, `ap_bearbstand_werte`)
    store.fetchTable(`apflora`, `ap_umsetzung_werte`)
    store.fetchTable(`apflora`, `adresse`)
  }

  render() {
    const { store } = this.props
    const { adb_eigenschaften } = store.table
    const apStati = sortBy(
      Array.from(store.table.ap_bearbstand_werte.values()),
      `DomainOrd`
    )
    const apUmsetzungen = sortBy(
      Array.from(store.table.ap_umsetzung_werte.values()),
      `DomainOrd`
    )
    const adressen = Array.from(store.table.adresse.values())
    adressen.unshift({
      id: null,
      AdrName: ``,
    })
    const { activeDataset } = store
    const ApArtId = (
      activeDataset
      && activeDataset.row
      && activeDataset.row.ApArtId ?
      activeDataset.row.ApArtId :
      null
    )
    let artwert = ``
    if (ApArtId && adb_eigenschaften.size > 0) {
      artwert = adb_eigenschaften.get(ApArtId).Artwert
    }
    const apIds = Array.from(store.table.ap.keys())
    const dataSource = filter(Array.from(adb_eigenschaften.values()), r =>
      !apIds.includes(r.TaxonomieId) || r.TaxonomieId === ApArtId
    )
    const artname = () => {
      let name
      if (ApArtId && adb_eigenschaften.size > 0) {
        name = adb_eigenschaften.get(activeDataset.row.ApArtId).Artname
      }
      return name || ``
    }

    return (
      <div className={styles.container}>
        <AutoComplete
          label="Art"
          fieldName="ApArtId"
          value={ApArtId}
          valueText={artname()}
          errorText={activeDataset.valid.ApArtId}
          dataSource={dataSource}
          updatePropertyInDb={store.updatePropertyInDb}
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
            value={activeDataset.row.ApStatus}
            errorText={activeDataset.valid.ApStatus}
            dataSource={apStati}
            updatePropertyInDb={store.updatePropertyInDb}
          />
        </div>
        <TextField
          label="Start im Jahr"
          fieldName="ApJahr"
          value={activeDataset.row.ApJahr}
          errorText={activeDataset.valid.ApJahr}
          type="number"
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
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
            value={activeDataset.row.ApUmsetzung}
            errorText={activeDataset.valid.ApUmsetzung}
            dataSource={apUmsetzungen}
            updatePropertyInDb={store.updatePropertyInDb}
          />
        </div>
        <SelectField
          label="Verantwortlich"
          fieldName="ApBearb"
          value={activeDataset.row.ApBearb}
          errorText={activeDataset.valid.ApBearb}
          dataSource={adressen}
          valueProp="AdrId"
          labelProp="AdrName"
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <div className={styles.fieldContainer}>
          <TextField
            label="Artwert"
            fieldName="ApJahr"
            value={artwert}
            type="number"
            disabled
          />
        </div>
      </div>
    )
  }
}

export default Ap
