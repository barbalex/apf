import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import sortBy from 'lodash/sortBy'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withProps from 'recompose/withProps'

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

const enhance = compose(
  inject(`store`),
  withProps((props) => {
    const { store } = props
    const { activeDataset } = store
    let tpopmassnErfbeurtWerte = Array.from(store.table.tpopmassn_erfbeurt_werte.values())
    tpopmassnErfbeurtWerte = sortBy(tpopmassnErfbeurtWerte, `BeurteilOrd`)
    tpopmassnErfbeurtWerte = tpopmassnErfbeurtWerte.map(el => ({
      value: el.BeurteilId,
      label: el.BeurteilTxt,
    }))
    return { tpopmassnErfbeurtWerte, activeDataset }
  }),
  observer
)

const Tpopmassnber = ({
  store,
  tpopmassnErfbeurtWerte,
  activeDataset,
}) =>
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
        dataSource={tpopmassnErfbeurtWerte}
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

Tpopmassnber.propTypes = {
  store: PropTypes.object.isRequired,
  tpopmassnErfbeurtWerte: PropTypes.array.isRequired,
  activeDataset: PropTypes.object.isRequired,
}

export default enhance(Tpopmassnber)
