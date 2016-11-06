/*
 *
 * Population
 *
 */

import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import mobX from 'mobx'
import styles from './styles.css'
import AutoComplete from 'material-ui/AutoComplete'

const Pop = class Pop extends Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super()
    // this.activeForm = this.activeForm.bind(this);
  }

  componentDidMount() {
    // fetch dropdown data
    const { store } = this.props
    store.fetchAeEigenschaften()
  }

  render() {
    const { store } = this.props
    const aeEigenschaften = mobX.toJS(store.data.aeEigenschaften)
    return (
      <div className={styles.container}>
        <AutoComplete
          hintText={store.data.aeEigenschaftenLoading.length === 0 ? 'lade Daten...' : ''}
          dataSource={aeEigenschaften}
          dataSourceConfig={{
            value: 'id',
            text: 'label',
          }}
          fullWidth
          floatingLabelText="Art"
          maxSearchResults={20}
          listStyle={{
            borderStyle: 'none',
          }}
          filter={AutoComplete.caseInsensitiveFilter}
          onNewRequest={(element) => {
            console.log('element:', element)
          }}
        />
      </div>
    )
  }
}

Pop.propTypes = {
  store: PropTypes.object,
}

export default inject('store')(observer(Pop))
