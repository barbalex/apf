import React from 'react'
import styled from 'styled-components'

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

export default class Exporte extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Container>
        <FormTitle title="Exporte" />
        <FieldsContainer>
          Exporte
        </FieldsContainer>
      </Container>
    )
  }
}
