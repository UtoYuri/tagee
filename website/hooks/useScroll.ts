import * as React from 'react';

interface ScrollPoint {
  x: number;
  y: number;
  height: number;
  width: number;
  direction: string;
}

const useScroll = (): ScrollPoint => {
  const isClient = typeof window === 'object';

  const [scroll, setScroll] = React.useState<ScrollPoint>({
    x: isClient ? document.body.getBoundingClientRect().left : 0,
    y: isClient ? document.body.getBoundingClientRect().top : 0,
    height: isClient ? document.body.getBoundingClientRect().height : 0,
    width: isClient ? document.body.getBoundingClientRect().width : 0,
    direction: ''
  })

  const listener = () => {
    setScroll((prev: ScrollPoint): ScrollPoint => ({
      x: document.body.getBoundingClientRect().left,
      y: -document.body.getBoundingClientRect().top,
      height: document.body.getBoundingClientRect().height,
      width: document.body.getBoundingClientRect().width,
      direction: prev.y > -document.body.getBoundingClientRect().top ? 'up' : 'down'
    }))
  }

  React.useEffect(() => {
    window.addEventListener('scroll', listener)
    return () => window.removeEventListener('scroll', listener)
  }, [])

  return scroll;
}

export default useScroll;