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
class Ziel extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: PropTypes.object,
  }

  get zielTypWerte() {
    const { store } = this.props
    let werte = Array.from(store.table.ziel_typ_werte.values())
    werte = sortBy(werte, `ZieltypOrd`)
    werte = werte.map(el => ({
      value: el.ZieltypId,
      label: el.ZieltypTxt,
    }))
    return werte
  }

  render() {
    const { store } = this.props
    const { activeDataset } = store

    return (
      <Container>
        <FormTitle title="Ziel" />
        <FieldsContainer>
          <TextField
            label="Jahr"
            fieldName="ZielJahr"
            value={activeDataset.row.ZielJahr}
            errorText={activeDataset.valid.ZielJahr}
            type="number"
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <Label label="Zieltyp" />
          <RadioButtonGroup
            fieldName="ZielTyp"
            value={activeDataset.row.ZielTyp}
            errorText={activeDataset.valid.ZielTyp}
            dataSource={this.zielTypWerte}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <TextField
            label="Ziel"
            fieldName="ZielBezeichnung"
            value={activeDataset.row.ZielBezeichnung}
            errorText={activeDataset.valid.ZielBezeichnung}
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

export default Ziel
