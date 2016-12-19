import React, { Component, PropTypes } from 'react'
import { observer } from 'mobx-react'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import styled from 'styled-components'

import TextField from './TextField'
import Label from './Label'

@observer
class Status extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    apJahr: PropTypes.number,
    herkunftFieldName: PropTypes.string.isRequired,
    herkunftValue: PropTypes.number,
    bekanntSeitFieldName: PropTypes.string,
    bekanntSeitValue: PropTypes.number,
    bekanntSeitValid: PropTypes.string,
    updateProperty: PropTypes.func.isRequired,
    updatePropertyInDb: PropTypes.func.isRequired,
  }

  render() {
    const {
      apJahr,
      herkunftFieldName,
      herkunftValue,
      bekanntSeitFieldName,
      bekanntSeitValue,
      bekanntSeitValid,
      updateProperty,
      updatePropertyInDb,
    } = this.props
    const valueSelected = (
      (herkunftValue !== null && herkunftValue !== undefined) ?
      herkunftValue :
      ``
    )
    const showVorBeginnAp = (
      bekanntSeitValue &&
      apJahr &&
      (apJahr > bekanntSeitValue)
    )
    const StatusContainer = styled.div`
      padding-top: 10px;
    `
    const HerkunftContainer = styled.div`
      display: flex;
      margin-top: -2px;
    `
    const HerkunftColumnContainer = styled.div`
      padding-right: 25px;
    `
    const GroupLabelContainer = styled.div`
      padding-bottom: 2px;
    `
    const disabled = !bekanntSeitValue && bekanntSeitValue !== 0

    return (
      <div>
        <TextField
          label="bekannt seit"
          fieldName={bekanntSeitFieldName}
          value={bekanntSeitValue}
          errorText={bekanntSeitValid}
          type="number"
          updateProperty={updateProperty}
          updatePropertyInDb={updatePropertyInDb}
        />
        <StatusContainer>
          <Label label="Status" />
          <HerkunftContainer>
            <HerkunftColumnContainer>
              <GroupLabelContainer>ursprünglich:</GroupLabelContainer>
              <RadioButtonGroup
                name={herkunftFieldName}
                valueSelected={valueSelected}
                onChange={(event, valuePassed) => {
                  // if clicked element is active herkunftValue: set null
                  const val = valuePassed === herkunftValue ? null : valuePassed
                  updatePropertyInDb(herkunftFieldName, val)
                }}
              >
                <RadioButton
                  value={100}
                  label="aktuell"
                  key={1}
                  disabled={disabled}
                />
                <RadioButton
                  value={101}
                  label="erloschen"
                  key={2}
                  disabled={disabled}
                />
              </RadioButtonGroup>
            </HerkunftColumnContainer>
            <HerkunftColumnContainer>
              <GroupLabelContainer>angesiedelt:</GroupLabelContainer>
              <RadioButtonGroup
                name={herkunftFieldName}
                valueSelected={valueSelected}
                onChange={(event, valuePassed) => {
                  // if clicked element is active herkunftValue: set null
                  const val = valuePassed === herkunftValue ? null : valuePassed
                  updatePropertyInDb(herkunftFieldName, val)
                }}
              >
                <RadioButton
                  value={showVorBeginnAp ? 210 : 200}
                  label="aktuell"
                  key={1}
                  disabled={disabled}
                />
                <RadioButton
                  value={201}
                  label="Ansaatversuch"
                  key={3}
                  disabled={disabled}
                />
                <RadioButton
                  value={showVorBeginnAp ? 211 : 202}
                  label="erloschen / nicht etabliert"
                  key={4}
                  disabled={disabled}
                />
              </RadioButtonGroup>
            </HerkunftColumnContainer>
            <HerkunftColumnContainer>
              <GroupLabelContainer>potenziell:</GroupLabelContainer>
              <RadioButtonGroup
                name={herkunftFieldName}
                valueSelected={valueSelected}
                onChange={(event, valuePassed) => {
                  // if clicked element is active herkunftValue: set null
                  const val = valuePassed === herkunftValue ? null : valuePassed
                  updatePropertyInDb(herkunftFieldName, val)
                }}
              >
                <RadioButton
                  value={300}
                  label="potenzieller Wuchs-/Ansiedlungsort"
                  key={1}
                  disabled={disabled}
                />
              </RadioButtonGroup>
            </HerkunftColumnContainer>
          </HerkunftContainer>
        </StatusContainer>
      </div>
    )
  }
}

export default Status
