import { useEffect, useState } from 'react'
import { ResponsiveType } from 'react-multi-carousel'

export const RESPONSIVE: ResponsiveType = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
}

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}

export const useDeviceType = () => {
  const { width } = useWindowSize()

  return Object.keys(RESPONSIVE).find(
    (device) => RESPONSIVE[device].breakpoint.min < width && RESPONSIVE[device].breakpoint.max > width,
  )
}
