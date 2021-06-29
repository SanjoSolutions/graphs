import { calculateDistance } from './calculateDistance.js'
import { exploreGraph } from "./exploreGraph.js";

const MINIMUM_DISTANCE = 16

export function layout(graph, nodeRadius) {
  const nodes = exploreGraph(graph)

  const initialPosition = {
    x: 0,
    y: 0
  }
  const positions = new Map(
    Array.from(nodes.values())
      .map(node => [node, initialPosition])
  )

  return explodeLayout(graph, nodeRadius, nodes, positions)
}

function explodeLayout(graph, nodeRadius, nodes, positions) {
  let hasUpdatedPositions
  do {
    hasUpdatedPositions = false
    for (const [node, position] of positions.entries()) {
      for (const [node2, position2] of positions.entries()) {
        if (node !== node2) {
          const distance = Math.max(
            0,
            calculateDistance(position, position2) - 2 * nodeRadius
          )
          if (distance < MINIMUM_DISTANCE) {
            const distanceToAdd = 2 * nodeRadius + MINIMUM_DISTANCE - distance
            const {x: x1, y: y1} = position
            const {x: x2, y: y2} = position2
            const angle = Math.atan2(
              y2 - y1,
              x2 - x1
            )
            const newPosition = {
              x: x2 + distanceToAdd * Math.cos(angle),
              y: y2 + distanceToAdd * Math.sin(angle)
            }
            positions.set(node2, newPosition)
            hasUpdatedPositions = true
          }
        }
      }
    }
  } while (hasUpdatedPositions)
  return positions
}

export function radialLayout(graph, nodeRadius) {
  exploreGraph(graph)

  const positions = new Map()
  positions.set(graph, {
    x: 0,
    y: 0
  })
  const positionedNodes = new Set([graph])
  let nodes = new Set([graph])
  do {
    nodes = radialLayoutStep(nodeRadius, nodes, positions, positionedNodes)
  } while (nodes.size >= 1)

  return explodeLayout(graph, nodeRadius, nodes, positions)
}

export function radialLayoutNSteps(graph, nodeRadius, numberOfSteps) {
  exploreGraph(graph)

  const positions = new Map()
  positions.set(graph, {
    x: 0,
    y: 0
  })
  const positionedNodes = new Set([graph])
  let stepNumber = 0
  let nodes = new Set([graph])
  do {
    stepNumber++
    nodes = radialLayoutStep(nodeRadius, nodes, positions, positionedNodes)
  } while (stepNumber < numberOfSteps && nodes.size >= 1)

  return explodeLayout(graph, nodeRadius, nodes, positions)
}

function radialLayoutStep(nodeRadius, nodes, positions, positionedNodes) {
  const distance = 2 * nodeRadius + MINIMUM_DISTANCE
  const nextNodesToVisit = new Set()
  for (const node of nodes.values()) {
    const nodesToPosition = new Set(Array.from(node.connections.values())
      .filter(
        node => !positionedNodes.has(node)
      ))

    let angle = 0
    const angleDelta = 2 * Math.PI / nodesToPosition.size

    const {x, y} = positions.get(node)
    for (const node2 of nodesToPosition.values()) {
      const position = {
        x: x + distance * Math.cos(angle),
        y: y + distance * Math.sin(angle)
      }
      positions.set(node2, position)
      positionedNodes.add(node2)
      angle += angleDelta
    }

    for (const node of nodesToPosition.values()) {
      nextNodesToVisit.add(node)
    }
  }
  return nextNodesToVisit
}
