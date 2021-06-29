export function calculateDistance(positionA, positionB) {
  const {x: x1, y: y1} = positionA
  const {x: x2, y: y2} = positionB
  return Math.sqrt(
    (x2 - x1) ** 2 +
    (y2 - y1) ** 2
  )
}
