import React, { Component, PropTypes } from 'react'
import { observer } from 'mobx-react'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'

const MyRadioButtonGroup = class MyRadioButtonGroup extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { fieldName, value, dataSource, updateProperty } = this.props
    return (
      <RadioButtonGroup
        name={fieldName}
        valueSelected={value}
        onChange={(event, valuePassed) => {
          // if clicked element is active value: set null
          const val = valuePassed === value ? null : valuePassed
          updateProperty(fieldName, val)
        }}
      >
        {
          dataSource.map((e, index) =>
            <RadioButton
              value={e.DomainCode}
              label={e.DomainTxt}
              key={index}
            />
          )
        }
      </RadioButtonGroup>
    )
  }
}

MyRadioButtonGroup.propTypes = {
  fieldName: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateProperty: PropTypes.func.isRequired,
}

export default observer(MyRadioButtonGroup)
