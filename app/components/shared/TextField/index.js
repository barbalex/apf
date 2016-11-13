import React, { Component, PropTypes } from 'react'
import { observer } from 'mobx-react'
import TextField from 'material-ui/TextField'

@observer
class MyTextField extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    label: PropTypes.string.isRequired,
    fieldName: PropTypes.string.isRequired,
    value: PropTypes.any,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    updateProperty: PropTypes.func,
  }

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
        value={value || ``}
        disabled={disabled || false}
        fullWidth
        onChange={(event, val) =>
          updateProperty(fieldName, val)
        }
      />
    )
  }
}

export default MyTextField
