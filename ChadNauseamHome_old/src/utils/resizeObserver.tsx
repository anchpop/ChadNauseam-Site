import * as React from "react"

const useResizeObserver = (
  ref,
  defaultSize?: { x: number; y: number; width: number; height: number }
) => {
  if (defaultSize === undefined) {
    defaultSize = {
      x: 0,
      y: 0,
      width: 300,
      height: 150,
    }
  }
  const [dimensions, setDimensions] = React.useState(defaultSize)
  React.useEffect(() => {
    const observeTarget = ref.current
    // New API, but it should be supported on all major browsers except Firefox Android
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => setDimensions(entry.contentRect))
    })
    resizeObserver.observe(observeTarget)
    return () => {
      resizeObserver.unobserve(observeTarget)
    }
  }, [ref])
  return dimensions
}

export default useResizeObserver
