import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import mobX from 'mobx'
import RadioButtonGroup from '../../../shared/RadioButtonGroup'
import Label from '../../../shared/Label'
import TextField from '../../../shared/TextField'
import styles from './styles.css'

@inject(`store`)
@observer
class Erfkrit extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: PropTypes.object,
  }

  componentDidMount() {
    // fetch dropdown data
    const { store } = this.props
    store.fetchApErfkritWerte()
  }

  render() {
    const { store } = this.props
    const apErfkritWerte = mobX.toJS(store.table.ap_erfkrit_werte)
    const activeNode = store.node.activeNode
    return (
      <div className={styles.container}>
        <div className={styles.fieldContainer}>
          <Label label="Beurteilung" />
          <RadioButtonGroup
            fieldName="ErfkritErreichungsgrad"
            value={activeNode.row.ErfkritErreichungsgrad}
            errorText={activeNode.valid.ErfkritErreichungsgrad}
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

export default Erfkrit
