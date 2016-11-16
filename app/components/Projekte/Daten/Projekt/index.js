import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import TextField from '../../../shared/TextField'
import styles from './styles.css'

@inject(`store`)
@observer
class Projekt extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: PropTypes.object,
  }

  render() {
    const { store } = this.props
    const { activeNode } = store.data

    console.log(`Project: activeNode.row.ProjName:`, activeNode.row.ProjName)

    return (
      <div className={styles.container}>
        <TextField
          label="Name"
          fieldName="ProjName"
          value={activeNode.row.ProjName}
          errorText={activeNode.valid.ProjName}
          type="text"
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
      </div>
    )
  }
}

export default Projekt
