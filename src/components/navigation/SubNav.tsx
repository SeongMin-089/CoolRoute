import { useEffect, useRef, useState } from 'react'
import { HEADER_SCROLL_OFFSET, scrollToHashElement } from '../common/hashScroll'
import type { SubNavItem } from '../../data/subNavData'

interface SubNavProps {
  items?: SubNavItem[]
  onSelect?: (id: string) => void
}

function SubNav({ items = [], onSelect }: SubNavProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '')
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const isProgrammaticScrollRef = useRef(false)
  const scrollUnlockTimerRef = useRef<number | null>(null)

  useEffect(() => {
    setActiveId(items[0]?.id ?? '')
  }, [items])

  const scrollActiveButtonIntoView = (sectionId: string) => {
    buttonRefs.current[sectionId]?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    })
  }

  const handleClick = (sectionId: string) => {
    const section = document.getElementById(sectionId)

    setActiveId(sectionId)
    onSelect?.(sectionId)
    isProgrammaticScrollRef.current = true
    scrollActiveButtonIntoView(sectionId)

    if (scrollUnlockTimerRef.current) {
      window.clearTimeout(scrollUnlockTimerRef.current)
    }

    if (section) {
      scrollToHashElement(sectionId)
    }

    scrollUnlockTimerRef.current = window.setTimeout(() => {
      isProgrammaticScrollRef.current = false
    }, 700)
  }

  useEffect(() => {
    if (activeId) {
      scrollActiveButtonIntoView(activeId)
    }
  }, [activeId])

  useEffect(() => {
    if (!items.length) {
      return
    }

    const handleScroll = () => {
      if (isProgrammaticScrollRef.current) {
        return
      }

      const current = items
        .map((item) => {
          const section = document.getElementById(item.id)

          if (!section) {
            return null
          }

          const sectionTop = section.getBoundingClientRect().top

          return {
            id: item.id,
            distance: Math.abs(sectionTop - HEADER_SCROLL_OFFSET),
          }
        })
        .filter((item): item is { id: string; distance: number } =>
          Boolean(item),
        )
        .sort((a, b) => a.distance - b.distance)[0]

      if (current?.id) {
        setActiveId((prev) => (prev === current.id ? prev : current.id))
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)

      if (scrollUnlockTimerRef.current) {
        window.clearTimeout(scrollUnlockTimerRef.current)
      }
    }
  }, [items])

  if (!items.length) {
    return null
  }

  return (
    <nav className="sub-nav" aria-label="Page section navigation">
      <div className="sub-nav__inner">
        <ul className="sub-nav__list">
          {items.map((item) => {
            const isActive = activeId === item.id

            return (
              <li key={item.id} className="sub-nav__item">
                <button
                  ref={(element) => {
                    buttonRefs.current[item.id] = element
                  }}
                  type="button"
                  className={`sub-nav__button${isActive ? ' is-active' : ''}`}
                  onClick={() => handleClick(item.id)}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {item.iconGray && item.iconWhite && (
                    <img
                      className="sub-nav__icon"
                      src={isActive ? item.iconWhite : item.iconGray}
                      alt=""
                      aria-hidden="true"
                    />
                  )}
                  <span className="sub-nav__label">{item.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

export default SubNav
