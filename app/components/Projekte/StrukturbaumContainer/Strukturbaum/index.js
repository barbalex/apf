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
    let ListRef
    if (
      !store
      || !store.data
      || !store.data.nodes
      || (store.data.nodes.length && store.data.nodes.length === 0)
      || (store.data.nodes[0] && store.data.nodes[0].nodeId === 'none')
    ) {
      return (
        <div className={styles.container}>
          <ul>
            <li className={styles.item}>
              lade Daten...
            </li>
          </ul>
        </div>
      )
    }
    const nodes = store.data.nodes
    // const rowHeight = nodes[0].expanded ? ((nodes[0].children.length + 1) * 22.87) : 1 * 22.87
    const nrOfRows = rowsFromNodes(nodes)
    console.log('nrOfRows:', nrOfRows)
    const rowHeight = nrOfRows * 22.87

    const rowRenderer = ({ key, index }) =>
      <div
        key={key}
      >
        {renderItem(store.data.nodes[index], index)}
      </div>

    const renderItem = (item, keyPrefix) => {
      const onClick = (event) => {
        event.stopPropagation()
        if (!item.expanded) {
          store.actions.fetchNodes(item)
        } else {
          item.expanded = !item.expanded
          // unfortunately this gives an error:
          // store.actions.toggleNodeExpanded(item)
        }
      }

      const props = { key: keyPrefix }
      let children = []
      let itemText

      if (item.expanded) {
        props.onClick = onClick
        itemText = `${String.fromCharCode(709)} ${item.name}`
        children = item.children.map(child =>
          renderItem(child, `${child.nodeId}`)
        )
      } else if (item.children.length) {
        props.onClick = onClick
        itemText = `> ${item.name}`
      } else {
        itemText = `- ${item.name}`
      }

      children.unshift(
        <div
          className={styles.item}
          key={`${item.nodeId}-child`}
          style={{ cursor: item.children && item.children.length ? 'pointer' : 'auto' }}
        >
          {itemText}
        </div>
      )

      return (
        <ul
          key={item.nodeId}
          onClick={props.onClick}
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
            ref={(ref) => { ListRef = ref }}
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
