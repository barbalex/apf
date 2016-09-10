/*
 *
 * Filter
 *
 */

import React, { Component } from 'react'
import { observer } from 'mobx-react'
import styles from './styles.css'

const Filter = observer(
  class Filter extends Component { // eslint-disable-line react/prefer-stateless-function
    render() {
      return (
        <div className={styles.container}>
          Filter
        </div>
      )
    }
  }
)

export default Filter
