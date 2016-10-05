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
import { Redirect } from 'react-router'

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
        if (node.expanded) {
          store.closeNode(node)
        } else {
          store.openNode(node)
        }
      }

      const props = { key: keyPrefix }
      let children = []
      let symbol

      if (node.expanded) {
        props.onClick = onClick
        symbol = String.fromCharCode(709)
        children = node.children.map(child =>
          renderNode(child, child.nodeId)
        )
      } else if (node.children.length) {
        props.onClick = onClick
        symbol = '>'
      } else {
        symbol = '-'
      }

      children.unshift(
        <div
          className={styles.node}
          key={`${node.nodeId}-child`}
          style={{ cursor: node.children && node.children.length ? 'pointer' : 'auto' }}
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
            {children}
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
