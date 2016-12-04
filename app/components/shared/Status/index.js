import React, { Component, PropTypes } from 'react'
import { observer } from 'mobx-react'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import TextField from '../TextField'
import Label from '../Label'
import styles from './styles.css'

@observer
class Status extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    herkunftFieldName: PropTypes.string.isRequired,
    herkunftValue: PropTypes.number,
    herkunftValid: PropTypes.object,
    bekanntSeitFieldName: PropTypes.string,
    bekanntSeitValue: PropTypes.number,
    bekanntSeitValid: PropTypes.object,
    updateProperty: PropTypes.func.isRequired,
    updatePropertyInDb: PropTypes.func.isRequired,
  }

  render() {
    const {
      herkunftFieldName,
      herkunftValue,
      herkunftValid,
      bekanntSeitFieldName,
      bekanntSeitValue,
      bekanntSeitValid,
      updateProperty,
      updatePropertyInDb,
    } = this.props
    const valueSelected = (herkunftValue !== null && herkunftValue !== undefined) ? herkunftValue : ``
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
              />
              <RadioButton
                value={101}
                label="erloschen"
                key={2}
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
              <RadioButton
                value={200}
                label="aktuell"
                key={1}
              />
              <RadioButton
                value={201}
                label="Ansaatversuch"
                key={2}
              />
              <RadioButton
                value={211}
                label="erloschen / nicht etabliert"
                key={3}
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
