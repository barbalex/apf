import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import styled from 'styled-components'

import TextField from '../../../shared/TextField'
import FormTitle from '../../../shared/FormTitle'

@inject(`store`)
@observer
class Apberuebersicht extends Component { // eslint-disable-line react/prefer-stateless-function

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
}

export default Apberuebersicht
