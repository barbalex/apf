import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import styled from 'styled-components'
import filter from 'lodash/filter'
import sortBy from 'lodash/sortBy'

import AutoComplete from '../../shared/Autocomplete'
import RadioButtonGroup from '../../shared/RadioButtonGroup'
import LabelWithPopover from '../../shared/LabelWithPopover'
import TextField from '../../shared/TextField'
import SelectField from '../../shared/SelectField'
import FormTitle from '../../shared/FormTitle'

const Container = styled.div`
  height: 100%;
`
const FieldsContainer = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  overflow-x: auto;
  height: 100%;
  padding-bottom: 95px;
`
const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const LabelPopoverRow = styled.div`
  padding: 2px 5px 2px 5px;
`
const LabelPopoverTitleRow = styled(LabelPopoverRow)`
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background-color: grey;
`
const LabelPopoverContentRow = styled(LabelPopoverRow)`
  display: flex;
  border-color: grey;
  border-width: thin;
  border-style: solid;
  border-top-style: none;
  &:last-child {
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
  }
`
const LabelPopoverRowColumnLeft = styled.div`
  width: 110px;
`
const LabelPopoverRowColumnRight = styled.div`
  padding-left: 5px;
`

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

  get apUmsetzungen() {
    const { store } = this.props
    let apUmsetzungen = Array.from(store.table.ap_umsetzung_werte.values())
    apUmsetzungen = sortBy(apUmsetzungen, `DomainOrd`)
    return apUmsetzungen.map(el => ({
      value: el.DomainCode,
      label: el.DomainTxt,
    }))
  }

  get adressen() {
    const { store } = this.props
    const adressen = sortBy(Array.from(store.table.adresse.values()), `AdrName`)
    adressen.unshift({
      id: null,
      AdrName: ``,
    })
    return adressen
  }

  get apStati() {
    const { store } = this.props
    let apStati = Array.from(store.table.ap_bearbstand_werte.values())
    apStati = sortBy(apStati, `DomainOrd`)
    return apStati.map(el => ({
      value: el.DomainCode,
      label: el.DomainTxt,
    }))
  }

  get apArtId() {
    const { store } = this.props
    const { activeDataset } = store
    return (
      activeDataset
      && activeDataset.row
      && activeDataset.row.ApArtId ?
      activeDataset.row.ApArtId :
      null
    )
  }

  get artList() {
    const { store } = this.props
    const { adb_eigenschaften } = store.table
    const apIds = Array.from(store.table.ap.keys())
    const artList = filter(Array.from(adb_eigenschaften.values()), r =>
      !apIds.includes(r.TaxonomieId) || r.TaxonomieId === this.apArtId
    )
    return sortBy(artList, `Artname`)
  }

  get artValues() {
    const { store } = this.props
    const { adb_eigenschaften } = store.table
    let artwert = `Diese Art hat keinen Artwert`
    let artname = `(kein Name gewählt)`
    if (this.apArtId && adb_eigenschaften.size > 0) {
      const ae = adb_eigenschaften.get(this.apArtId)
      if (ae && ae.Artwert) {
        artwert = ae.Artwert
      }
      if (ae && ae.Artname) {
        artname = ae.Artname
      }
    }
    return {
      artwert,
      artname,
    }
  }

  render() {
    const { store } = this.props
    const { activeDataset } = store

    return (
      <Container>
        <FormTitle title="Art" />
        <FieldsContainer>
          <AutoComplete
            label="Art"
            fieldName="ApArtId"
            value={this.apArtId}
            valueText={this.artValues.artname}
            errorText={activeDataset.valid.ApArtId}
            dataSource={this.artList}
            dataSourceConfig={{
              value: `TaxonomieId`,
              text: `Artname`,
            }}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <FieldContainer>
            <LabelWithPopover label="Aktionsplan">
              <LabelPopoverTitleRow>
                Legende
              </LabelPopoverTitleRow>
              <LabelPopoverContentRow>
                <LabelPopoverRowColumnLeft>
                  keiner:
                </LabelPopoverRowColumnLeft>
                <LabelPopoverRowColumnRight>
                  kein Aktionsplan vorgesehen
                </LabelPopoverRowColumnRight>
              </LabelPopoverContentRow>
              <LabelPopoverContentRow>
                <LabelPopoverRowColumnLeft>
                  erstellt:
                </LabelPopoverRowColumnLeft>
                <LabelPopoverRowColumnRight>
                  Aktionsplan fertig, auf der Webseite der FNS
                </LabelPopoverRowColumnRight>
              </LabelPopoverContentRow>
            </LabelWithPopover>
            <RadioButtonGroup
              fieldName="ApStatus"
              value={activeDataset.row.ApStatus}
              errorText={activeDataset.valid.ApStatus}
              dataSource={this.apStati}
              updatePropertyInDb={store.updatePropertyInDb}
            />
          </FieldContainer>
          <TextField
            label="Start im Jahr"
            fieldName="ApJahr"
            value={activeDataset.row.ApJahr}
            errorText={activeDataset.valid.ApJahr}
            type="number"
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <FieldContainer>
            <LabelWithPopover label="Stand Umsetzung">
              <LabelPopoverTitleRow>
                Legende
              </LabelPopoverTitleRow>
              <LabelPopoverContentRow>
                <LabelPopoverRowColumnLeft>
                  noch keine<br />Umsetzung:
                </LabelPopoverRowColumnLeft>
                <LabelPopoverRowColumnRight>
                  noch keine Massnahmen ausgeführt
                </LabelPopoverRowColumnRight>
              </LabelPopoverContentRow>
              <LabelPopoverContentRow>
                <LabelPopoverRowColumnLeft>
                  in Umsetzung:
                </LabelPopoverRowColumnLeft>
                <LabelPopoverRowColumnRight>
                  bereits Massnahmen ausgeführt (auch wenn AP noch nicht erstellt)
                </LabelPopoverRowColumnRight>
              </LabelPopoverContentRow>
            </LabelWithPopover>
            <RadioButtonGroup
              fieldName="ApUmsetzung"
              value={activeDataset.row.ApUmsetzung}
              errorText={activeDataset.valid.ApUmsetzung}
              dataSource={this.apUmsetzungen}
              updatePropertyInDb={store.updatePropertyInDb}
            />
          </FieldContainer>
          <SelectField
            label="Verantwortlich"
            fieldName="ApBearb"
            value={activeDataset.row.ApBearb}
            errorText={activeDataset.valid.ApBearb}
            dataSource={this.adressen}
            valueProp="AdrId"
            labelProp="AdrName"
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <FieldContainer>
            <TextField
              label="Artwert"
              fieldName="ApJahr"
              value={this.artValues.artwert}
              type="text"
              disabled
            />
          </FieldContainer>
        </FieldsContainer>
      </Container>
    )
  }
}

export default Ap
