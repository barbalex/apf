import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import styles from './styles.css'
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
    console.log(`table:`, data.table)
    console.log(`id:`, element.firstElementChild.getAttribute(`data-id`))
    console.log(`action:`, data.action)
  }

  render() {
    const { activeUrlElements } = this.props.store
    return (
      <div className={activeUrlElements.exporte ? styles.containerExporte : styles.container}>
        <div className={styles.labelFilter}>
          <LabelFilter />
        </div>
        <div className={styles.strukturbaum} ref={(c) => { this.tree = c }}>
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
      </div>
    )
  }
}

export default StrukturbaumContainer
