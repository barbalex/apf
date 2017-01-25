import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import TextField from 'material-ui/TextField'
import Linkify from 'react-linkify'
import isArray from 'lodash/isArray'
import styled from 'styled-components'
import { Card, CardText } from 'material-ui/Card'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import withProps from 'recompose/withProps'

import FormTitle from '../../shared/FormTitle'
import appBaseUrl from '../../../modules/appBaseUrl'
import fetchQk from '../../../modules/fetchQk'

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
const StyledCard = styled(Card)`
  margin-bottom: 10px !important;
`
const Title = styled.div`
  font-weight: bold;
`
const FilterField = styled(TextField)`
  margin-top: -15px;
  margin-bottom: 10px;
`

const enhance = compose(
  inject(`store`),
  withHandlers({
    onChangeBerichtjahr: props => (event, val) => {
      props.store.setQk({ berichtjahr: val })
      if ((isNaN(val) && val.length === 4) || (!isNaN(val) && val > 1000)) {
        fetchQk({ store: props.store, berichtjahr: val })
      }
    },
  }),
  observer
)

class Qk extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: PropTypes.object.isRequired,
    onChangeBerichtjahr: PropTypes.func.isRequired,
  }

  static defaultProps = {
    filter: ``,
  }

  componentDidMount() {
    const { store } = this.props
    console.log(`qk, componentDidMount`)
    fetchQk({ store })
  }

  render() {
    const {
      store,
      onChangeBerichtjahr,
    } = this.props

    const { activeUrlElements, qk } = store
    const apArtId = activeUrlElements.ap
    const existingQk = qk.get(apArtId)
    const berichtjahr = existingQk ? existingQk.filter : ``
    const messages = existingQk ? existingQk.messages : []
    const filter = existingQk ? existingQk.filter : ``
    const messagesFiltered = (
      filter ?
      messages.filter(m =>
        m.hw.toLowerCase().includes(filter.toLowerCase())
      ) :
      messages
    )

    return (
      <Container>
        <FormTitle title="Qualitätskontrollen" />
        <FieldsContainer>
          <TextField
            floatingLabelText="Berichtjahr"
            type="number"
            value={berichtjahr}
            fullWidth
            onChange={onChangeBerichtjahr}
          />
          <FilterField
            floatingLabelText="nach Typ filtern"
            type="text"
            value={filter || ``}
            fullWidth
            onChange={(event, val) =>
              store.setQk({ filter: val })
            }
          />
          {
            messagesFiltered.map((m, index) => {
              let links = null
              let children
              if (m.url) {
                children = `${appBaseUrl}/${m.url.join(`/`)}`
                if (m.url[0] && isArray(m.url[0])) {
                  // an array of arrays was returned
                  children = m.url.map((u, i) => (
                    <div key={i}>{`${appBaseUrl}/${u.join(`/`)}`}</div>
                  ))
                  if (m.url[0][0] && isArray(m.url[0][0])) {
                    children = m.url.map((u, i) => u.map((uu, ii) => (
                      <div key={`${i}/${ii}`}>{`${appBaseUrl}/${uu.join(`/`)}`}</div>
                    )))
                  }
                }
                links = (
                  <Linkify properties={{ target: `_blank`, style: { color: `white`, fontWeight: 100 } }}>
                    {children}
                  </Linkify>
                )
              }
              return (
                <StyledCard key={index}>
                  <CardText>
                    <Title>
                      {m.hw}
                    </Title>
                    <div>
                      {links}
                    </div>
                  </CardText>
                </StyledCard>
              )
            })
          }
        </FieldsContainer>
      </Container>
    )
  }
}

export default enhance(Qk)
