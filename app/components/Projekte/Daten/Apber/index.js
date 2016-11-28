import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import mobX from 'mobx'
import RadioButtonGroup from '../../../shared/RadioButtonGroup'
import Label from '../../../shared/Label'
import TextField from '../../../shared/TextField'
import styles from './styles.css'

@inject(`store`)
@observer
class Apber extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: PropTypes.object,
  }

  componentDidMount() {
    // fetch dropdown data
    const { store } = this.props
    store.fetchTable(`apflora`, `ap_erfkrit_werte`)
  }

  render() {
    const { store } = this.props
    const apErfkritWerte = mobX.toJS(store.table.ap_erfkrit_werte)
    const activeNode = store.activeDataset
    return (
      <div className={styles.container}>
        <TextField
          label="Jahr"
          fieldName="JBerJahr"
          value={activeNode.row.JBerJahr}
          errorText={activeNode.valid.JBerJahr}
          type="number"
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <div className={styles.fieldContainer}>
          <Label label="Beurteilung" />
          <RadioButtonGroup
            fieldName="JberBeurteilung"
            value={activeNode.row.JberBeurteilung}
            errorText={activeNode.valid.JberBeurteilung}
            dataSource={apErfkritWerte}
            updatePropertyInDb={store.updatePropertyInDb}
          />
        </div>
        <TextField
          label="Kriterien"
          fieldName="ErfkritTxt"
          value={activeNode.row.ErfkritTxt}
          errorText={activeNode.valid.ErfkritTxt}
          type="text"
          multiLine
          fullWidth
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
      </div>
    )
  }
}

export default Apber
