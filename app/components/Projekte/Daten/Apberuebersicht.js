import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import styled from 'styled-components'
import compose from 'recompose/compose'

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
  observer
)

const Apberuebersicht = ({ store }) => {
  const { activeDataset } = store

  return (
    <Container>
      <FormTitle title="AP-Bericht Jahresübersicht" />
      <FieldsContainer>
        <TextField
          label="Jahr"
          fieldName="JbuJahr"
          value={activeDataset.row.JbuJahr}
          errorText={activeDataset.valid.JbuJahr}
          type="number"
          fullWidth={false}
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <TextField
          label="Bemerkungen"
          fieldName="JbuBemerkungen"
          value={activeDataset.row.JbuBemerkungen}
          errorText={activeDataset.valid.JbuBemerkungen}
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

Apberuebersicht.propTypes = {
  store: PropTypes.object.isRequired,
}

export default enhance(Apberuebersicht)
