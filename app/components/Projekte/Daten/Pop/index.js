/*
 *
 * Population
 *
 */

import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import mobX from 'mobx'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import styles from './styles.css'

const Pop = @observer class Pop extends Component { // eslint-disable-line react/prefer-stateless-function
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

  static propTypes = {
    store: PropTypes.object,
  }

  render() {
    const { store } = this.props
    const aeEigenschaften = mobX.toJS(store.data.aeEigenschaften)
    aeEigenschaften.unshift({
      label: '',
      id: null,
    })
    return (
      <div className={styles.container}>
        <SelectField
          hintText={store.data.aeEigenschaftenLoading ? 'lade Daten...' : ''}
          fullWidth
          floatingLabelText="Art"
          maxHeight={20}
          value={store.data.activeDataset.ApArtId}
          onChange={(element) => {
            console.log('element:', element)
          }}
        >
          {
            aeEigenschaften.map((e, index) =>
              <MenuItem value={e.id} primaryText={e.label} key={index} />
            )
          }
        </SelectField>
      </div>
    )
  }
}

export default inject('store')(Pop)
