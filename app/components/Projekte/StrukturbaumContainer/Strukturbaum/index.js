/*
 *
 * Strukturbaum
 * https://rawgit.com/bvaughn/react-virtualized/master/playground/tree.html
 * https://github.com/bvaughn/react-virtualized/blob/master/playground/tree.js
 *
 */
/* eslint-disable no-console, jsx-a11y/no-static-element-interactions */

import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import { AutoSizer, List } from 'react-virtualized'

import getNrOfNodeRows from '../../../../modules/getNrOfNodeRows'
import isNodeInActiveNodePath from '../../../../modules/isNodeInActiveNodePath'
import styles from './styles.css'

const Strukturbaum = @observer class Strukturbaum extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: PropTypes.object,
  }

  render() {  // eslint-disable-line class-methods-use-this
    const { store } = this.props
    if (
      !store
      || !store.data
      || !store.data.nodes
      || (store.data.nodes.length && store.data.nodes.length === 0)
      || (store.data.nodes[0] && store.data.nodes[0].nodeId === `none`)
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
    const nodes = store.data.nodes
    const nrOfRows = getNrOfNodeRows(nodes)
    const rowHeight = (nrOfRows * 23) / nodes.length
    const treeHeightAboveActiveNode = store.data.nrOfRowsAboveActiveNode * 23
    const roomAboveClick = store.ui.lastClickY - store.ui.treeTopPosition
    // correcting by 10px seems to keep the tree from jumping
    const scrolltop = (treeHeightAboveActiveNode - roomAboveClick) + 10

    const rowRenderer = ({ key, index }) =>
      <div
        key={key}
      >
        {renderNode(store.data.nodes[index], index)}
      </div>

    const renderNode = (node, index) => {
      const onClick = (event) => {
        event.stopPropagation()
        store.ui.lastClickY = event.pageY
        if (node.children && node.expanded) {
          store.closeNode(node)
        } else {
          store.openNode(node, index)
        }
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
      const nodeIsInActiveNodePath = isNodeInActiveNodePath(node, store.data.activeNode)

      if (nodeHasChildren && node.expanded) {
        props.onClick = onClick
        symbol = symbolTypes.open
        symbolClassName = nodeIsInActiveNodePath ? `symbolOpenInActiveNodePath` : `symbolOpen`
        childNodes = node.children.map(child =>
          renderNode(child, child.nodeId)
        )
      } else if (nodeHasChildren) {
        props.onClick = onClick
        symbol = symbolTypes.closed
      } else if (node.name === `lade Daten...`) {
        symbol = symbolTypes.loadingData
      } else {
        symbol = symbolTypes.hasNoChildren
        props.onClick = onClick
      }

      childNodes.unshift(
        <div
          className={nodeIsInActiveNodePath ? styles.nodeIsInActiveNodePath : styles.node}
          key={`${node.nodeId}-child`}
        >
          <span className={styles[symbolClassName]}>
            {symbol}
          </span>
          <span className={styles.text}>
            {node.name}
          </span>
        </div>
      )

      return (
        <ul
          key={node.nodeId}
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
      <AutoSizer>
        {({ height, width }) => (
          <List
            height={height}
            rowCount={nodes.length}
            rowHeight={rowHeight}
            rowRenderer={rowRenderer}
            width={width}
            className={styles.container}
            scrollTop={scrolltop}
            ref={(c) => { this.tree = c }}
          />
        )}
      </AutoSizer>
    )
  }
}

export default inject(`store`)(Strukturbaum)
