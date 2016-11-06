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
  /*
  constructor() {
    super()
    // this.activeForm = this.activeForm.bind(this);
  }*/

  componentDidMount() {
    // fetch dropdown data
    const { store } = this.props
    store.fetchAeEigenschaften()
  }

  render() {
    const { store } = this.props
    const aeEigenschaften = mobX.toJS(store.data.aeEigenschaften)
    const ApArtId = (
      store.data.activeDataset
      && store.data.activeDataset.row
      && store.data.activeDataset.row.ApArtId ?
      store.data.activeDataset.row.ApArtId :
      null
    )
    let searchText = ''
    if (ApArtId && aeEigenschaften.length > 0) {
      searchText = aeEigenschaften.find(e => e.id === ApArtId).label
    }
    return (
      <div className={styles.container}>
        <AutoComplete
          hintText={store.data.aeEigenschaftenLoading.length === 0 ? 'lade Daten...' : ''}
          fullWidth
          floatingLabelText="Art"
          openOnFocus
          dataSource={aeEigenschaften}
          dataSourceConfig={{
            value: 'id',
            text: 'label',
          }}
          searchText={searchText}
          filter={AutoComplete.caseInsensitiveFilter}
          maxSearchResults={20}
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
