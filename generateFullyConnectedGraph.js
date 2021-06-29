import { Node } from "./graph.js";

export function generateFullyConnectedGraph(numberOfNodes) {
  if (numberOfNodes < 1) {
    throw new Error('Expected numberOfNodes >= 1.')
  }

  const graph = new Node()
  const nodes = new Set([graph])
  for (let i = 1; i <= numberOfNodes - 1; i++) {
    const node = new Node()
    for (const otherNode of nodes.values()) {
      node.connections.add(otherNode)
      otherNode.connections.add(node)
    }
    nodes.add(node)
  }
  return graph
}
