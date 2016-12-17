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
class Popber extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: PropTypes.object,
  }

  get popEntwicklungWerte() {
    const { store } = this.props
    let popEntwicklungWerte = Array.from(store.table.pop_entwicklung_werte.values())
    popEntwicklungWerte = sortBy(popEntwicklungWerte, `EntwicklungOrd`)
    return popEntwicklungWerte.map(el => ({
      value: el.EntwicklungId,
      label: el.EntwicklungTxt,
    }))
  }

  render() {
    const { store } = this.props
    const { activeDataset } = store

    return (
      <Container>
        <FormTitle title="Kontroll-Bericht Population" />
        <FieldsContainer>
          <TextField
            label="Jahr"
            fieldName="PopBerJahr"
            value={activeDataset.row.PopBerJahr}
            errorText={activeDataset.valid.PopBerJahr}
            type="number"
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <Label label="Entwicklung" />
          <RadioButtonGroup
            fieldName="PopBerEntwicklung"
            value={activeDataset.row.PopBerEntwicklung}
            errorText={activeDataset.valid.PopBerEntwicklung}
            dataSource={this.popEntwicklungWerte}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <TextField
            label="Bemerkungen"
            fieldName="PopBerTxt"
            value={activeDataset.row.PopBerTxt}
            errorText={activeDataset.valid.PopBerTxt}
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

export default Popber
