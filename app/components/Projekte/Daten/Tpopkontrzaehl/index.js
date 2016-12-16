import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import sortBy from 'lodash/sortBy'
import styled from 'styled-components'

import RadioButtonGroup from '../../../shared/RadioButtonGroup'
import Label from '../../../shared/Label'
import TextField from '../../../shared/TextField'
import FormTitle from '../../../shared/FormTitle'
import SelectField from '../../../shared/SelectField'

@inject(`store`)
@observer
class Tpopkontrzaehl extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: PropTypes.object,
  }

  render() {
    const { store } = this.props
    const { activeDataset } = store
    const zaehleinheitWerte = sortBy(
      Array.from(store.table.tpopkontrzaehl_einheit_werte.values()),
      `ZaehleinheitOrd`
    ).map(el => ({
      value: el.ZaehleinheitCode,
      label: el.ZaehleinheitTxt,
    }))
    const methodeWerte = sortBy(
      Array.from(store.table.tpopkontrzaehl_methode_werte.values()),
      `BeurteilOrd`
    ).map(el => ({
      value: el.BeurteilCode,
      label: el.BeurteilTxt,
    }))
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

    return (
      <Container>
        <FormTitle title="Zählung" />
        <FieldsContainer>
          <TextField
            label="Anzahl"
            fieldName="Anzahl"
            value={activeDataset.row.Anzahl}
            errorText={activeDataset.valid.Anzahl}
            type="number"
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <SelectField
            label="Einheit"
            fieldName="Zaehleinheit"
            value={activeDataset.row.Zaehleinheit}
            errorText={activeDataset.valid.Zaehleinheit}
            dataSource={zaehleinheitWerte}
            valueProp="value"
            labelProp="label"
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <Label label="Methode" />
          <RadioButtonGroup
            fieldName="Methode"
            value={activeDataset.row.Methode}
            errorText={activeDataset.valid.Methode}
            dataSource={methodeWerte}
            updatePropertyInDb={store.updatePropertyInDb}
          />
        </FieldsContainer>
      </Container>
    )
  }
}

export default Tpopkontrzaehl
