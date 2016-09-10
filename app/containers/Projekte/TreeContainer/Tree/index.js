/*
 *
 * Tree
 *
 */

import React, { Component } from 'react'
import { observer } from 'mobx-react'
import styles from './styles.css'

const Tree = observer(
  class Tree extends Component { // eslint-disable-line react/prefer-stateless-function
    render() {
      return (
        <div className={styles.container}>
          Tree
        </div>
      )
    }
  }
)

export default Tree
