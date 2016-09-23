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
import styles from './styles.css'

const data = [
  {
    nodeId: 'root',
    type: 'root',
    name: 'root',
    children: ['projekt/1'],
  },
  {
    nodeId: 'projekt/1',
    datasetId: 1,
    type: 'dataset',
    name: 'AP Flora Kt. ZH',
    expanded: false,
    nrOfUnloadedChildren: 526,
    parentId: 'root',
  },
]

console.log('nodes data:', data)

function renderItem(item, keyPrefix) {
  const onClick = (event) => {
    event.stopPropagation()
    item.expanded = !item.expanded
    List.recomputeRowHeights()
    List.forceUpdate()
  }

  const props = { key: keyPrefix }
  let children = []
  let itemText

  if (item.expanded) {
    props.onClick = onClick
    itemText = `[-] ${item.name}`
    children = item.children.map((child, index) =>
      renderItem(child, `${keyPrefix}-${index}`)
    )
  } else if (item.children.length) {
    props.onClick = onClick
    itemText = `[+] ${item.name}`
  } else {
    itemText = `    ${item.name}`
  }

  children.unshift(
    React.DOM.div({
      className: 'item',
      key: 'label',
      style: {
        cursor: item.children.length ? 'pointer' : 'auto',
      },
    }, itemText)
  )

  return React.DOM.ul(null, React.DOM.li(props, children))
}

function cellRenderer(params) {
  const renderedCell = renderItem(data[params.index], params.index)

  return React.DOM.ul(
    {
      key: params.key,
      style: params.style,
    },
    renderedCell
  )
}

const Strukturbaum = observer(
  class Strukturbaum extends Component { // eslint-disable-line react/prefer-stateless-function
    render() {  // eslint-disable-line class-methods-use-this
      return (
        <div className={styles.container}>
          Strukturbaum
          <AutoSizer>
            {
              ({ height, width }) => (
                <List
                  height={height}
                  rowCount={data.length}
                  rowHeight={20}
                  rowRenderer={cellRenderer}
                  width={width}
                />
              )
            }
          </AutoSizer>
        </div>
      )
    }
  }
)

export default Strukturbaum
