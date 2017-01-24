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
    let tpopEntwicklungWerte = Array.from(store.table.tpop_entwicklung_werte.values())
    tpopEntwicklungWerte = sortBy(tpopEntwicklungWerte, `EntwicklungOrd`)
    tpopEntwicklungWerte = tpopEntwicklungWerte.map(el => ({
      value: el.EntwicklungCode,
      label: el.EntwicklungTxt,
    }))
    return { tpopEntwicklungWerte, activeDataset }
  }),
  observer
)

const Tpopber = ({
  store,
  tpopEntwicklungWerte,
  activeDataset,
}) =>
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
        dataSource={tpopEntwicklungWerte}
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

Tpopber.propTypes = {
  store: PropTypes.object.isRequired,
  tpopEntwicklungWerte: PropTypes.array.isRequired,
  activeDataset: PropTypes.object.isRequired,
}

export default enhance(Tpopber)
