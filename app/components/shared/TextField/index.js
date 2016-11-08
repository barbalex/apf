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
      type = `text`,
      updateProperty,
    } = this.props
    return (
      <TextField
        floatingLabelText={label}
        type={type}
        value={value}
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
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  type: PropTypes.string,
  updateProperty: PropTypes.func.isRequired,
}

export default observer(MyTextField)
