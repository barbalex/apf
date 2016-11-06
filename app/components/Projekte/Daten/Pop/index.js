/*
 *
 * Population
 *
 */

import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import styles from './styles.css'
import AutoComplete from 'material-ui/AutoComplete'

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
    const { store } = this.props
    return (
      <div>
        <AutoComplete
          hintText={store.data.aeEigenschaftenLoading ? 'lade Daten...' : ''}
          dataSource={store.data.aeEigenschaften ? store.data.aeEigenschaften : []}
          dataSourceConfig={{ id: 'id', label: 'label' }}
          fullWidth
          floatingLabelText="Art"
        />
      </div>
    )
  }
}

Pop.propTypes = {
  store: PropTypes.object,
}

export default inject('store')(observer(Pop))
