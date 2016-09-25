/*
 *
 * Strukturbaum
 * https://rawgit.com/bvaughn/react-virtualized/master/playground/tree.html
 * https://github.com/bvaughn/react-virtualized/blob/master/playground/tree.js
 *
 */

import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { AutoSizer, List, ScrollSync } from 'react-virtualized'
import { Scrollbars } from 'react-custom-scrollbars'
import projectSampleData from './projectSampleData.json'
import styles from './styles.css'

const data = projectSampleData

function renderItem(item, keyPrefix) {
  const onClick = (event) => {
    event.stopPropagation()
    item.expanded = !item.expanded
  }

  const props = { key: keyPrefix }
  let children = []
  let itemText

  if (item.expanded) {
    props.onClick = onClick
    itemText = `[-] ${item.name}`
    children = item.children.map((child, index) =>
      renderItem(child, `${child.nodeId}-child-${index}`)
    )
  } else if (item.children.length) {
    props.onClick = onClick
    itemText = `[+] ${item.name}`
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

const rowRenderer = ({ key, index }) =>
  <div
    key={key}
  >
    {renderItem(data[index], index)}
  </div>

const Strukturbaum = observer(
  class Strukturbaum extends Component { // eslint-disable-line react/prefer-stateless-function
    render() {  // eslint-disable-line class-methods-use-this
      const rowHeight = data[0].expanded ? (data[0].children.length * 24) : 24
      return (
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              rowCount={data.length}
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
)

export default Strukturbaum
