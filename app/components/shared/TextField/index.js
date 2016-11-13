import React, { Component, PropTypes } from 'react'
import { observer } from 'mobx-react'
import TextField from 'material-ui/TextField'

@observer
class MyTextField extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    label: PropTypes.string.isRequired,
    fieldName: PropTypes.string.isRequired,
    value: PropTypes.any,
    errorText: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    updateProperty: PropTypes.func,
    updatePropertyInDb: PropTypes.func,
  }

  render() {
    const {
      label,
      fieldName,
      value,
      errorText,
      type,
      updateProperty,
      updatePropertyInDb,
      disabled,
    } = this.props

    return (
      <TextField
        floatingLabelText={label}
        type={type || `text`}
        value={value || ``}
        errorText={errorText || ``}
        disabled={disabled || false}
        fullWidth
        onChange={(event, val) =>
          updateProperty(fieldName, val)
        }
        onBlur={event =>
          updatePropertyInDb(fieldName, event.target.value)
        }
      />
    )
  }
}

export default MyTextField
