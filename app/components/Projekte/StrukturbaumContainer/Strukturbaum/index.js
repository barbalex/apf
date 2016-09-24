/*
 *
 * Strukturbaum
 * https://rawgit.com/bvaughn/react-virtualized/master/playground/tree.html
 * https://github.com/bvaughn/react-virtualized/blob/master/playground/tree.js
 *
 */

import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { AutoSizer, List } from 'react-virtualized'
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
      className="item"
      key={`${item.nodeId}-child`}
      style={{ cursor: item.children && item.children.length ? 'pointer' : 'auto' }}
    >
      {itemText}
    </div>
  )

  return (
    <li
      key={item.nodeId}
      onClick={props.onClick}
    >
      <ul>
        {children}
      </ul>
    </li>
  )
}

const rowRenderer = ({ key, index }) =>
  <ul
    key={key}
  >
    {renderItem(data[index], index)}
  </ul>

const Strukturbaum = observer(
  class Strukturbaum extends Component { // eslint-disable-line react/prefer-stateless-function
    render() {  // eslint-disable-line class-methods-use-this
      return (
        <List
          height={600}
          rowCount={data.length}
          rowHeight={200}
          rowRenderer={rowRenderer}
          width={600}
          className={styles.container}
        />
      )
    }
  }
)

export default Strukturbaum
