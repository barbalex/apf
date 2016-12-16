import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import sortBy from 'lodash/sortBy'
import AutoComplete from 'material-ui/AutoComplete'
import styled from 'styled-components'

import TextField from '../../shared/TextField'
import InfoWithPopover from '../../shared/InfoWithPopover'
import Status from '../../shared/Status'
import RadioButton from '../../shared/RadioButton'
import RadioButtonGroupWithInfo from '../../shared/RadioButtonGroupWithInfo'
import Label from '../../shared/Label'
import FormTitle from '../../shared/FormTitle'

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
      width: 170px;
    `
    const LabelPopoverRowColumnRight = styled.div`
      padding-left: 5px;
    `
    const tpopAbBerRelevantInfoPopover = (
      <Container>
        <LabelPopoverTitleRow>
          Legende
        </LabelPopoverTitleRow>
        <LabelPopoverContentRow>
          Dieses Feld möglichst immer ausfüllen.
        </LabelPopoverContentRow>
        <LabelPopoverContentRow>
          <LabelPopoverRowColumnLeft>
            nein (historisch):
          </LabelPopoverRowColumnLeft>
          <LabelPopoverRowColumnRight>
            erloschen, vor 1950 ohne Kontrolle
          </LabelPopoverRowColumnRight>
        </LabelPopoverContentRow>
        <LabelPopoverContentRow>
          <LabelPopoverRowColumnLeft>
            nein (kein Vorkommen):
          </LabelPopoverRowColumnLeft>
          <LabelPopoverRowColumnRight>
            {`siehe bei Populationen "überprüft, kein Vorkommen"`}
          </LabelPopoverRowColumnRight>
        </LabelPopoverContentRow>
      </Container>
    )
    let gemeinden = Array.from(store.table.gemeinde.values())
    gemeinden = sortBy(gemeinden, `GmdName`)
    gemeinden = gemeinden.map(el => el.GmdName)
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
    const FieldWithInfoContainer = styled.div`
      display: flex;
      flex-direction: row;
    `
    const PopoverContentRow = styled.div`
      padding: 2px 5px 2px 5px;
      display: flex;
      border-color: grey;
      border-width: thin;
      border-style: solid;
      border-radius: 4px;
    `

    return (
      <Container>
        <FormTitle title="Teil-Population" />
        <FieldsContainer>
          <TextField
            label="Nr."
            fieldName="TPopNr"
            value={activeDataset.row.TPopNr}
            errorText={activeDataset.valid.TPopNr}
            type="number"
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <FieldWithInfoContainer>
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
              <PopoverContentRow>
                Dieses Feld möglichst immer ausfüllen
              </PopoverContentRow>
            </InfoWithPopover>
          </FieldWithInfoContainer>
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
          <Label label="Für AP-Bericht relevant" />
          <RadioButtonGroupWithInfo
            fieldName="TPopApBerichtRelevant"
            value={activeDataset.row.TPopApBerichtRelevant}
            dataSource={tpopApBerichtRelevantWerte}
            updatePropertyInDb={store.updatePropertyInDb}
            popover={tpopAbBerRelevantInfoPopover}
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
          <AutoComplete
            hintText={gemeinden.length === 0 ? `lade Daten...` : ``}
            fullWidth
            floatingLabelText="Gemeinde"
            openOnFocus
            dataSource={gemeinden}
            searchText={activeDataset.row.TPopGemeinde || ``}
            filter={AutoComplete.caseInsensitiveFilter}
            maxSearchResults={20}
            onNewRequest={val =>
              store.updatePropertyInDb(`TPopGemeinde`, val)
            }
            onBlur={e =>
              store.updatePropertyInDb(`TPopGemeinde`, e.target.value)
            }
            value={activeDataset.row.TPopGemeinde || ``}
          />
          <TextField
            label="Radius (m)"
            fieldName="TPopRadius"
            value={activeDataset.row.TPopRadius}
            errorText={activeDataset.valid.TPopRadius}
            type="number"
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <TextField
            label="Höhe (m.ü.M.)"
            fieldName="TPopHoehe"
            value={activeDataset.row.TPopHoehe}
            errorText={activeDataset.valid.TPopHoehe}
            type="number"
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <TextField
            label="Exposition, Besonnung"
            fieldName="TPopExposition"
            value={activeDataset.row.TPopExposition}
            errorText={activeDataset.valid.TPopExposition}
            type="text"
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <TextField
            label="Klima"
            fieldName="TPopKlima"
            value={activeDataset.row.TPopKlima}
            errorText={activeDataset.valid.TPopKlima}
            type="text"
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <TextField
            label="Hangneigung"
            fieldName="TPopNeigung"
            value={activeDataset.row.TPopNeigung}
            errorText={activeDataset.valid.TPopNeigung}
            type="text"
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <TextField
            label="Beschreibung"
            fieldName="TPopBeschr"
            value={activeDataset.row.TPopBeschr}
            errorText={activeDataset.valid.TPopBeschr}
            type="text"
            multiline
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <TextField
            label="Kataster-Nr."
            fieldName="TPopKatNr"
            value={activeDataset.row.TPopKatNr}
            errorText={activeDataset.valid.TPopKatNr}
            type="text"
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <TextField
            label="EigentümerIn"
            fieldName="TPopEigen"
            value={activeDataset.row.TPopEigen}
            errorText={activeDataset.valid.TPopEigen}
            type="text"
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <TextField
            label="Kontakt vor Ort"
            fieldName="TPopKontakt"
            value={activeDataset.row.TPopKontakt}
            errorText={activeDataset.valid.TPopKontakt}
            type="text"
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <TextField
            label="Nutzungszone"
            fieldName="TPopNutzungszone"
            value={activeDataset.row.TPopNutzungszone}
            errorText={activeDataset.valid.TPopNutzungszone}
            type="text"
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <TextField
            label="BewirtschafterIn"
            fieldName="TPopBewirtschafterIn"
            value={activeDataset.row.TPopBewirtschafterIn}
            errorText={activeDataset.valid.TPopBewirtschafterIn}
            type="text"
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <TextField
            label="Bewirtschaftung"
            fieldName="TPopBewirtschaftung"
            value={activeDataset.row.TPopBewirtschaftung}
            errorText={activeDataset.valid.TPopBewirtschaftung}
            type="text"
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <TextField
            label="Bemerkungen"
            fieldName="TPopTxt"
            value={activeDataset.row.TPopTxt}
            errorText={activeDataset.valid.TPopTxt}
            type="text"
            multiline
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
        </FieldsContainer>
      </Container>
    )
  }
}

export default Tpop
