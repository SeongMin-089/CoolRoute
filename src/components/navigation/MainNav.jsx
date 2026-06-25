import { NavLink } from 'react-router-dom'
import { navItems } from '../../data/navData'

function MainNav() {
  return (
    <nav className="main-nav" aria-label="Main navigation">
      <ul className="main-nav__list">
        {navItems.map((item) => (
          <li key={item.path} className="main-nav__item">
            <NavLink to={item.path} className="main-nav__link">
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default MainNav
