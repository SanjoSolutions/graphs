export function throttle(fn, throttleTimeout) {
  let lastCall = null
  let timeoutHandle = null
  return function (...args) {
    if (!lastCall || Date.now() - lastCall >= throttleTimeout) {
      lastCall = Date.now()
      fn(...args)
    } else if (!timeoutHandle) {
      timeoutHandle = setTimeout(
        function () {
          timeoutHandle = null
          fn(...args)
        },
        Math.max(0, throttleTimeout - (Date.now() - lastCall))
      )
    }
  }
}
