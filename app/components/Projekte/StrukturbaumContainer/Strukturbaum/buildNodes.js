const d3 = require('d3-hierarchy')

export default (nodesData) =>
  d3.stratify()
    .id((n) => n.nodeId)
    .parentId((n) => n.parentId)(nodesData)
