import React, { Component, PropTypes } from 'react'
import { observer } from 'mobx-react'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import TextField from '../TextField'
import Label from '../Label'
import styles from './styles.css'

@observer
class Status extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    apJahr: PropTypes.number.isRequired,
    herkunftFieldName: PropTypes.string.isRequired,
    herkunftValue: PropTypes.number,
    herkunftValid: PropTypes.string,
    bekanntSeitFieldName: PropTypes.string,
    bekanntSeitValue: PropTypes.number,
    bekanntSeitValid: PropTypes.string,
    updateProperty: PropTypes.func.isRequired,
    updatePropertyInDb: PropTypes.func.isRequired,
  }

  render() {
    const {
      apJahr,
      herkunftFieldName,
      herkunftValue,
      herkunftValid,
      bekanntSeitFieldName,
      bekanntSeitValue,
      bekanntSeitValid,
      updateProperty,
      updatePropertyInDb,
    } = this.props
    const valueSelected = (
      (herkunftValue !== null && herkunftValue !== undefined) ?
      herkunftValue :
      ``
    )
    const showHerkunft200 = (
      bekanntSeitValue &&
      apJahr &&
      (apJahr <= bekanntSeitValue)
    )
    const showHerkunft210 = (
      bekanntSeitValue &&
      apJahr &&
      (apJahr > bekanntSeitValue)
    )
    console.log(`Status: apJahr:`, apJahr)
    console.log(`Status: bekanntSeitValue:`, bekanntSeitValue)
    console.log(`Status: showHerkunft200 (angesiedelt nach Beginn AP):`, showHerkunft200)
    console.log(`Status: showHerkunft210 (angesiedelt vor Beginn AP):`, showHerkunft210)
    return (
      <div>
        <TextField
          label="bekannt seit"
          fieldName={bekanntSeitFieldName}
          value={bekanntSeitValue}
          errorText={bekanntSeitValid}
          type="number"
          updateProperty={updateProperty}
          updatePropertyInDb={updatePropertyInDb}
        />
        <Label label="Status" />
        <div className={styles.herkunft}>
          <div className={styles.herkunftColumn}>
            <div className={styles.groupLabel}>ursprünglich:</div>
            <RadioButtonGroup
              name={herkunftFieldName}
              valueSelected={valueSelected}
              onChange={(event, valuePassed) => {
                // if clicked element is active herkunftValue: set null
                const val = valuePassed === herkunftValue ? null : valuePassed
                updatePropertyInDb(herkunftFieldName, val)
              }}
            >
              <RadioButton
                value={100}
                label="aktuell"
                key={1}
                disabled={!bekanntSeitValue && bekanntSeitValue !== 0}
              />
              <RadioButton
                value={101}
                label="erloschen"
                key={2}
                disabled={!bekanntSeitValue && bekanntSeitValue !== 0}
              />
            </RadioButtonGroup>
          </div>
          <div className={styles.herkunftColumn}>
            <div className={styles.groupLabel}>angesiedelt:</div>
            <RadioButtonGroup
              name={herkunftFieldName}
              valueSelected={valueSelected}
              onChange={(event, valuePassed) => {
                // if clicked element is active herkunftValue: set null
                const val = valuePassed === herkunftValue ? null : valuePassed
                updatePropertyInDb(herkunftFieldName, val)
              }}
            >
              {
                showHerkunft200 &&
                  <RadioButton
                    value={200}
                    label="aktuell (angesiedelt nach Beginn AP)"
                    key={1}
                    disabled={!bekanntSeitValue && bekanntSeitValue !== 0}
                  />
              }
              {
                showHerkunft210 &&
                  <RadioButton
                    value={210}
                    label="aktuell (angesiedelt vor Beginn AP)"
                    key={2}
                    disabled={!bekanntSeitValue && bekanntSeitValue !== 0}
                  />
              }
              <RadioButton
                value={201}
                label="Ansaatversuch"
                key={3}
                disabled={!bekanntSeitValue && bekanntSeitValue !== 0}
              />
              <RadioButton
                value={211}
                label="erloschen / nicht etabliert"
                key={4}
                disabled={!bekanntSeitValue && bekanntSeitValue !== 0}
              />
            </RadioButtonGroup>
          </div>
          <div className={styles.herkunftColumn}>
            <div className={styles.groupLabel}>potenziell:</div>
            <RadioButtonGroup
              name={herkunftFieldName}
              valueSelected={valueSelected}
              onChange={(event, valuePassed) => {
                // if clicked element is active herkunftValue: set null
                const val = valuePassed === herkunftValue ? null : valuePassed
                updatePropertyInDb(herkunftFieldName, val)
              }}
            >
              <RadioButton
                value={300}
                label="potenzieller Wuchs-/Ansiedlungsort"
                key={1}
                disabled={!bekanntSeitValue && bekanntSeitValue !== 0}
              />
            </RadioButtonGroup>
          </div>
        </div>
        <div style={{ height: `55px` }} />
      </div>
    )
  }
}

export default Status
