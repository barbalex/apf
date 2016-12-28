import React, { Component, PropTypes } from 'react'
import { observer } from 'mobx-react'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import styled from 'styled-components'

import InfoWithPopover from './InfoWithPopover'

@observer
class MyRadioButton extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    fieldName: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    updatePropertyInDb: PropTypes.func.isRequired,
    popover: PropTypes.element,
  }

  render() {
    const {
      fieldName,
      value,
      updatePropertyInDb,
      popover,
    } = this.props
    const Container = styled.div`
      display: flex;
      justify-content: space-between;
    `

    return (
      <Container>
        <RadioButtonGroup
          name={fieldName}
          valueSelected={value || ``}
          onChange={(event, valuePassed) => {
            // if clicked element is active value: set 0
            const val = valuePassed === value ? 0 : valuePassed
            updatePropertyInDb(fieldName, val)
          }}
        >
          <RadioButton
            value={1}
          />
        </RadioButtonGroup>
        <InfoWithPopover>
          {popover}
        </InfoWithPopover>
      </Container>
    )
  }
}

export default MyRadioButton
