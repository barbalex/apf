import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import clone from 'lodash/clone'
import remove from 'lodash/remove'
import styled from 'styled-components'

import StrukturbaumContainer from './StrukturbaumContainer'
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
    const isVisible = projekteTabs.includes(name)
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
    const strukturbaumIsVisible = projekteTabs.includes(`strukturbaum`)
    const datenIsVisible = projekteTabs.includes(`daten`)
    const karteIsVisible = projekteTabs.includes(`karte`)

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
            karteIsVisible
              && <Karte />
          }
        </Content>
      </Container>
    )
  }
}

export default Projekte
