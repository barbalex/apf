import React, { Component, PropTypes } from 'react'
import { observer } from 'mobx-react'
import TextField from 'material-ui/TextField'
import { orange500 } from 'material-ui/styles/colors'

@observer
class MyTextField extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.any,
    key: PropTypes.any,
    errorText: PropTypes.string,
  }

  constructor() {
    super()
    this.state = {
      errorText: ``,
    }
  }

  render() {
    const {
      label,
      value,
    } = this.props
    const { errorText } = this.state

    return (
      <TextField
        floatingLabelText={label}
        errorText={errorText}
        value={value || ``}
        fullWidth
        errorStyle={{ color: orange500 }}
        onChange={() => {
          this.setState({
            errorText: `Dieser Wert ist nicht veränderbar`,
          })
          const that = this
          setTimeout(() => that.setState({
            errorText: ``,
          }), 5000)
        }}
      />
    )
  }
}

export default MyTextField
