import React, { Component, PropTypes } from 'react'
import { observer } from 'mobx-react'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import moment from 'moment'

@observer
class JearDatePair extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    yearLabel: PropTypes.string.isRequired,
    yearFieldName: PropTypes.string.isRequired,
    yearValue: PropTypes.any,
    yearErrorText: PropTypes.string,
    dateLabel: PropTypes.string.isRequired,
    dateFieldName: PropTypes.string.isRequired,
    dateValue: PropTypes.any,
    dateErrorText: PropTypes.string,
    updateProperty: PropTypes.func,
    updatePropertyInDb: PropTypes.func,
  }

  constructor() {
    super()
    this.onBlurYear = this.onBlurYear.bind(this)
    this.onChangeDate = this.onChangeDate.bind(this)
  }

  onBlurYear(event) {
    const {
      yearLabel,
      yearFieldName,
      yearValue,
      yearErrorText,
      dateLabel,
      dateFieldName,
      dateValue,
      dateErrorText,
      updateProperty,
      updatePropertyInDb,
    } = this.props

    updatePropertyInDb(yearFieldName, event.target.value)

  }

  onChangeDate(event, value) {
    const {
      yearLabel,
      yearFieldName,
      yearValue,
      yearErrorText,
      dateLabel,
      dateFieldName,
      dateValue,
      dateErrorText,
      updateProperty,
      updatePropertyInDb,
    } = this.props

    updateProperty(dateFieldName, moment(value).format(`YYYY-MM-DD`))
    updatePropertyInDb(dateFieldName, moment(value).format(`YYYY-MM-DD`))
  }

  render() {
    const {
      yearLabel,
      yearFieldName,
      yearValue,
      yearErrorText,
      dateLabel,
      dateValue,
      dateErrorText,
      updateProperty,
    } = this.props

    return (
      <div>
        <TextField
          floatingLabelText={yearLabel}
          type="text"
          value={yearValue || ``}
          errorText={yearErrorText || ``}
          fullWidth
          onChange={(event, val) =>
            updateProperty(yearFieldName, val)
          }
          onBlur={this.onBlurYear}
        />
        <DatePicker
          floatingLabelText={dateLabel}
          value={dateValue || ``}
          errorText={dateErrorText || ``}
          DateTimeFormat={window.Intl.DateTimeFormat}
          locale="de-CH-1996"
          formatDate={v => moment(v).format(`DD.MM.YYYY`)}
          autoOk
          fullWidth
          cancelLabel="schliessen"
          onChange={this.onChangeDate}
        />
      </div>
    )
  }
}

export default JearDatePair
