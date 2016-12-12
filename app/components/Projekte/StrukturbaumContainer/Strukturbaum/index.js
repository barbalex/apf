/*
 *
 * Strukturbaum
 * https://rawgit.com/bvaughn/react-virtualized/master/playground/tree.html
 * https://github.com/bvaughn/react-virtualized/blob/master/playground/tree.js
 *
 */

import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import { AutoSizer, List } from 'react-virtualized'
import { ContextMenuTrigger } from 'react-contextmenu'

import getNrOfNodeRows from '../../../../modules/getNrOfNodeRows'
import isNodeInActiveNodePath from '../../../../modules/isNodeInActiveNodePath'
import styles from './styles.css'

@inject(`store`)
@observer
class Strukturbaum extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: PropTypes.object,
  }

  render() {  // eslint-disable-line class-methods-use-this
    const { store } = this.props

    if (
      !store
      || !store.projektNodes
      || store.projektNodes.length === 0
    ) {
      return (
        <div className={styles.container}>
          <ul className={styles.topUl}>
            <li className={styles.node}>
              lade Daten...
            </li>
          </ul>
        </div>
      )
    }

    // calculate scrolltop
    // without this if a folder low in the tree is opened,
    // it always gets scrolled down out of sight
    const nodes = store.projektNodes
    const nrOfRows = getNrOfNodeRows(nodes)
    const rowHeight = (nrOfRows * 23) / nodes.length
    const treeHeightAboveActiveNode = store.node.nrOfRowsAboveActiveNode * 23
    const roomAboveClick = store.ui.lastClickY - store.ui.treeTopPosition
    // correcting by 10px seems to keep the tree from jumping
    const scrolltop = (treeHeightAboveActiveNode - roomAboveClick) + 10

    const rowRenderer = ({ key, index }) =>
      <div
        key={key}
      >
        {renderNode(store.projektNodes[index], index)}
      </div>

    const renderNode = (node, index) => {
      const onClick = (event) => {
        event.stopPropagation()
        store.ui.lastClickY = event.pageY
        store.toggleNode(node)
      }

      const props = { key: index }
      const nodeHasChildren = node.children && node.children.length
      let childNodes = []
      const symbolTypes = {
        open: `${String.fromCharCode(709)}`,
        closed: `>`,
        hasNoChildren: `-`,
        loadingData: ``,
      }
      let symbol
      let symbolClassName = `symbol`
      const nodeIsInActiveNodePath = isNodeInActiveNodePath(node, store.url)

      if (nodeHasChildren && node.expanded) {
        props.onClick = onClick
        symbol = symbolTypes.open
        symbolClassName = nodeIsInActiveNodePath ? `symbolOpenInActiveNodePath` : `symbolOpen`
        // apply filter
        const childrenProperty = (
          node === store.activeDataset ?
          `childrenFilteredByLabel` :
          `children`
        )
        childNodes = node[childrenProperty].map(child =>
          renderNode(child, child.url.join(`/`))
        )
      } else if (nodeHasChildren) {
        props.onClick = onClick
        symbol = symbolTypes.closed
      } else if (node.label === `lade Daten...`) {
        symbol = symbolTypes.loadingData
      } else {
        symbol = symbolTypes.hasNoChildren
        props.onClick = onClick
      }

      childNodes.unshift(
        <ContextMenuTrigger
          id={node.menuType}
          key={`${index}-child`}
        >
          <div
            className={nodeIsInActiveNodePath ? styles.nodeIsInActiveNodePath : styles.node}
            data-id={node.id || null}
          >
            <span className={styles[symbolClassName]}>
              {symbol}
            </span>
            <span className={nodeIsInActiveNodePath ? styles.textInActiveNodePath : styles.text}>
              {node.label}
            </span>
          </div>
        </ContextMenuTrigger>
      )

      return (
        <ul
          key={index}
          onClick={props.onClick}
          className={
            node.urlPath && node.urlPath.length && node.urlPath.length === 1 ?
            styles.topUl :
            null
          }
        >
          <li>
            {childNodes}
          </li>
        </ul>
      )
    }


    return (
      <div className={styles.container}>
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              rowCount={nodes.length}
              rowHeight={rowHeight}
              rowRenderer={rowRenderer}
              width={width}
              className={styles.listContainer}
              scrollTop={scrolltop}
              ref={(c) => { this.tree = c }}
            />
          )}
        </AutoSizer>
      </div>
    )
  }
}

export default Strukturbaum
