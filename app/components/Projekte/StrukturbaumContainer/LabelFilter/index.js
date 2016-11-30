/* eslint-disable no-console, jsx-a11y/no-static-element-interactions */

import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import TextField from 'material-ui/TextField'

import styles from './styles.css'

@inject(`store`)
@observer
class LabelFilter extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: PropTypes.object,
  }

  render() {  // eslint-disable-line class-methods-use-this
    const { store } = this.props
    const { activeDataset, node } = store
    let filterValue = ``
    let filteredTable
    if (activeDataset) {
      filteredTable = activeDataset.table
      console.log(`filteredTable:`, filteredTable)
      if (filteredTable) {
        filterValue = node.nodeLabelFilter.get(filteredTable)
        console.log(`filterValue:`, filterValue)
      }
    }
    return (
      <TextField
        floatingLabelText="Filter"
        value={filterValue || ``}
        onChange={(event, val) => {
          console.log(`val:`, val)
          console.log(`filteredTable:`, filteredTable)
          store.updateLabelFilter(filteredTable, val)
        }}
        className={styles.filterField}
      />
    )
  }
}

export default LabelFilter
