import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import styled from 'styled-components'
import sortBy from 'lodash/sortBy'
import TextField from 'material-ui/TextField'

import FormTitle from '../../shared/FormTitle'
import RadioButtonGroup from '../../shared/RadioButtonGroup'
import OwnTextField from '../../shared/TextField'
import RadioButtonWithInfo from '../../shared/RadioButtonWithInfo'
import Label from '../../shared/Label'

const Container = styled.div`
  height: 100%;
  overflow-x: auto;
`
const FieldsContainer = styled.div`
  padding-left: 10px;
  padding-right: 10px;
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
const MaxHeightDiv = styled.div`
  max-height: 250px;
  overflow-x: auto;
`

@inject(`store`)
@observer
class Beob extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: PropTypes.object.isRequired,
    typ: PropTypes.string.isRequired,
  }

  get nichtZuordnenPopover() {
    return (
      <Container>
        <LabelPopoverTitleRow>
          Legende
        </LabelPopoverTitleRow>
        <LabelPopoverContentRow>
          {`Will heissen: Die Beobachtung kann nicht zugeordnet werden.`}<br />
          {`Mögliche Gründe: Unsichere Bestimmung, nicht lokalisierbar.`}<br />
          {`Bitte im Bemerkungsfeld begründen.`}
        </LabelPopoverContentRow>
      </Container>
    )
  }

  get beobRaw() {
    const { store } = this.props
    const { activeDataset } = store
    const beob = activeDataset.row
    const beobRaw = (
      beob.QuelleId === 1 ?
      store.table.beob_evab.get(beob.NO_NOTE) :
      store.table.beob_infospezies.get(beob.NO_NOTE)
    )
    return beobRaw
  }

  get tpopZuordnenSource() {
    const { store } = this.props
    const { activeDataset } = store
    const beob = activeDataset.row
    // get all popIds of active ap
    const popList = Array.from(store.table.pop.values())
      .filter(p => p.ApArtId === store.activeUrlElements.ap)
    const popIdList = popList.map(p => p.PopId)
    // get all tpop
    let tpopList = Array.from(store.table.tpop.values())
      // of active ap
      .filter(t => popIdList.includes(t.PopId))
      // with coordinates
      .filter(t => t.TPopXKoord && t.TPopYKoord)
    // calculate their distance to this beob
    const beobRaw = this.beobRaw
    // beobRaw loads later
    // prevent an error occuring if it does not yet exist
    // by passing back an empty array
    if (!beobRaw) {
      return []
    }
    const beobX = (
      beob.QuelleId === 2 ?
      beobRaw.FNS_XGIS :
      beobRaw.COORDONNEE_FED_E
    )
    const beobY = (
      beob.QuelleId === 2 ?
      beobRaw.FNS_YGIS :
      beobRaw.COORDONNEE_FED_N
    )
    tpopList.forEach((t) => {
      const dX = Math.abs(beobX - t.TPopXKoord)
      const dY = Math.abs(beobY - t.TPopYKoord)
      t.distance = Math.round(((dX ** 2) + (dY ** 2)) ** 0.5)
      t.popNr = store.table.pop.get(t.PopId).PopNr
      // build label
      t.label = `${t.distance}m: ${t.popNr}/${t.TPopNr}, ${t.TPopFlurname}`
    })
    // order them by distance
    tpopList = sortBy(tpopList, `distance`)
    // return array of TPopId, label
    return tpopList.map(t => ({
      value: t.TPopId,
      label: t.label,
    }))
  }

  get beobRawFields() {
    const beobRaw = this.beobRaw
    const beobRawFields = []
    if (beobRaw) {
      Object.keys(beobRaw).forEach((key) => {
        const value = beobRaw[key]
        if (value || value === 0) {
          beobRawFields.push(
            <TextField
              key={key}
              floatingLabelText={key}
              fullWidth
              value={beobRaw[key]}
              onChange={() =>
                console.log(`nope:`)
              }
            />
          )
        }
      })
    }
    return beobRawFields
  }

  render() {
    const { store } = this.props
    const { activeDataset } = store
    const beob = activeDataset.row
    const beobRawTitle = (
      beob.QuelleId === 1 ?
      `Informationen aus EvAB (nicht veränderbar)` :
      `Informationen aus Infospezies (nicht veränderbar)`
    )

    return (
      <Container>
        <FormTitle title="Beobachtung" />
        <FieldsContainer>
          <Label label="Nicht zuordnen" />
          <RadioButtonWithInfo
            fieldName="BeobNichtZuordnen"
            value={activeDataset.row.BeobNichtZuordnen}
            updatePropertyInDb={store.updatePropertyInDb}
            popover={this.nichtZuordnenPopover}
          />
          <Label label="Einer Teilpopulation zuordnen" />
          <MaxHeightDiv>
            <RadioButtonGroup
              fieldName="TPopId"
              value={activeDataset.row.TPopId}
              dataSource={this.tpopZuordnenSource}
              updatePropertyInDb={store.updatePropertyInDb}
            />
          </MaxHeightDiv>
          <OwnTextField
            label="Bemerkungen zur Zuordnung"
            fieldName="BeobBemerkungen"
            value={activeDataset.row.BeobBemerkungen}
            errorText={activeDataset.valid.BeobBemerkungen}
            type="text"
            multiLine
            fullWidth
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
        </FieldsContainer>
        <FormTitle title={beobRawTitle} />
        <FieldsContainer>
          {this.beobRawFields}
        </FieldsContainer>
      </Container>
    )
  }
}

export default Beob
