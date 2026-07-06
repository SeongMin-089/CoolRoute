import { useEffect, useId, useState } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { navItems } from "../../data/navData"

function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const menuId = useId()

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])

  const closeMenu = () => setIsOpen(false)

  return (
    <div className={`mobile-menu${isOpen ? " is-open" : ""}`}>
      <button
        type="button"
        className="mobile-menu__toggle"
        aria-label={isOpen ? "Close mobile menu" : "Open mobile menu"}
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span className="mobile-menu__line" />
        <span className="mobile-menu__line" />
        <span className="mobile-menu__line" />
      </button>

      {isOpen && (
        <div className="mobile-menu__overlay" onClick={closeMenu}>
          <nav
            id={menuId}
            className="mobile-menu__panel"
            aria-label="Mobile navigation"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mobile-menu__tools" aria-hidden="true">
              <span className="mobile-menu__tool">
                <img src="/header-search.svg" alt="" />
              </span>
              <span className="mobile-menu__tool">
                <img src="/header-moon.svg" alt="" />
              </span>
            </div>

            <ul className="mobile-menu__list">
              {navItems.map((item) => (
                <li className="mobile-menu__item" key={item.path}>
                  <NavLink
                    className={({ isActive }) =>
                      `mobile-menu__link${isActive ? " is-active" : ""}`
                    }
                    to={item.path}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <Link className="mobile-menu__login" to="/login" onClick={closeMenu}>
              로그인
            </Link>
          </nav>
        </div>
      )}
    </div>
  )
}

export default MobileMenu
