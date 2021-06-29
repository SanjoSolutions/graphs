import { layout } from "./layout.js";

export class GraphRenderer {
  static NODE_RADIUS = 16

  constructor(canvas, positions) {
    this.canvas = canvas
    this.context = canvas.getContext('2d')
    this.positions = positions
    this.translate = {
      x: 0,
      y: 0
    }
  }

  renderGraph(graph) {
    this._renderGraph(graph)
  }

  rerenderGraph(graph) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this._renderGraph(graph)
  }

  _renderGraph(graph) {
    this.context.save()
    this.context.translate(
      0.5 * this.canvas.width + this.translate.x,
      0.5 * this.canvas.height + this.translate.y
    )
    for (const [node, position] of this.positions.entries()) {
      for (const connection of node.connections) {
        this.renderConnection(
          node,
          position,
          connection,
          this.positions.get(connection)
        )
      }
    }
    for (const [node, position] of this.positions.entries()) {
      this.renderNode(node, position)
    }
    this.context.restore()
  }

  renderNode(node, position) {
    const {x, y} = position
    this.context.strokeStyle = 'black'
    this.context.fillStyle = 'white'
    this.context.beginPath()
    this.context.arc(
      x,
      y,
      GraphRenderer.NODE_RADIUS,
      0,
      2 * Math.PI
    )
    this.context.fill()
    this.context.stroke()
  }

  renderConnection(nodeA, positionA, nodeB, positionB) {
    this.context.strokeStyle = 'black'
    this.context.beginPath()
    const {x: x1, y: y1} = positionA
    const {x: x2, y: y2} = positionB
    this.context.moveTo(x1, y1)
    this.context.lineTo(x2, y2)
    this.context.stroke()
  }
}
