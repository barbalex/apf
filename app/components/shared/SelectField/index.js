import React, { Component, PropTypes } from 'react'
import { observer } from 'mobx-react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

const MySelectField = class MySelectField extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      label,
      fieldName,
      value,
      dataSource,
      valueProp,
      labelProp,
      updateProperty,
    } = this.props
    return (
      <SelectField
        floatingLabelText={label}
        value={value || ``}
        fullWidth
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
}

export default observer(MySelectField)
