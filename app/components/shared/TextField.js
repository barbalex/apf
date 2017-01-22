import React, { PropTypes } from 'react'
import { observer } from 'mobx-react'
import TextField from 'material-ui/TextField'
import withHandlers from 'recompose/withHandlers'
import compose from 'recompose/compose'

const enhance = compose(
  withHandlers({
    onChange: props =>
      (event, val) =>
        props.updateProperty(props.fieldName, val),
    onBlur: props =>
      event =>
        props.updatePropertyInDb(props.fieldName, event.target.value),
  }),
  observer
)

const MyTextField = ({
  label,
  value,
  errorText,
  type,
  multiLine,
  disabled,
  hintText,
  onChange,
  onBlur,
}) =>
  <TextField
    floatingLabelText={label}
    hintText={hintText}
    type={type}
    multiLine={multiLine}
    value={value || ``}
    errorText={errorText}
    disabled={disabled}
    fullWidth
    onChange={onChange}
    onBlur={onBlur}
  />

MyTextField.propTypes = {
  label: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  value: PropTypes.any,
  errorText: PropTypes.string,
  type: PropTypes.string,
  multiLine: PropTypes.bool,
  disabled: PropTypes.bool,
  hintText: PropTypes.string,
  updateProperty: PropTypes.func.isRequired,
  updatePropertyInDb: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
}

MyTextField.defaultProps = {
  value: ``,
  errorText: ``,
  type: `text`,
  multiLine: false,
  disabled: false,
  hintText: ``,
}

export default enhance(MyTextField)
