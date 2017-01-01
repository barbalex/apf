import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import clone from 'lodash/clone'
import remove from 'lodash/remove'
import styled from 'styled-components'

import StrukturbaumContainer from './StrukturbaumContainer'
import DeleteDatasetModal from './DeleteDatasetModal'
import Daten from './Daten'
import Karte from './Karte'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`
const Content = styled.div`
  display: flex;
  flex-wrap: nowrap;
  height: 100%;
`
const KarteContainer = styled.div`
  border-color: #424242;
  border-width: 1px;
  border-style: solid;
  flex-basis: 600px;
  flex-grow: 6;
  flex-shrink: 1;
  height: 100%;
`

@inject(`store`)
@observer
class Projekte extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: PropTypes.object,
  }

  constructor() {
    super()
    this.onClickButton = this.onClickButton.bind(this)
  }

  onClickButton(name) {
    const { store } = this.props
    const projekteTabs = store.urlQuery.projekteTabs ? clone(store.urlQuery.projekteTabs) : []
    const isVisible = projekteTabs && projekteTabs.includes(name)
    if (isVisible) {
      remove(projekteTabs, el => el === name)
    } else {
      projekteTabs.push(name)
    }
    store.setUrlQuery(`projekteTabs`, projekteTabs)
  }

  render() {
    const { store } = this.props
    const projekteTabs = clone(store.urlQuery.projekteTabs)
    const strukturbaumIsVisible = projekteTabs && projekteTabs.includes(`strukturbaum`)
    const datenIsVisible = projekteTabs && projekteTabs.includes(`daten`)
    const karteIsVisible = projekteTabs && projekteTabs.includes(`karte`)
    const deleteDatasetModalIsVisible = !!store.datasetToDelete.id

    return (
      <Container>
        <Content>
          {
            strukturbaumIsVisible
              && <StrukturbaumContainer />
          }
          {
            datenIsVisible
              && <Daten />
          }
          {
            karteIsVisible &&
            <KarteContainer>
              <Karte />
            </KarteContainer>
          }
          {
            deleteDatasetModalIsVisible &&
            <DeleteDatasetModal />
          }
        </Content>
      </Container>
    )
  }
}

export default Projekte
