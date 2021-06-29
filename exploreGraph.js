export function exploreGraph(graph) {
  const nodes = new Set([graph])
  let hasDiscoveredNewNodes
  do {
    hasDiscoveredNewNodes = false
    for (const node of nodes) {
      const connections = node.connections
      for (const connection of connections) {
        if (!nodes.has(connection)) {
          hasDiscoveredNewNodes = true
          nodes.add(connection)
        }
      }
    }
  } while (hasDiscoveredNewNodes)
  return nodes
}
