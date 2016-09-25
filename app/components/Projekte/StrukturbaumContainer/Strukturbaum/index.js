/*
 *
 * Strukturbaum
 * https://rawgit.com/bvaughn/react-virtualized/master/playground/tree.html
 * https://github.com/bvaughn/react-virtualized/blob/master/playground/tree.js
 *
 */
/* eslint-disable no-console */

import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { AutoSizer, List } from 'react-virtualized'
import styles from './styles.css'

let ListRef

const Strukturbaum = observer(
  class Strukturbaum extends Component { // eslint-disable-line react/prefer-stateless-function
    constructor() {
      super()
      this.rowRenderer = this.rowRenderer.bind(this)
      this.renderItem = this.renderItem.bind(this)
    }

    static contextTypes = {
      router: React.PropTypes.object.isRequired,
      store: React.PropTypes.object.isRequired,
    }

    rowRenderer({ key, index }) {
      const { store } = this.context
      return (
        <div
          key={key}
        >
          {this.renderItem(store.data.nodes[index], index)}
        </div>
      )
    }

    renderItem(item, keyPrefix) {
      const { store } = this.context
      const onClick = (event) => {
        event.stopPropagation()
        console.log('item.expanded:', item.expanded)
        // item.expanded = !item.expanded
        store.toggleNodeExpanded(item)
        // ListRef.forceUpdate()
        console.log('item.expanded:', item.expanded)
        console.log('store:', store)
      }

      const props = { key: keyPrefix }
      let children = []
      let itemText

      if (item.expanded) {
        props.onClick = onClick
        itemText = `- ${item.name}`
        children = item.children.map((child, index) =>
          this.renderItem(child, `${child.nodeId}-child-${index}`)
        )
      } else if (item.children.length) {
        props.onClick = onClick
        itemText = `+ ${item.name}`
      } else {
        itemText = `    ${item.name}`
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

    render() {  // eslint-disable-line class-methods-use-this
      const { store } = this.context
      if (store.data.loadingNodes) {
        return <div>lade Daten...</div>
      } else {
        const nodes = store.data.nodes
        const rowHeight = nodes[0].expanded ? (nodes[0].children.length * 24) : 24
        return (
          <AutoSizer>
            {({ height, width }) => (
              <List
                height={height}
                rowCount={nodes.length}
                rowHeight={rowHeight}
                rowRenderer={this.rowRenderer}
                width={width}
                className={styles.container}
                ref={(ref) => { ListRef = ref }}
              />
            )}
          </AutoSizer>
        )
      }
    }
  }
)

export default Strukturbaum
