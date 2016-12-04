/*
 *
 * Population
 *
 */

import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import TextField from '../../../shared/TextField'
import InfoWithPopover from '../../../shared/InfoWithPopover'
import styles from './styles.css'

@inject(`store`)
@observer
class Pop extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: PropTypes.object,
  }

  render() {
    const { store } = this.props
    const { activeDataset } = store

    return (
      <div className={styles.container}>
        <TextField
          label="Nr."
          fieldName="PopNr"
          value={activeDataset.row.PopNr}
          errorText={activeDataset.valid.PopNr}
          type="number"
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <div className={styles.fieldWithInfoContainer}>
          <TextField
            label="Name"
            fieldName="PopName"
            value={activeDataset.row.PopName}
            errorText={activeDataset.valid.PopName}
            type="text"
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <InfoWithPopover>
            <div className={styles.popoverContentRow}>
              Dieses Feld möglichst immer ausfüllen
            </div>
          </InfoWithPopover>
        </div>
      </div>
    )
  }
}

export default Pop
