const countRows = (nodes) => {
  if (!nodes || !nodes.length) {
    return 0
  }
  let rows = nodes.length
  nodes.forEach((n) => {
    rows += countRows(n.children)
  })
  return rows
}

export default countRows
