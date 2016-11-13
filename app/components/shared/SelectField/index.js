import React, { Component, PropTypes } from 'react'
import { observer } from 'mobx-react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

@observer
class MySelectField extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    label: PropTypes.string.isRequired,
    fieldName: PropTypes.string.isRequired,
    value: PropTypes.any,
    dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
    valueProp: PropTypes.string.isRequired,
    labelProp: PropTypes.string.isRequired,
    updatePropertyInDb: PropTypes.func.isRequired,
  }

  render() {
    const {
      label,
      fieldName,
      value,
      dataSource,
      valueProp,
      labelProp,
      updatePropertyInDb,
    } = this.props
    return (
      <SelectField
        floatingLabelText={label}
        value={value || ``}
        fullWidth
        onChange={(event, key, payload) =>
          updatePropertyInDb(fieldName, payload)
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

export default MySelectField
