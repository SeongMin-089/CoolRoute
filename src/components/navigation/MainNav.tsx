import { NavLink } from 'react-router-dom'
import { navItems } from '../../data/navData'

function MainNav() {
  return (
    <nav className="main-nav" aria-label="Main navigation">
      <ul className="main-nav__list">
        {navItems.map((item, index) => {
          const hasArrow = index !== navItems.length - 1

          return (
            <li key={item.path} className="main-nav__item">
              <NavLink to={item.path} className="main-nav__link">
                <span>{item.label}</span>
                {hasArrow && (
                  <img
                    className="main-nav__arrow"
                    src="/nav-arrow.svg"
                    alt=""
                    aria-hidden="true"
                  />
                )}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default MainNav
