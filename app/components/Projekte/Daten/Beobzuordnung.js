import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import styled from 'styled-components'

import FormTitle from '../../shared/FormTitle'
import RadioButton from '../../shared/RadioButton'
import RadioButtonGroup from '../../shared/RadioButtonGroup'
import TextField from '../../shared/TextField'
import RadioButtonWithInfo from '../../shared/RadioButtonWithInfo'
import Label from '../../shared/Label'

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

  get tpopZuordnenSource() {
    const { store } = this.props
    const { activeDataset } = store
    const beob = activeDataset.row
    // get all popIds of active ap
    const popIdList = Array.from(store.table.pop.values())
      .filter(p => p.ApArtId === store.activeUrlElements.ap)
      .map(p => p.PopId)
    // get all tpop
    const tpopList = Array.from(store.table.tpop.values())
      // of active ap
      .filter(t => popIdList.includes(t.PopId))
      // with coordinates
      .filter(t => t.TPopXKoord && t.TPopYKoord)
    // calculate their distance to this beob
    // hm. need beob_evab and beob_infospezies for this
    tpopList.forEach((t) => {
      t.distance = ``
    })
    // order them by distance

    // build label

    // return array of TPopId, label
    return []
  }

  render() {
    const { store } = this.props
    const { activeDataset } = store

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
          <TextField
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
          <RadioButtonGroup
            fieldName="Einer Teilpopulation zuordnen"
            value={activeDataset.row.TPopId}
            dataSource={this.tpopZuordnenSource}
            updatePropertyInDb={store.updatePropertyInDb}
          />
        </FieldsContainer>
      </Container>
    )
  }
}

export default Beob
