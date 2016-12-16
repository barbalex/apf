import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import styled from 'styled-components'

import TextField from '../../../shared/TextField'
import TextFieldWithUrl from '../../../shared/TextFieldWithUrl'
import FormTitle from '../../../shared/FormTitle'

@inject(`store`)
@observer
class Ber extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: PropTypes.object,
  }

  render() {
    const { store } = this.props
    const { activeDataset } = store
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
        <FormTitle title="Bericht" />
        <FieldsContainer>
          <TextField
            label="AutorIn"
            fieldName="BerAutor"
            value={activeDataset.row.BerAutor}
            errorText={activeDataset.valid.BerAutor}
            type="text"
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <TextField
            label="Jahr"
            fieldName="BerJahr"
            value={activeDataset.row.BerJahr}
            errorText={activeDataset.valid.BerJahr}
            type="number"
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <TextField
            label="Titel"
            fieldName="BerTitel"
            value={activeDataset.row.BerTitel}
            errorText={activeDataset.valid.BerTitel}
            type="text"
            multiLine
            fullWidth
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <TextField
            label="URL"
            fieldName="BerURL"
            value={activeDataset.row.BerURL}
            errorText={activeDataset.valid.BerURL}
            type="text"
            multiLine
            fullWidth
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <TextFieldWithUrl
            label="URL"
            fieldName="BerURL"
            value={activeDataset.row.BerURL}
            errorText={activeDataset.valid.BerURL}
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

export default Ber
