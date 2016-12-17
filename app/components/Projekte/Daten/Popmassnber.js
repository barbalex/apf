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
class Popmassnber extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: PropTypes.object,
  }

  get tpopmassnErfbeurtWerte() {
    const { store } = this.props
    let tpopmassnErfbeurtWerte = Array.from(store.table.tpopmassn_erfbeurt_werte.values())
    tpopmassnErfbeurtWerte = sortBy(tpopmassnErfbeurtWerte, `BeurteilOrd`)
    return tpopmassnErfbeurtWerte.map(el => ({
      value: el.BeurteilId,
      label: el.BeurteilTxt,
    }))
  }

  render() {
    const { store } = this.props
    const { activeDataset } = store

    return (
      <Container>
        <FormTitle title="Massnahmen-Bericht Population" />
        <FieldsContainer>
          <TextField
            label="Jahr"
            fieldName="PopMassnBerJahr"
            value={activeDataset.row.PopMassnBerJahr}
            errorText={activeDataset.valid.PopMassnBerJahr}
            type="number"
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <Label label="Entwicklung" />
          <RadioButtonGroup
            fieldName="PopMassnBerErfolgsbeurteilung"
            value={activeDataset.row.PopMassnBerErfolgsbeurteilung}
            errorText={activeDataset.valid.PopMassnBerErfolgsbeurteilung}
            dataSource={this.tpopmassnErfbeurtWerte}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <TextField
            label="Interpretation"
            fieldName="PopMassnBerTxt"
            value={activeDataset.row.PopMassnBerTxt}
            errorText={activeDataset.valid.PopMassnBerTxt}
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

export default Popmassnber
