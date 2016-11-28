import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import { toJS } from 'mobx'
import filter from 'lodash/filter'
import sortBy from 'lodash/sortBy'
import AutoComplete from '../../../shared/Autocomplete'
import RadioButtonGroup from '../../../shared/RadioButtonGroup'
import LabelWithPopover from '../../../shared/LabelWithPopover'
import TextField from '../../../shared/TextField'
import SelectField from '../../../shared/SelectField'
import getApNodeIds from '../../../../modules/getApNodeIds'
import styles from './styles.css'

@inject(`store`)
@observer
class Ap extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: PropTypes.object,
  }

  /*
  constructor() {
    super()
  }*/

  componentDidMount() {
    // fetch dropdown data
    const { store } = this.props
    store.fetchTable(`apflora`, `ap_bearbstand_werte`)
    store.fetchTable(`apflora`, `ap_umsetzung_werte`)
    store.fetchTable(`apflora`, `adresse`)
  }

  render() {
    const { store } = this.props
    const aeEigenschaften = toJS(store.table.adb_eigenschaften)
    const apStati = sortBy(
      toJS(store.table.ap_bearbstand_werte).values(),
      `DomainOrd`
    )
    const apUmsetzungen = sortBy(
      toJS(store.table.ap_umsetzung_werte).values(),
      `DomainOrd`
    )
    const adressen = toJS(store.table.adresse)
    adressen.unshift({
      id: null,
      AdrName: ``,
    })
    const activeNode = store.activeDataset
    const ApArtId = (
      activeNode
      && activeNode.row
      && activeNode.row.ApArtId ?
      activeNode.row.ApArtId :
      null
    )
    let artwert = ``
    if (ApArtId && aeEigenschaften.size > 0) {
      artwert = aeEigenschaften.get(ApArtId).Artwert
    }
    const apNodeIds = getApNodeIds(store.activeDataset, store.projektNodes)
    const dataSource = filter(aeEigenschaften.values(), r =>
      !apNodeIds.includes(r.TaxonomieId) || r.TaxonomieId === ApArtId
    )

    return (
      <div className={styles.container}>
        <AutoComplete
          label="Art"
          fieldName="ApArtId"
          value={ApArtId}
          valueText={store.table.artname}
          errorText={activeNode.valid.ApArtId}
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
            value={activeNode.row.ApStatus}
            errorText={activeNode.valid.ApStatus}
            dataSource={apStati}
            updatePropertyInDb={store.updatePropertyInDb}
          />
        </div>
        <TextField
          label="Start im Jahr"
          fieldName="ApJahr"
          value={activeNode.row.ApJahr}
          errorText={activeNode.valid.ApJahr}
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
            value={activeNode.row.ApUmsetzung}
            errorText={activeNode.valid.ApUmsetzung}
            dataSource={apUmsetzungen}
            updatePropertyInDb={store.updatePropertyInDb}
          />
        </div>
        <SelectField
          label="Verantwortlich"
          fieldName="ApBearb"
          value={activeNode.row.ApBearb}
          errorText={activeNode.valid.ApBearb}
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
