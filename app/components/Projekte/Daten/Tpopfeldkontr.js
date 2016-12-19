import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import sortBy from 'lodash/sortBy'
import { Tabs, Tab } from 'material-ui/Tabs'
import AutoComplete from 'material-ui/AutoComplete'
import styled from 'styled-components'

import RadioButtonGroup from '../../shared/RadioButtonGroup'
import Label from '../../shared/Label'
import TextField from '../../shared/TextField'
import SelectField from '../../shared/SelectField'
import RadioButtonGroupWithInfo from '../../shared/RadioButtonGroupWithInfo'
import StringToCopy from '../../shared/StringToCopy'
import FormTitle from '../../shared/FormTitle'
import YearDatePair from '../../shared/YearDatePair'
import TabTemplate from '../../shared/TabTemplate'

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
const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`
const FieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  > div:first-child {
    > div:first-child {
      display: block !important;
    }
  }
`
const Section = styled.div`
  padding-top: 20px;
  margin-bottom: -7px;
  color: rgba(255, 255, 255, 0.298039);
  font-weight: bold;
  &:after {
    content: ":";
  }
`
const FormContainer = styled.div`
  padding-left: 10px;
  padding-right: 10px;

`


@inject(`store`)
@observer
class Tpopfeldkontr extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: PropTypes.object,
  }

  constructor() {
    super()
    this.onChangeTab = this.onChangeTab.bind(this)
  }

  onChangeTab(value) {
    const { store } = this.props
    store.setUrlQuery(`feldkontrTab`, value)
  }

  get styles() {
    return {
      root: {
        flex: `1 1 100%`,
        minHeight: 0,
        height: `100%`,
        display: `flex`,
        flexDirection: `column`,
      },
      container: {
        flex: `1 1 100%`,
        display: `flex`,
        flexDirection: `column`,
        overflowX: `auto`,
      },
    }
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

  get entwicklungPopover() {
    return (
      <div>
        <LabelPopoverTitleRow>
          Legende
        </LabelPopoverTitleRow>
        <LabelPopoverContentRow>
          Im 1. Jahr der Beobachtung die Entwicklung an der Massnahme beurteilen, nachher an vorhergehenden EK.
        </LabelPopoverContentRow>
        <LabelPopoverContentRow>
          <LabelPopoverRowColumnLeft>
            {`zunehmend:`}
          </LabelPopoverRowColumnLeft>
          <LabelPopoverRowColumnRight>
            {`> 10% Zunahme`}
          </LabelPopoverRowColumnRight>
        </LabelPopoverContentRow>
        <LabelPopoverContentRow>
          <LabelPopoverRowColumnLeft>
            stabil:
          </LabelPopoverRowColumnLeft>
          <LabelPopoverRowColumnRight>
            {`± 10%`}
          </LabelPopoverRowColumnRight>
        </LabelPopoverContentRow>
        <LabelPopoverContentRow>
          <LabelPopoverRowColumnLeft>
            abnehmend:
          </LabelPopoverRowColumnLeft>
          <LabelPopoverRowColumnRight>
            {`> 10% Abnahme`}
          </LabelPopoverRowColumnRight>
        </LabelPopoverContentRow>
        <LabelPopoverContentRow>
          <LabelPopoverRowColumnLeft>
            erloschen / nicht etabliert:
          </LabelPopoverRowColumnLeft>
          <LabelPopoverRowColumnRight>
            {`nach 2 aufeinander folgenden Kontrollen ohne Funde oder nach Einschätzung AP-VerantwortlicheR`}
          </LabelPopoverRowColumnRight>
        </LabelPopoverContentRow>
        <LabelPopoverContentRow>
          <LabelPopoverRowColumnLeft>
            unsicher:
          </LabelPopoverRowColumnLeft>
          <LabelPopoverRowColumnRight>
            {`keine Funde aber noch nicht erloschen (nach zwei Kontrollen ohne Funde kann Status erloschen/nicht etabliert gewählt werden)`}
          </LabelPopoverRowColumnRight>
        </LabelPopoverContentRow>
      </div>
    )
  }

  get tpopEntwicklungWerte() {
    const { store } = this.props
    let tpopEntwicklungWerte = Array.from(store.table.tpop_entwicklung_werte.values())
    tpopEntwicklungWerte = sortBy(tpopEntwicklungWerte, `EntwicklungOrd`)
    return tpopEntwicklungWerte.map(el => ({
      value: el.EntwicklungCode,
      label: el.EntwicklungTxt,
    }))
  }

  get idbiotopuebereinstWerte() {
    const { store } = this.props
    let idbiotopuebereinstWerte = Array.from(store.table.tpopkontr_idbiotuebereinst_werte.values())
    idbiotopuebereinstWerte = sortBy(idbiotopuebereinstWerte, `DomainOrd`)
    return idbiotopuebereinstWerte.map(el => ({
      value: el.DomainCode,
      label: el.DomainTxt,
    }))
  }

  get lr() {
    const { store } = this.props
    const lrArray = Array.from(store.table.adb_lr.values())
    return lrArray.map(e => e.Einheit.replace(/  +/g, ` `)) // eslint-disable-line no-regex-spaces
  }

  render() {
    const { store } = this.props
    const { activeDataset } = store
    const tpopkontrTypWerte = [{
      value: `Ausgangszustand`,
      label: `Ausgangszustand`,
    }, {
      value: `Zwischenbeurteilung`,
      label: `Zwischenbeurteilung`,
    }]
    const tab = store.urlQuery.feldkontrTab || `entwicklung`

    return (
      <Container>
        <FormTitle title="Feld-Kontrolle" />
        <FieldsContainer>
          <Tabs
            style={this.styles.root}
            contentContainerStyle={this.styles.container}
            tabTemplate={TabTemplate}
            value={tab}
            onChange={this.onChangeTab}
          >
            <Tab
              label="Entwicklung"
              value="entwicklung"
            >
              <FormContainer>
                <YearDatePair
                  yearLabel="Jahr"
                  yearFieldName="TPopKontrJahr"
                  yearValue={activeDataset.row.TPopKontrJahr}
                  yearErrorText={activeDataset.valid.TPopKontrJahr}
                  dateLabel="Datum"
                  dateFieldName="TPopKontrDatum"
                  dateValue={activeDataset.row.TPopKontrDatum}
                  dateErrorText={activeDataset.valid.TPopKontrDatum}
                  updateProperty={store.updateProperty}
                  updatePropertyInDb={store.updatePropertyInDb}
                />
                <Label label="Kontrolltyp" />
                <RadioButtonGroup
                  fieldName="TPopKontrTyp"
                  value={activeDataset.row.TPopKontrTyp}
                  errorText={activeDataset.valid.TPopKontrTyp}
                  dataSource={tpopkontrTypWerte}
                  updatePropertyInDb={store.updatePropertyInDb}
                />
                <SelectField
                  label="BearbeiterIn"
                  fieldName="TPopKontrBearb"
                  value={activeDataset.row.TPopKontrBearb}
                  errorText={activeDataset.valid.TPopKontrBearb}
                  dataSource={this.adressen}
                  valueProp="AdrId"
                  labelProp="AdrName"
                  updatePropertyInDb={store.updatePropertyInDb}
                />
                <TextField
                  label="Anzahl Jungpflanzen"
                  fieldName="TPopKontrJungpfl"
                  value={activeDataset.row.TPopKontrJungpfl}
                  errorText={activeDataset.valid.TPopKontrJungpfl}
                  type="number"
                  updateProperty={store.updateProperty}
                  updatePropertyInDb={store.updatePropertyInDb}
                />
                <TextField
                  label="Vitalität"
                  fieldName="TPopKontrVitalitaet"
                  value={activeDataset.row.TPopKontrVitalitaet}
                  errorText={activeDataset.valid.TPopKontrVitalitaet}
                  type="text"
                  updateProperty={store.updateProperty}
                  updatePropertyInDb={store.updatePropertyInDb}
                />
                <TextField
                  label="Überlebensrate"
                  fieldName="TPopKontrUeberleb"
                  value={activeDataset.row.TPopKontrUeberleb}
                  errorText={activeDataset.valid.TPopKontrUeberleb}
                  type="number"
                  updateProperty={store.updateProperty}
                  updatePropertyInDb={store.updatePropertyInDb}
                />
                <Label label="Entwicklung" />
                <RadioButtonGroupWithInfo
                  fieldName="TPopKontrEntwicklung"
                  value={activeDataset.row.TPopKontrEntwicklung}
                  dataSource={this.tpopEntwicklungWerte}
                  updatePropertyInDb={store.updatePropertyInDb}
                  popover={this.entwicklungPopover}
                />
                <TextField
                  label="Ursachen"
                  fieldName="TPopKontrUrsach"
                  value={activeDataset.row.TPopKontrUrsach}
                  errorText={activeDataset.valid.TPopKontrUrsach}
                  hintText="Standort: ..., Klima: ..., anderes: ..."
                  type="text"
                  multiLine
                  fullWidth
                  updateProperty={store.updateProperty}
                  updatePropertyInDb={store.updatePropertyInDb}
                />
                <TextField
                  label="Erfolgsbeurteilung"
                  fieldName="TPopKontrUrteil"
                  value={activeDataset.row.TPopKontrUrteil}
                  errorText={activeDataset.valid.TPopKontrUrteil}
                  type="text"
                  multiLine
                  fullWidth
                  updateProperty={store.updateProperty}
                  updatePropertyInDb={store.updatePropertyInDb}
                />
                <TextField
                  label="Änderungs-Vorschläge Umsetzung"
                  fieldName="TPopKontrAendUms"
                  value={activeDataset.row.TPopKontrAendUms}
                  errorText={activeDataset.valid.TPopKontrAendUms}
                  type="text"
                  multiLine
                  fullWidth
                  updateProperty={store.updateProperty}
                  updatePropertyInDb={store.updatePropertyInDb}
                />
                <TextField
                  label="Änderungs-Vorschläge Kontrolle"
                  fieldName="TPopKontrAendKontr"
                  value={activeDataset.row.TPopKontrAendKontr}
                  errorText={activeDataset.valid.TPopKontrAendKontr}
                  type="text"
                  multiLine
                  fullWidth
                  updateProperty={store.updateProperty}
                  updatePropertyInDb={store.updatePropertyInDb}
                />
                <TextField
                  label="Bemerkungen"
                  fieldName="TPopKontrTxt"
                  value={activeDataset.row.TPopKontrTxt}
                  errorText={activeDataset.valid.TPopKontrTxt}
                  type="text"
                  multiLine
                  fullWidth
                  updateProperty={store.updateProperty}
                  updatePropertyInDb={store.updatePropertyInDb}
                />
                <Label label="GUID" />
                <StringToCopy text={activeDataset.row.TPopKontrGuid} />
                <div style={{ height: `25px` }} ></div>
              </FormContainer>
            </Tab>
            <Tab
              label="Biotop"
              value="biotop"
            >
              <FormContainer>
                <TextField
                  label="Fläche"
                  fieldName="TPopKontrFlaeche"
                  value={activeDataset.row.TPopKontrFlaeche}
                  errorText={activeDataset.valid.TPopKontrFlaeche}
                  type="number"
                  updateProperty={store.updateProperty}
                  updatePropertyInDb={store.updatePropertyInDb}
                />
                <Section>Vegetation</Section>
                <AutoComplete
                  floatingLabelText="Lebensraum nach Delarze"
                  openOnFocus
                  fullWidth
                  searchText={activeDataset.row.TPopKontrLeb || ``}
                  errorText={activeDataset.valid.TPopKontrLeb}
                  dataSource={this.lr}
                  filter={AutoComplete.caseInsensitiveFilter}
                  maxSearchResults={20}
                  onNewRequest={val =>
                    store.updatePropertyInDb(`TPopKontrLeb`, val)
                  }
                  onBlur={e =>
                    store.updatePropertyInDb(`TPopKontrLeb`, e.target.value)
                  }
                />
                <AutoComplete
                  floatingLabelText="Umgebung nach Delarze"
                  openOnFocus
                  fullWidth
                  searchText={activeDataset.row.TPopKontrLebUmg || ``}
                  errorText={activeDataset.valid.TPopKontrLebUmg}
                  dataSource={this.lr}
                  filter={AutoComplete.caseInsensitiveFilter}
                  maxSearchResults={20}
                  onNewRequest={val =>
                    store.updatePropertyInDb(`TPopKontrLebUmg`, val)
                  }
                  onBlur={e =>
                    store.updatePropertyInDb(`TPopKontrLebUmg`, e.target.value)
                  }
                />
                <TextField
                  label="Vegetationstyp"
                  fieldName="TPopKontrVegTyp"
                  value={activeDataset.row.TPopKontrVegTyp}
                  errorText={activeDataset.valid.TPopKontrVegTyp}
                  type="text"
                  updateProperty={store.updateProperty}
                  updatePropertyInDb={store.updatePropertyInDb}
                />
                <TextField
                  label="Konkurrenz"
                  fieldName="TPopKontrKonkurrenz"
                  value={activeDataset.row.TPopKontrKonkurrenz}
                  errorText={activeDataset.valid.TPopKontrKonkurrenz}
                  type="text"
                  updateProperty={store.updateProperty}
                  updatePropertyInDb={store.updatePropertyInDb}
                />
                <TextField
                  label="Moosschicht"
                  fieldName="TPopKontrMoosschicht"
                  value={activeDataset.row.TPopKontrMoosschicht}
                  errorText={activeDataset.valid.TPopKontrMoosschicht}
                  type="text"
                  updateProperty={store.updateProperty}
                  updatePropertyInDb={store.updatePropertyInDb}
                />
                <TextField
                  label="Krautschicht"
                  fieldName="TPopKontrKrautschicht"
                  value={activeDataset.row.TPopKontrKrautschicht}
                  errorText={activeDataset.valid.TPopKontrKrautschicht}
                  type="text"
                  updateProperty={store.updateProperty}
                  updatePropertyInDb={store.updatePropertyInDb}
                />
                <TextField
                  label="Strauchschicht"
                  fieldName="TPopKontrStrauchschicht"
                  value={activeDataset.row.TPopKontrStrauchschicht}
                  errorText={activeDataset.valid.TPopKontrStrauchschicht}
                  type="text"
                  updateProperty={store.updateProperty}
                  updatePropertyInDb={store.updatePropertyInDb}
                />
                <TextField
                  label="Baumschicht"
                  fieldName="TPopKontrBaumschicht"
                  value={activeDataset.row.TPopKontrBaumschicht}
                  errorText={activeDataset.valid.TPopKontrBaumschicht}
                  type="text"
                  updateProperty={store.updateProperty}
                  updatePropertyInDb={store.updatePropertyInDb}
                />
                <Section>Boden</Section>
                <TextField
                  label="Typ"
                  fieldName="TPopKontrBodenTyp"
                  value={activeDataset.row.TPopKontrBodenTyp}
                  errorText={activeDataset.valid.TPopKontrBodenTyp}
                  type="text"
                  updateProperty={store.updateProperty}
                  updatePropertyInDb={store.updatePropertyInDb}
                />
                <TextField
                  label="Kalkgehalt"
                  fieldName="TPopKontrBodenKalkgehalt"
                  value={activeDataset.row.TPopKontrBodenKalkgehalt}
                  errorText={activeDataset.valid.TPopKontrBodenKalkgehalt}
                  type="text"
                  updateProperty={store.updateProperty}
                  updatePropertyInDb={store.updatePropertyInDb}
                />
                <TextField
                  label="Durchlässigkeit"
                  fieldName="TPopKontrBodenDurchlaessigkeit"
                  value={activeDataset.row.TPopKontrBodenDurchlaessigkeit}
                  errorText={activeDataset.valid.TPopKontrBodenDurchlaessigkeit}
                  type="text"
                  updateProperty={store.updateProperty}
                  updatePropertyInDb={store.updatePropertyInDb}
                />
                <TextField
                  label="Humusgehalt"
                  fieldName="TPopKontrBodenHumus"
                  value={activeDataset.row.TPopKontrBodenHumus}
                  errorText={activeDataset.valid.TPopKontrBodenHumus}
                  type="text"
                  updateProperty={store.updateProperty}
                  updatePropertyInDb={store.updatePropertyInDb}
                />
                <TextField
                  label="Nährstoffgehalt"
                  fieldName="TPopKontrBodenNaehrstoffgehalt"
                  value={activeDataset.row.TPopKontrBodenNaehrstoffgehalt}
                  errorText={activeDataset.valid.TPopKontrBodenNaehrstoffgehalt}
                  type="text"
                  updateProperty={store.updateProperty}
                  updatePropertyInDb={store.updatePropertyInDb}
                />
                <TextField
                  label="Bodenabtrag"
                  fieldName="TPopKontrBodenAbtrag"
                  value={activeDataset.row.TPopKontrBodenAbtrag}
                  errorText={activeDataset.valid.TPopKontrBodenAbtrag}
                  type="text"
                  updateProperty={store.updateProperty}
                  updatePropertyInDb={store.updatePropertyInDb}
                />
                <TextField
                  label="Wasserhaushalt"
                  fieldName="TPopKontrWasserhaushalt"
                  value={activeDataset.row.TPopKontrWasserhaushalt}
                  errorText={activeDataset.valid.TPopKontrWasserhaushalt}
                  type="text"
                  updateProperty={store.updateProperty}
                  updatePropertyInDb={store.updatePropertyInDb}
                />
                <Section>Beurteilung</Section>
                <TextField
                  label="Handlungsbedarf"
                  fieldName="TPopKontrHandlungsbedarf"
                  value={activeDataset.row.TPopKontrHandlungsbedarf}
                  errorText={activeDataset.valid.TPopKontrHandlungsbedarf}
                  type="text"
                  multiline
                  updateProperty={store.updateProperty}
                  updatePropertyInDb={store.updatePropertyInDb}
                />
                <Label label="Übereinstimmung mit Idealbiotop" />
                <RadioButtonGroup
                  fieldName="TPopKontrIdealBiotopUebereinst"
                  value={activeDataset.row.TPopKontrIdealBiotopUebereinst}
                  errorText={activeDataset.valid.TPopKontrIdealBiotopUebereinst}
                  dataSource={this.idbiotopuebereinstWerte}
                  updatePropertyInDb={store.updatePropertyInDb}
                />
              </FormContainer>
            </Tab>
          </Tabs>
        </FieldsContainer>
      </Container>
    )
  }
}

export default Tpopfeldkontr
