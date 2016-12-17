import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import styled from 'styled-components'

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
class Projekt extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: PropTypes.object,
  }

  render() {
    const { store } = this.props
    const { activeDataset } = store

    return (
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
    )
  }
}

export default Projekt
