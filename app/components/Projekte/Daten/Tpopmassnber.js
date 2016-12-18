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
class Tpopmassnber extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: PropTypes.object,
  }

  get tpopmassnErfbeurtWerte() {
    const { store } = this.props
    let werte = Array.from(store.table.tpopmassn_erfbeurt_werte.values())
    werte = sortBy(werte, `BeurteilOrd`)
    return werte.map(el => ({
      value: el.BeurteilId,
      label: el.BeurteilTxt,
    }))
  }

  render() {
    const { store } = this.props
    const { activeDataset } = store

    return (
      <Container>
        <FormTitle title="Massnahmen-Bericht Teil-Population" />
        <FieldsContainer>
          <TextField
            label="Jahr"
            fieldName="TPopMassnBerJahr"
            value={activeDataset.row.TPopMassnBerJahr}
            errorText={activeDataset.valid.TPopMassnBerJahr}
            type="number"
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <Label label="Entwicklung" />
          <RadioButtonGroup
            fieldName="TPopMassnBerErfolgsbeurteilung"
            value={activeDataset.row.TPopMassnBerErfolgsbeurteilung}
            errorText={activeDataset.valid.TPopMassnBerErfolgsbeurteilung}
            dataSource={this.tpopmassnErfbeurtWerte}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <TextField
            label="Interpretation"
            fieldName="TPopMassnBerTxt"
            value={activeDataset.row.TPopMassnBerTxt}
            errorText={activeDataset.valid.TPopMassnBerTxt}
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

export default Tpopmassnber
