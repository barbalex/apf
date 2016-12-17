import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import sortBy from 'lodash/sortBy'
import styled from 'styled-components'

import RadioButtonGroup from '../../shared/RadioButtonGroup'
import Label from '../../shared/Label'
import TextField from '../../shared/TextField'
import FormTitle from '../../shared/FormTitle'

const Container = styled.div`
  height: 100%;
`
const FieldsContainer = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  overflow-x: auto;
  height: 100%;
  padding-bottom: 95px;
`

@inject(`store`)
@observer
class Erfkrit extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: PropTypes.object,
  }

  get apErfkritWerte() {
    const { store } = this.props
    let apErfkritWerte = Array.from(store.table.ap_erfkrit_werte.values())
    apErfkritWerte = sortBy(apErfkritWerte, `BeurteilOrd`)
    return apErfkritWerte.map(el => ({
      value: el.BeurteilId,
      label: el.BeurteilTxt,
    }))
  }

  render() {
    const { store } = this.props
    const { activeDataset } = store

    return (
      <Container>
        <FormTitle title="Erfolgs-Kriterium" />
        <FieldsContainer>
          <Label label="Beurteilung" />
          <RadioButtonGroup
            fieldName="ErfkritErreichungsgrad"
            value={activeDataset.row.ErfkritErreichungsgrad}
            errorText={activeDataset.valid.ErfkritErreichungsgrad}
            dataSource={this.apErfkritWerte}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <TextField
            label="Kriterien"
            fieldName="ErfkritTxt"
            value={activeDataset.row.ErfkritTxt}
            errorText={activeDataset.valid.ErfkritTxt}
            type="text"
            multiLine
            fullWidth
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
        </FieldsContainer>
      </Container>
    )
  }
}

export default Erfkrit
