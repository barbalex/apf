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
class Tpopber extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: PropTypes.object,
  }

  get tpopEntwicklungWerte() {
    const { store } = this.props
    let tpopEntwicklungWerte = Array.from(store.table.tpop_entwicklung_werte.values())
    tpopEntwicklungWerte = sortBy(tpopEntwicklungWerte, `EntwicklungOrd`)
    return tpopEntwicklungWerte.map(el => ({
      value: el.EntwicklungCode,
      label: el.EntwicklungTxt,
    }))
  }

  render() {
    const { store } = this.props
    const { activeDataset } = store

    return (
      <Container>
        <FormTitle title="Kontroll-Bericht Teil-Population" />
        <FieldsContainer>
          <TextField
            label="Jahr"
            fieldName="TPopBerJahr"
            value={activeDataset.row.TPopBerJahr}
            errorText={activeDataset.valid.TPopBerJahr}
            type="number"
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <Label label="Entwicklung" />
          <RadioButtonGroup
            fieldName="TPopBerEntwicklung"
            value={activeDataset.row.TPopBerEntwicklung}
            errorText={activeDataset.valid.TPopBerEntwicklung}
            dataSource={this.tpopEntwicklungWerte}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <TextField
            label="Bemerkungen"
            fieldName="TPopBerTxt"
            value={activeDataset.row.TPopBerTxt}
            errorText={activeDataset.valid.TPopBerTxt}
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

export default Tpopber
