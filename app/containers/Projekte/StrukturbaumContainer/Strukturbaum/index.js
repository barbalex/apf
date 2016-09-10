/*
 *
 * Strukturbaum
 *
 */

import React, { Component } from 'react'
import { observer } from 'mobx-react'
import styles from './styles.css'

const Strukturbaum = observer(
  class Strukturbaum extends Component { // eslint-disable-line react/prefer-stateless-function
    render() {
      return (
        <div className={styles.container}>
          Strukturbaum
        </div>
      )
    }
  }
)

export default Strukturbaum
