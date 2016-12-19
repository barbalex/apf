import React, { PropTypes } from 'react'
import { inject } from 'mobx-react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import tables from '../../modules/tables'

@inject(`store`)
class DatasetDeleteModal extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: PropTypes.object,
  }

  constructor() {
    super()
    this.onClickAbort = this.onClickAbort.bind(this)
    this.onClickDelete = this.onClickDelete.bind(this)
  }

  onClickAbort() {
    const { store } = this.props
    store.deleteDatasetAbort()
  }

  onClickDelete() {
    const { store } = this.props
    store.deleteDatasetExecute()
  }

  render() {
    const { store } = this.props
    const actions = [
      <FlatButton
        label="Abbrechen"
        onTouchTap={this.onClickAbort}
      />,
      <FlatButton
        label="Löschen"
        primary
        keyboardFocused
        onTouchTap={this.onClickDelete}
      />,
    ]
    const table = tables.find(t => t.table === store.datasetToDelete.table)
    let tableName = null
    if (table && table.labelSingular) {
      tableName = table.labelSingular
    }

    return (
      <Dialog
        actions={actions}
        modal
        open={!!store.datasetToDelete.id}
      >
        {`${tableName ? `${tableName} "` : ``}${store.datasetToDelete.label}${tableName ? `"` : ``} löschen?`}
      </Dialog>
    )
  }
}

export default DatasetDeleteModal
