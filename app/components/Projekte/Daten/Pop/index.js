/*
 *
 * Population
 *
 */

import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import TextField from '../../../shared/TextField'
import InfoWithPopover from '../../../shared/InfoWithPopover'
import Status from '../../../shared/Status'
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
    const apJahr = store.table.ap.get(activeDataset.row.ApArtId).ApJahr

    console.log(`Pop: apJahr:`, apJahr)
    console.log(`Pop: activeDataset.row.PopBekanntSeit:`, activeDataset.row.PopBekanntSeit)
    console.log(`Pop: activeDataset.row.PopHerkunft:`, activeDataset.row.PopHerkunft)

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
        <Status
          apJahr={apJahr}
          herkunftFieldName="PopHerkunft"
          herkunftValue={activeDataset.row.PopHerkunft}
          herkunftValid={activeDataset.valid.PopHerkunft}
          bekanntSeitFieldName="PopBekanntSeit"
          bekanntSeitValue={activeDataset.row.PopBekanntSeit}
          bekanntSeitValid={activeDataset.valid.PopBekanntSeit}
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
      </div>
    )
  }
}

export default Pop
