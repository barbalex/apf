import React, { Component, PropTypes } from 'react'
import { observer } from 'mobx-react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

const MySelectField = class MySelectField extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      label,
      fieldName,
      value = ``,
      dataSource,
      valueProp,
      labelProp,
      updateProperty,
      autoWidth = false,
    } = this.props
    return (
      <SelectField
        floatingLabelText={label}
        value={value}
        autoWidth={autoWidth}
        onChange={(event, key, payload) =>
          updateProperty(fieldName, payload)
        }
      >
        {
          dataSource.map((e, index) =>
            <MenuItem value={e[valueProp]} primaryText={e[labelProp]} key={index} />
          )
        }
      </SelectField>
    )
  }
}

MySelectField.propTypes = {
  label: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  value: PropTypes.any,
  dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
  valueProp: PropTypes.string.isRequired,
  labelProp: PropTypes.string.isRequired,
  updateProperty: PropTypes.func.isRequired,
  autoWidth: PropTypes.bool
}

export default observer(MySelectField)
