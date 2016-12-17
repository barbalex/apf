import React, { Component, PropTypes } from 'react'
import { observer } from 'mobx-react'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'

@observer
class MyRadioButtonGroup extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    fieldName: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
    updatePropertyInDb: PropTypes.func.isRequired,
  }

  render() {
    const {
      fieldName,
      value,
      dataSource,
      updatePropertyInDb,
    } = this.props
    const valueSelected = (value !== null && value !== undefined) ? value : ``
    return (
      <RadioButtonGroup
        name={fieldName}
        valueSelected={valueSelected}
        onChange={(event, valuePassed) => {
          // if clicked element is active value: set null
          const val = valuePassed === value ? null : valuePassed
          updatePropertyInDb(fieldName, val)
        }}
      >
        {
          dataSource.map((e, index) =>
            <RadioButton
              value={e.value}
              label={e.label}
              key={index}
            />
          )
        }
      </RadioButtonGroup>
    )
  }
}

export default MyRadioButtonGroup
