import React, { Component, PropTypes } from 'react'
import { observer } from 'mobx-react'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'

@observer
class MyRadioButtonGroup extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    fieldName: PropTypes.string.isRequired,
    value: PropTypes.number,
    dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
    updateProperty: PropTypes.func.isRequired,
  }

  render() {
    const {
      fieldName,
      value,
      dataSource,
      updateProperty,
    } = this.props
    const valueSelected = value >= 0 ? value : ``
    return (
      <RadioButtonGroup
        name={fieldName}
        valueSelected={valueSelected}
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

export default MyRadioButtonGroup
