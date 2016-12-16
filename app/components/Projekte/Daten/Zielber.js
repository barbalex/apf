import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import styled from 'styled-components'

import TextField from '../../shared/TextField'
import FormTitle from '../../shared/FormTitle'

@inject(`store`)
@observer
class Zielber extends Component { // eslint-disable-line react/prefer-stateless-function

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
        <FormTitle title="Ziel-Bericht" />
        <FieldsContainer>
          <TextField
            label="Jahr"
            fieldName="ZielBerJahr"
            value={activeDataset.row.ZielBerJahr}
            errorText={activeDataset.valid.ZielBerJahr}
            type="number"
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <TextField
            label="Entwicklung"
            fieldName="ZielBerErreichung"
            value={activeDataset.row.ZielBerErreichung}
            errorText={activeDataset.valid.ZielBerErreichung}
            type="text"
            fullWidth
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <TextField
            label="Bemerkungen"
            fieldName="ZielBerTxt"
            value={activeDataset.row.ZielBerTxt}
            errorText={activeDataset.valid.ZielBerTxt}
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

export default Zielber
