import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withProps from 'recompose/withProps'

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
    return { activeDataset }
  }),
  observer
)

const Projekt = ({
  store,
  activeDataset,
}) =>
  <Container>
    <FormTitle title="Projekt" />
    <FieldsContainer>
      <TextField
        label="Name"
        fieldName="ProjName"
        value={
          (activeDataset && activeDataset.row && activeDataset.row.ProjName) ?
          activeDataset.row.ProjName :
          ``
        }
        errorText={
          (activeDataset && activeDataset.valid && activeDataset.valid.ProjName) ?
          activeDataset.valid.ProjName :
          ``
        }
        type="text"
        updateProperty={store.updateProperty}
        updatePropertyInDb={store.updatePropertyInDb}
      />
    </FieldsContainer>
  </Container>

Projekt.propTypes = {
  store: PropTypes.object.isRequired,
  activeDataset: PropTypes.object.isRequired,
}

export default enhance(Projekt)
