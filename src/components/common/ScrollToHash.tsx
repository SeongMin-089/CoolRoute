import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollToHashElement } from './hashScroll'

function ScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    let frameId = 0
    let timerId = 0

    const scrollAfterRender = () => {
      frameId = window.requestAnimationFrame(() => {
        timerId = window.setTimeout(() => {
          if (!hash) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            return
          }

          scrollToHashElement(hash.replace('#', ''))
        }, 40)
      })
    }

    scrollAfterRender()

    return () => {
      window.cancelAnimationFrame(frameId)
      window.clearTimeout(timerId)
    }
  }, [pathname, hash])

  return null
}

export default ScrollToHash
