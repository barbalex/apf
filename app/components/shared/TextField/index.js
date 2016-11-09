import React, { Component, PropTypes } from 'react'
import { observer } from 'mobx-react'
import TextField from 'material-ui/TextField'

const MyTextField = class MyTextField extends Component { // eslint-disable-line react/prefer-stateless-function

  /*
  constructor() {
    super()
  }*/

  render() {
    const {
      label,
      fieldName,
      value,
      type,
      updateProperty,
      disabled,
    } = this.props

    return (
      <TextField
        floatingLabelText={label}
        type={type || `text`}
        value={value || undefined}
        disabled={disabled || false}
        onChange={(event, val) =>
          updateProperty(fieldName, val)
        }
      />
    )
  }
}

MyTextField.propTypes = {
  label: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  value: PropTypes.any,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  updateProperty: PropTypes.func,
}

export default observer(MyTextField)
