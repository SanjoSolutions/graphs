import { generateFullyConnectedGraph } from "./generateFullyConnectedGraph.js";
import { radialLayout, radialLayoutNSteps } from "./layout.js";
import { throttle } from "./throttle.js";
import { GraphRenderer } from "./visualization.js";

const canvas = document.createElement('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
document.body.appendChild(canvas)

const graph = generateFullyConnectedGraph(10)
const positions = radialLayout(graph, GraphRenderer.NODE_RADIUS)
const graphRenderer = new GraphRenderer(canvas, positions)
graphRenderer.renderGraph(graph)

let isPointerDown = false

window.addEventListener('pointerdown', function () {
  isPointerDown = true
})

const rerenderGraph = throttle(function () {
  graphRenderer.rerenderGraph(graph)
}, 100)

window.addEventListener('pointermove', function (event) {
  if (isPointerDown) {
    graphRenderer.translate = {
      x: graphRenderer.translate.x + event.movementX,
      y: graphRenderer.translate.y + event.movementY
    }
    rerenderGraph()
  }
})

window.addEventListener('pointerup', function () {
  isPointerDown = false
})
