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
import styles from './styles.css'

const Strukturbaum = class Strukturbaum extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {  // eslint-disable-line class-methods-use-this
    const { store, location } = this.props
    if (
      !store
      || !store.data
      || !store.data.nodes
      || (store.data.nodes.length && store.data.nodes.length === 0)
      || (store.data.nodes[0] && store.data.nodes[0].nodeId === 'none')
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
    const nodes = store.data.nodes
    const nrOfRows = getNrOfNodeRows(nodes)
    const rowHeight = nrOfRows * 22.87

    const rowRenderer = ({ key, index }) =>
      <div
        key={key}
      >
        {renderNode(store.data.nodes[index], index)}
      </div>

    const renderNode = (node, keyPrefix) => {
      const onClick = (event) => {
        event.stopPropagation()
        console.log('Strukturbaum: node:', node)
        console.log('Strukturbaum: event:', event)
        console.log('Strukturbaum: event.target:', event.target)
        if (node.children && node.expanded) {
          store.closeNode(node)
        } else if (node.children) {
          store.openNode(node)
        } else {
          console.log('should set this node active:', node)
        }
      }

      const props = { key: keyPrefix }
      const nodeHasChildren = node.children && node.children.length
      let childNodes = []
      let symbol

      if (nodeHasChildren && node.expanded) {
        props.onClick = onClick
        symbol = String.fromCharCode(709)
        childNodes = node.children.map(child =>
          renderNode(child, child.nodeId)
        )
      } else if (nodeHasChildren) {
        props.onClick = onClick
        symbol = '>'
      } else if (node.name === 'lade Daten...') {
        symbol = ''
      } else {
        symbol = '-'
      }

      childNodes.unshift(
        <div
          className={node.expanded ? styles.nodeExpanded : styles.node}
          key={`${node.nodeId}-child`}
        >
          <span className={node.expanded ? styles.symbolExpanded : styles.symbol}>
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
          className={node.path && node.path.length && node.path.length === 1 ? styles.topUl : null}
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
          />
        )}
      </AutoSizer>
    )
  }
}

Strukturbaum.propTypes = {
  store: PropTypes.object,
}

export default inject('store')(observer(Strukturbaum))
