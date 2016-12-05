import React, { Component, PropTypes } from 'react'
import { observer } from 'mobx-react'
import RadioButtonGroup from '../RadioButtonGroup'
import InfoWithPopover from '../InfoWithPopover'
import styles from './styles.css'

@observer
class radioButtonGroupWithInfo extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    fieldName: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
    updatePropertyInDb: PropTypes.func.isRequired,
    popover: PropTypes.element,
  }

  render() {
    const {
      fieldName,
      value,
      dataSource,
      updatePropertyInDb,
      popover,
    } = this.props
    return (
      <div className={styles.container}>
        <div className={styles.buttonGroup}>
          <RadioButtonGroup
            fieldName={fieldName}
            value={value}
            dataSource={dataSource}
            updatePropertyInDb={updatePropertyInDb}
          />
        </div>
        <InfoWithPopover>
          {popover}
        </InfoWithPopover>
      </div>
    )
  }
}

export default radioButtonGroupWithInfo
