/*
 *
 * Population
 *
 */

import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import styles from './styles.css'

const Pop = class Pop extends Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super()
    // this.activeForm = this.activeForm.bind(this);
  }

  componentDidMount() {
    // TODO: fetch dropdown data
    const { store } = this.props
    console.log('Pop: componentDidMount')
    store.fetchAeEigenschaften()
  }

  render() {
    return (
      <div>
        Pop
      </div>
    )
  }
}

Pop.propTypes = {
  store: PropTypes.object,
}

export default inject('store')(observer(Pop))
