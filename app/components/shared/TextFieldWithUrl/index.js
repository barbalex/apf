import React, { Component, PropTypes } from 'react'
import { observer } from 'mobx-react'
import TextField from 'material-ui/TextField'
import FontIcon from 'material-ui/FontIcon'
import { greenA200 } from 'material-ui/styles/colors'
import getUrls from 'get-urls'
import styled from 'styled-components'
import styles from './styles.css'

const Container = styled.div`
  display: flex;
`

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
    const urls = value ? getUrls(value) : []

    return (
      <Container>
        <TextField
          floatingLabelText={`${label} (bitte "www." statt "http://" eingeben)`}
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
          urls.map((url, index) => (
            <FontIcon
              className={[`material-icons`, styles.icon].join(` `)}
              onClick={() => window.open(url, `_blank`)}
              hoverColor={greenA200}
              title={`${url} öffnen`}
              key={index}
            >
              open_in_new
            </FontIcon>
          ))
        }
      </Container>
    )
  }
}

export default MyTextFieldWithUrl
