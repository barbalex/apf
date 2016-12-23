import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import styled from 'styled-components'

import FormTitle from '../../shared/FormTitle'
import RadioButton from '../../shared/RadioButton'
import RadioButtonGroupWithInfo from '../../shared/RadioButtonGroupWithInfo'
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
          Will heissen: Die Beobachtung kann nicht zugeordnet werden.
        </LabelPopoverContentRow>
        <LabelPopoverContentRow>
          Mögliche Gründe: Unsichere Bestimmung, nicht lokalisierbar
        </LabelPopoverContentRow>
        <LabelPopoverContentRow>
          Bitte im Bemerkungsfeld begründen
        </LabelPopoverContentRow>
      </Container>
    )
  }

  render() {
    const { store, typ } = this.props
    const { activeDataset } = store

    return (
      <Container>
        <FormTitle title="Beobachtung" />
        <FieldsContainer>
          <Label label="Nicht beurteilt" />
          <RadioButton
            fieldName="beobNichtZugeordnet"
            value={activeDataset.row.beobNichtZugeordnet}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <RadioButtonGroupWithInfo
            fieldName="beobNichtZugeordnet"
            value={activeDataset.row.beobNichtZugeordnet}
            dataSource={[{ value: 1, label: `Nicht zuordnen` }]}
            updatePropertyInDb={store.updatePropertyInDb}
            popover={this.nichtZuordnenPopover}
          />
        </FieldsContainer>
      </Container>
    )
  }
}

export default Beob
