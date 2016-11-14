import React, { Component, PropTypes } from 'react'
import { observer } from 'mobx-react'
import styles from './styles.css'

@observer
class Label extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    label: PropTypes.string.isRequired,
  }

  render() {
    const { label } = this.props
    return (
      <div
        className={styles.label}
      >
        {label}
      </div>
    )
  }
}

export default Label
