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
    multiLine: PropTypes.bool,
    disabled: PropTypes.bool,
    updateProperty: PropTypes.func,
    updatePropertyInDb: PropTypes.func,
    hintText: PropTypes.string,
  }

  render() {
    const {
      label,
      fieldName,
      value,
      errorText,
      type,
      multiLine,
      updateProperty,
      updatePropertyInDb,
      disabled,
      hintText,
    } = this.props

    return (
      <TextField
        floatingLabelText={label}
        hintText={hintText || ``}
        type={type || `text`}
        multiLine={multiLine || false}
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
