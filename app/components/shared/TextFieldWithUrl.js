import React, { PropTypes } from 'react'
import { observer } from 'mobx-react'
import TextField from 'material-ui/TextField'
import FontIcon from 'material-ui/FontIcon'
import { greenA200 } from 'material-ui/styles/colors'
import getUrls from 'get-urls'
import styled from 'styled-components'
import compose from 'recompose/compose'

const Container = styled.div`
  display: flex;
`
const StyledFontIcon = styled(FontIcon)`
  margin-top: 33px;
  cursor: pointer;
`

const enhance = compose(
  observer
)

const MyTextFieldWithUrl = ({
  label,
  fieldName,
  value,
  errorText,
  type,
  multiLine,
  updateProperty,
  updatePropertyInDb,
  disabled,
}) => {
  const urls = value ? getUrls(value) : []

  return (
    <Container>
      <TextField
        floatingLabelText={`${label} (bitte "www." statt "http://" eingeben)`}
        type={type}
        multiLine={multiLine}
        value={value}
        errorText={errorText}
        disabled={disabled}
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
          <StyledFontIcon
            className={`material-icons`}
            onClick={() => window.open(url, `_blank`)}
            hoverColor={greenA200}
            title={`${url} öffnen`}
            key={index}
          >
            open_in_new
          </StyledFontIcon>
        ))
      }
    </Container>
  )
}

MyTextFieldWithUrl.propTypes = {
  label: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  value: PropTypes.any,
  errorText: PropTypes.string,
  type: PropTypes.string,
  multiLine: PropTypes.bool,
  disabled: PropTypes.bool,
  updateProperty: PropTypes.func.isRequired,
  updatePropertyInDb: PropTypes.func.isRequired,
}

MyTextFieldWithUrl.defaultProps = {
  value: ``,
  errorText: ``,
  type: `text`,
  multiLine: false,
  disabled: false,
}

export default enhance(MyTextFieldWithUrl)
