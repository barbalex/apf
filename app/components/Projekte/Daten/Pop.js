import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import styled from 'styled-components'

import TextField from '../../shared/TextField'
import InfoWithPopover from '../../shared/InfoWithPopover'
import Status from '../../shared/Status'
import RadioButton from '../../shared/RadioButton'
import Label from '../../shared/Label'
import FormTitle from '../../shared/FormTitle'

@inject(`store`)
@observer
class Pop extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: PropTypes.object,
  }

  render() {
    const { store } = this.props
    const { activeDataset } = store
    const apJahr = store.table.ap.get(activeDataset.row.ApArtId).ApJahr
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
    const PopoverRow = styled.div`
      padding: 2px 5px 2px 5px;
    `
    const PopoverContentRow = styled(PopoverRow)`
      display: flex;
      border-color: grey;
      border-width: thin;
      border-style: solid;
      &:first-child {
        border-top-right-radius: 4px;
        border-top-left-radius: 4px;
      }
      &:last-child {
        border-bottom-right-radius: 4px;
        border-bottom-left-radius: 4px;
      }
    `
    const FieldWithInfoContainer = styled.div`
      display: flex;
      flex-direction: row;
    `

    return (
      <Container>
        <FormTitle title="Population" />
        <FieldsContainer>
          <TextField
            label="Nr."
            fieldName="PopNr"
            value={activeDataset.row.PopNr}
            errorText={activeDataset.valid.PopNr}
            type="number"
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <FieldWithInfoContainer>
            <TextField
              label="Name"
              fieldName="PopName"
              value={activeDataset.row.PopName}
              errorText={activeDataset.valid.PopName}
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
            herkunftFieldName="PopHerkunft"
            herkunftValue={activeDataset.row.PopHerkunft}
            bekanntSeitFieldName="PopBekanntSeit"
            bekanntSeitValue={activeDataset.row.PopBekanntSeit}
            bekanntSeitValid={activeDataset.valid.PopBekanntSeit}
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <Label label="Status unklar" />
          <RadioButton
            fieldName="PopHerkunftUnklar"
            value={activeDataset.row.PopHerkunftUnklar}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <TextField
            label="Begründung"
            fieldName="PopHerkunftUnklarBegruendung"
            value={activeDataset.row.PopHerkunftUnklarBegruendung}
            errorText={activeDataset.valid.PopHerkunftUnklarBegruendung}
            type="text"
            multiLine
            fullWidth
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <TextField
            label="X-Koordinaten"
            fieldName="PopXKoord"
            value={activeDataset.row.PopXKoord}
            errorText={activeDataset.valid.PopXKoord}
            type="number"
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <TextField
            label="Y-Koordinaten"
            fieldName="PopYKoord"
            value={activeDataset.row.PopYKoord}
            errorText={activeDataset.valid.PopYKoord}
            type="number"
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
        </FieldsContainer>
      </Container>
    )
  }
}

export default Pop
