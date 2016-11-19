import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import mobX from 'mobx'
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
    store.fetchTable(`ap_bearbstand_werte`)
    store.fetchTable(`ap_umsetzung_werte`)
    store.fetchTable(`adresse`)
  }

  render() {
    const { store } = this.props
    const aeEigenschaften = mobX.toJS(store.table.adb_eigenschaften)
    const apStati = mobX.toJS(store.table.ap_bearbstand_werte)
    const apUmsetzungen = mobX.toJS(store.table.ap_umsetzung_werte)
    const adressen = mobX.toJS(store.table.adresse)
    adressen.unshift({
      id: null,
      AdrName: ``,
    })
    const activeNode = store.node.activeNode
    const ApArtId = (
      activeNode
      && activeNode.row
      && activeNode.row.ApArtId ?
      activeNode.row.ApArtId :
      null
    )
    let artwert = ``
    if (ApArtId && aeEigenschaften.length > 0) {
      const aeEigenschaftenRow = aeEigenschaften.find(e => e.id === ApArtId)
      artwert = aeEigenschaftenRow.artwert
    }
    const apNodeIds = getApNodeIds(store.node.activeNode, store.node.nodes)
    const dataSource = aeEigenschaften.filter(r => !apNodeIds.includes(r.id) || r.id === ApArtId)

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
          valueProp="id"
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
