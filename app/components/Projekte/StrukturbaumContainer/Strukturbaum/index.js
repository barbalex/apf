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
import rowsFromNodes from '../../../../modules/rowsFromNodes'
import styles from './styles.css'

const Strukturbaum = class Strukturbaum extends Component { // eslint-disable-line react/prefer-stateless-function
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  render() {  // eslint-disable-line class-methods-use-this
    const { store } = this.props
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
    const nrOfRows = rowsFromNodes(nodes)
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
          store.toggleNodeExpanded(node)
        } else {
          store.openNode(node)
        }
      }

      const props = { key: keyPrefix }
      let children = []
      let itemText

      if (node.expanded) {
        props.onClick = onClick
        itemText = `${String.fromCharCode(709)} ${node.name}`
        children = node.children.map(child =>
          renderNode(child, `${child.nodeId}`)
        )
      } else if (node.children.length) {
        props.onClick = onClick
        itemText = `> ${node.name}`
      } else {
        itemText = `- ${node.name}`
      }

      children.unshift(
        <div
          className={styles.node}
          key={`${node.nodeId}-child`}
          style={{ cursor: node.children && node.children.length ? 'pointer' : 'auto' }}
        >
          {itemText}
        </div>
      )

      return (
        <ul
          key={node.nodeId}
          onClick={props.onClick}
          className={styles.topUl}
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
