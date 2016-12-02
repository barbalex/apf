import React, { Component, PropTypes } from 'react'
import { observer } from 'mobx-react'
import TextField from 'material-ui/TextField'
import FontIcon from 'material-ui/FontIcon'
import { greenA200 } from 'material-ui/styles/colors'
import getUrls from 'get-urls'
import styles from './styles.css'

@observer
class MyTextFieldWithUrl extends Component { // eslint-disable-line react/prefer-stateless-function

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
      type,
      multiLine,
      updateProperty,
      updatePropertyInDb,
      disabled,
    } = this.props
    const urls = getUrls(value)
    return (
      <div className={styles.container}>
        <TextField
          floatingLabelText={label}
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
        {
          urls.map(url => (
            <FontIcon
              className={[`material-icons`, styles.icon].join(` `)}
              onClick={() => window.open(url, `_blank`)}
              hoverColor={greenA200}
              title={`${url} öffnen`}
            >
              open_in_new
            </FontIcon>
          ))
        }
      </div>
    )
  }
}

export default MyTextFieldWithUrl
