import React, { Component, PropTypes } from 'react'
import { observer } from 'mobx-react'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'

@observer
class MyRadioButton extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    fieldName: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    updatePropertyInDb: PropTypes.func.isRequired,
  }

  render() {
    const {
      fieldName,
      value,
      updatePropertyInDb,
    } = this.props
    return (
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
    )
  }
}

export default MyRadioButton
