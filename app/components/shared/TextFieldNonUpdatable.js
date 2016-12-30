import React, { Component, PropTypes } from 'react'
import { observer } from 'mobx-react'
import TextField from 'material-ui/TextField'

@observer
class MyTextField extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.any,
    key: PropTypes.any,
    hintText: PropTypes.string,
  }

  constructor() {
    super()
    this.state = {
      hintText: ``,
    }
  }

  render() {
    const {
      label,
      value,
    } = this.props
    const { hintText } = this.state

    return (
      <TextField
        floatingLabelText={label}
        hintText={hintText}
        value={value || ``}
        fullWidth
        onChange={() => {
          this.setState({
            hintText: `Dieser Wert ist nicht veränderbar`,
          })
          const that = this
          setTimeout(() => that.setState({
            hintText: ``,
          }))
        }}
      />
    )
  }
}

export default MyTextField
