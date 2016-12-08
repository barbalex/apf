/* eslint-disable no-console, jsx-a11y/no-static-element-interactions */

import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import TextField from 'material-ui/TextField'

import tables from '../../../../modules/tables'
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
    let labelText = `filtern`
    let filterValue = ``
    let filteredTable
    if (activeDataset) {
      filteredTable = activeDataset.table
      if (filteredTable) {
        filterValue = node.nodeLabelFilter.get(filteredTable)
        const table = tables.find(t => t.table === filteredTable)
        const tableLabel = table ? table.label : null
        if (tableLabel) {
          labelText = `${tableLabel} filtern`
        }
      }
    }
    return (
      <TextField
        floatingLabelText={labelText}
        fullWidth
        value={filterValue || ``}
        onChange={(event, val) =>
          store.updateLabelFilter(filteredTable, val)
        }
        className={styles.filterField}
      />
    )
  }
}

export default LabelFilter
