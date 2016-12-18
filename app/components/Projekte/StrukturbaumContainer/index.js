import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import styled from 'styled-components'

import LabelFilter from './LabelFilter'
import Strukturbaum from './Strukturbaum'
import CmProjekt from './contextmenu/Projekt'
import CmApFolder from './contextmenu/ApFolder'
import CmAp from './contextmenu/Ap'
import CmApberuebersichtFolder from './contextmenu/ApberuebersichtFolder'
import CmApberuebersicht from './contextmenu/Apberuebersicht'
import CmAssozartFolder from './contextmenu/AssozartFolder'
import CmAssozart from './contextmenu/Assozart'
import CmBerFolder from './contextmenu/BerFolder'
import CmBer from './contextmenu/Ber'
import CmApberFolder from './contextmenu/ApberFolder'
import CmApber from './contextmenu/Apber'
import CmErfkritFolder from './contextmenu/ErfkritFolder'
import CmErfkrit from './contextmenu/Erfkrit'
import CmZielFolder from './contextmenu/ZielFolder'
import CmZielJahrFolder from './contextmenu/ZielJahrFolder'
import CmZiel from './contextmenu/Ziel'
import CmZielBerFolder from './contextmenu/ZielBerFolder'
import CmZielBer from './contextmenu/Zielber'
import CmPopFolder from './contextmenu/PopFolder'
import CmPop from './contextmenu/Pop'
import CmPopmassnberFolder from './contextmenu/PopmassnberFolder'
import CmPopmassnber from './contextmenu/Popmassnber'
import CmPopberFolder from './contextmenu/PopberFolder'
import CmPopber from './contextmenu/Popber'
import CmTpopFolder from './contextmenu/TpopFolder'
import CmTpop from './contextmenu/Tpop'
import CmTpopberFolder from './contextmenu/TpopberFolder'
import CmTpopber from './contextmenu/Tpopber'
import CmTpopfreiwkontrFolder from './contextmenu/TpopfreiwkontrFolder'
import CmTpopfreiwkontr from './contextmenu/Tpopfreiwkontr'
import CmTpopfreiwkontrzaehlFolder from './contextmenu/TpopfreiwkontrzaehlFolder'
import CmTpopfreiwkontrzaehl from './contextmenu/Tpopfreiwkontrzaehl'
import CmTpopfeldkontrFolder from './contextmenu/TpopfeldkontrFolder'
import CmTpopfeldkontr from './contextmenu/Tpopfeldkontr'
import CmTpopfeldkontrzaehlFolder from './contextmenu/TpopfeldkontrzaehlFolder'
import CmTpopfeldkontrzaehl from './contextmenu/Tpopfeldkontrzaehl'
import CmTpopmassnberFolder from './contextmenu/TpopmassnberFolder'
import CmTpopmassnber from './contextmenu/Tpopmassnber'
import CmTpopmassnFolder from './contextmenu/TpopmassnFolder'
import CmTpopmassn from './contextmenu/Tpopmassn'

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 500px;
  border-color: #424242;
  border-width: 1px;
  border-style: solid;
`
const ContainerExporte = styled(StyledContainer)`
  flex-basis: 200px;
  flex-grow: 0;
  flex-shrink: 0;
`
const LabelFilterContainer = styled.div`
  padding-right: 30px;
`

@inject(`store`)
@observer
class StrukturbaumContainer extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: PropTypes.object,
  }

  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    const { store } = this.props
    store.ui.treeHeight = this.tree.clientHeight
    const treeRect = this.tree.getBoundingClientRect()
    store.ui.treeTopPosition = treeRect.top
  }

  handleClick(e, data, element) {
    const { store } = this.props
    const { table, action, idTable, actionTable } = data
    const id = element.firstElementChild.getAttribute(`data-id`)
    const url = element.firstElementChild.getAttribute(`data-url`)
    const baseUrl = JSON.parse(url)
    const nodeType = element.firstElementChild.getAttribute(`data-nodeType`)
    console.log(`id:`, id)
    console.log(`url:`, url)
    console.log(`nodeType:`, nodeType)
    console.log(`action:`, action)
    if (action === `insert`) {
      console.log(`table:`, table)
      console.log(`should insert`)
      if (nodeType === `table`) {
        baseUrl.pop()
      }
      store.insertDataset(table, id, baseUrl)
    } else if (action === `delete`) {
      console.log(`table:`, table)
      console.log(`should delete`)
    } else if (action === `karte`) {
      // actionTable: table to show on map
      // idTable: table from which to filter datasets of actionTable
      console.log(`idTable:`, idTable)
      console.log(`actionTable:`, actionTable)
      console.log(`should show karte`)
    }
  }

  render() {
    const { activeUrlElements } = this.props.store
    const Container = activeUrlElements.exporte ? ContainerExporte : StyledContainer

    return (
      <Container>
        <LabelFilterContainer>
          <LabelFilter />
        </LabelFilterContainer>
        <div
          style={{
            flexGrow: 1,
            flexBasis: `100%`,
          }}
          ref={(c) => { this.tree = c }}
        >
          <Strukturbaum />
        </div>
        <CmProjekt onClick={this.handleClick} />
        <CmApFolder onClick={this.handleClick} />
        <CmAp onClick={this.handleClick} />
        <CmApberuebersichtFolder onClick={this.handleClick} />
        <CmApberuebersicht onClick={this.handleClick} />
        <CmAssozartFolder onClick={this.handleClick} />
        <CmAssozart onClick={this.handleClick} />
        <CmBerFolder onClick={this.handleClick} />
        <CmBer onClick={this.handleClick} />
        <CmApberFolder onClick={this.handleClick} />
        <CmApber onClick={this.handleClick} />
        <CmErfkritFolder onClick={this.handleClick} />
        <CmErfkrit onClick={this.handleClick} />
        <CmZielFolder onClick={this.handleClick} />
        <CmZielJahrFolder onClick={this.handleClick} />
        <CmZiel onClick={this.handleClick} />
        <CmZielBerFolder onClick={this.handleClick} />
        <CmZielBer onClick={this.handleClick} />
        <CmPopFolder onClick={this.handleClick} />
        <CmPop onClick={this.handleClick} />
        <CmPopmassnberFolder onClick={this.handleClick} />
        <CmPopmassnber onClick={this.handleClick} />
        <CmPopberFolder onClick={this.handleClick} />
        <CmPopber onClick={this.handleClick} />
        <CmTpopFolder onClick={this.handleClick} />
        <CmTpop onClick={this.handleClick} />
        <CmTpopberFolder onClick={this.handleClick} />
        <CmTpopber onClick={this.handleClick} />
        <CmTpopfreiwkontrFolder onClick={this.handleClick} />
        <CmTpopfreiwkontr onClick={this.handleClick} />
        <CmTpopfreiwkontrzaehlFolder onClick={this.handleClick} />
        <CmTpopfreiwkontrzaehl onClick={this.handleClick} />
        <CmTpopfeldkontrFolder onClick={this.handleClick} />
        <CmTpopfeldkontr onClick={this.handleClick} />
        <CmTpopfeldkontrzaehlFolder onClick={this.handleClick} />
        <CmTpopfeldkontrzaehl onClick={this.handleClick} />
        <CmTpopmassnberFolder onClick={this.handleClick} />
        <CmTpopmassnber onClick={this.handleClick} />
        <CmTpopmassnFolder onClick={this.handleClick} />
        <CmTpopmassn onClick={this.handleClick} />
      </Container>
    )
  }
}

export default StrukturbaumContainer
