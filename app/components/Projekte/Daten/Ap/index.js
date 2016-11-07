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
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import TextField from 'material-ui/TextField'
import Popover from 'material-ui/Popover'

const Pop = class Pop extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor() {
    super()
    this.state = {
      apStatusLabelPopupOpen: false,
      apStatusLabelPopupAncherEl: null,
      apUmsetzungLabelPopupOpen: false,
    }
  }

  componentDidMount() {
    // fetch dropdown data
    const { store } = this.props
    store.fetchAeEigenschaften()
    store.fetchApStatus()
    store.fetchApUmsetzung()
  }

  render() {
    const { store } = this.props
    const {
      apStatusLabelPopupOpen,
      apUmsetzungLabelPopupOpen,
    } = this.state
    const aeEigenschaften = mobX.toJS(store.data.aeEigenschaften)
    const apStati = mobX.toJS(store.data.apStatus)
    const apUmsetzungen = mobX.toJS(store.data.apUmsetzung)
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
          hintText={store.data.aeEigenschaftenLoading ? 'lade Daten...' : ''}
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
            console.log('element clicked:', element)
          }}
        />
        <div className={styles.fieldContainer}>
          <div
            className={styles.labelWithPopover}
            onClick={(event) => {
              event.preventDefault()
              this.setState({
                apStatusLabelPopupOpen: !apStatusLabelPopupOpen,
                apStatusLabelPopupAncherEl: event.currentTarget,
              })
            }}
          >
            Aktionsplan
            <Popover
              open={apStatusLabelPopupOpen}
              anchorEl={this.state.apStatusLabelPopupAncherEl}
              anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
              targetOrigin={{ horizontal: 'left', vertical: 'bottom' }}
              animated
              autoCloseWhenOffScreen
              canAutoPosition
              onRequestClose={() => {
                this.setState({ apStatusLabelPopupOpen: false })
              }}
              style={{
                borderRadius: '4px',
              }}
            >
              <div className={styles.labelPopoverTitleRow}>
                Legende
              </div>
              <div className={styles.labelPopoverContentRow}>
                <div className={styles.labelPopoverRowColumnLeft}>
                  keiner:
                </div>
                <div className={styles.labelPopoverRowColumnRight}>
                  kein Aktionsplan vorgesehen
                </div>
              </div>
              <div className={styles.labelPopoverContentRow}>
                <div className={styles.labelPopoverRowColumnLeft}>
                  erstellt:
                </div>
                <div className={styles.labelPopoverRowColumnRight}>
                  Aktionsplan fertig, auf der Webseite der FNS
                </div>
              </div>
            </Popover>
          </div>
          <RadioButtonGroup
            name="ApStatus"
            valueSelected={store.data.activeDataset.row.ApStatus}
            floatingLabelText="test"
            onChange={(event, value) => {
              // TODO: if clicked element is active value
              // set null
              console.log('value clicked:', value)
            }}
          >
            {
              apStati.map((e, index) =>
                <RadioButton
                  value={e.DomainCode}
                  label={e.DomainTxt}
                  key={index}
                />
              )
            }
          </RadioButtonGroup>
        </div>
        <TextField
          floatingLabelText="Start im Jahr"
          type="number"
          value={store.data.activeDataset.row.ApJahr}
        />
        <div className={styles.fieldContainer}>
          <div className={styles.label}>
            Stand Umsetzung
          </div>
          <RadioButtonGroup
            name="ApUmsetzung"
            valueSelected={store.data.activeDataset.row.ApUmsetzung}
            floatingLabelText="test"
            onChange={(event, value) => {
              // TODO: if clicked element is active value
              // set null
              console.log('value clicked:', value)
            }}
          >
            {
              apUmsetzungen.map((e, index) =>
                <RadioButton
                  value={e.DomainCode}
                  label={e.DomainTxt}
                  key={index}
                />
              )
            }
          </RadioButtonGroup>
        </div>
      </div>
    )
  }
}

Pop.propTypes = {
  store: PropTypes.object,
}

export default inject('store')(observer(Pop))
