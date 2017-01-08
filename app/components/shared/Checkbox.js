import React, { Component, PropTypes } from 'react'
import { observer } from 'mobx-react'
import { Checkbox } from 'material-ui/Checkbox'
import Label from './Label'

@observer
class MyCheckbox extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    fieldName: PropTypes.string.isRequired,
    value: PropTypes.number,
    label: PropTypes.string.isRequired,
    updatePropertyInDb: PropTypes.func.isRequired,
  }

  render() {
    const {
      fieldName,
      value,
      label,
      updatePropertyInDb,
    } = this.props

    /**
     * This give an error:
     * warning.js:36 Warning: React.createElement:
     * type should not be null, undefined, boolean, or number.
     * It should be a string (for DOM elements) or a ReactClass (for composite components).
     * Check the render method of `MyCheckbox`.
     *
     * NO FUCKING IDEA WHY THIS HAPPENS
     */
    // const checked = value === 1
    // console.log(`fieldName:`, fieldName)
    // console.log(`value:`, value)
    // console.log(`value === 1:`, value === 1)
    // console.log(`label:`, label)
    // console.log(`checked:`, checked)

    return (
      <div>
        <Label label={label} />
        <Checkbox
          checked={value === 1}
          onCheck={(e, isInputChecked) => {
            // console.log(`isInputChecked:`, isInputChecked)
            const val = isInputChecked ? 1 : null
            // console.log(`val:`, val)
            updatePropertyInDb(fieldName, val)
          }}
        />
      </div>
    )
  }
}

export default MyCheckbox
