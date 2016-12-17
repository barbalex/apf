/* eslint-disable no-console, jsx-a11y/no-static-element-interactions */

import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import TextField from 'material-ui/TextField'
import styled from 'styled-components'

import tables from '../../../modules/tables'

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
    const FilterField = styled(TextField)`
      margin-top: -0.6em;
      padding: 0 0.8em 0 0.8em;
    `

    return (
      <FilterField
        floatingLabelText={labelText}
        fullWidth
        value={filterValue || ``}
        onChange={(event, val) =>
          store.updateLabelFilter(filteredTable, val)
        }
      />
    )
  }
}

export default LabelFilter
