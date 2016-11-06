/*
 *
 * Population
 *
 */

import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import mobX from 'mobX'
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
    const aeEigenschaften = mobX.toJS(store.data.aeEigenschaften).map(e => e.label)
    console.log('typeof aeEigenschaften:', typeof aeEigenschaften)
    console.log('aeEigenschaften:', aeEigenschaften)
    return (
      <div className={styles.container}>
        <AutoComplete
          hintText={store.data.aeEigenschaftenLoading.length === 0 ? 'lade Daten...' : ''}
          dataSource={aeEigenschaften}
          dataSourceConfig={{ id: 'id', label: 'label' }}
          fullWidth
          floatingLabelText="Art"
          maxSearchResults={20}
        />
      </div>
    )
  }
}

Pop.propTypes = {
  store: PropTypes.object,
}

export default inject('store')(observer(Pop))
