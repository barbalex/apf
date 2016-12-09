import React, { Component, PropTypes } from 'react'
import { observer } from 'mobx-react'
import DatePicker from 'material-ui/DatePicker'
import format from 'date-fns/format'

@observer
class MyDatePicker extends Component { // eslint-disable-line react/prefer-stateless-function

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
  }

  render() {
    const {
      label,
      fieldName,
      value,
      errorText,
      updateProperty,
      updatePropertyInDb,
      disabled,
    } = this.props

    const valueDate = new Date(value)

    return (
      <DatePicker
        floatingLabelText={label}
        value={valueDate || ``}
        errorText={errorText || ``}
        disabled={disabled || false}
        DateTimeFormat={window.Intl.DateTimeFormat}
        locale="de-CH-1996"
        formatDate={v => format(v, `DD.MM.YYYY`)}
        autoOk
        fullWidth
        cancelLabel="schliessen"
        onChange={(event, val) => {
          updateProperty(fieldName, format(val, `YYYY-MM-DD`))
          updatePropertyInDb(fieldName, format(val, `YYYY-MM-DD`))
        }}
      />
    )
  }
}

export default MyDatePicker
