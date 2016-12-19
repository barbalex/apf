import React, { PropTypes } from 'react'
import { inject } from 'mobx-react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

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
    console.log(`DeleteDatasetModal: !!datasetToDelete:`, !!store.datasetToDelete)
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
    return (
      <Dialog
        actions={actions}
        modal
        open={!!store.datasetToDelete.id}
      >
        {store.datasetToDelete.label} löschen?
      </Dialog>
    )
  }
}

export default DatasetDeleteModal
