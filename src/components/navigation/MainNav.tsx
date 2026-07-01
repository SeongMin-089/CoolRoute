import { Link, NavLink } from 'react-router-dom'
import { navItems } from '../../data/navData'
import { subNavItems } from '../../data/subNavData'

const subNavKeyByPath = {
  '/company': 'company',
  '/business': 'business',
  '/solution': 'solution',
  '/logistics-info': 'logisticsInfo',
  '/support': 'support',
  '/recruit': 'recruit',
} as const

function MainNav() {
  return (
    <nav className="main-nav" aria-label="Main navigation">
      <ul className="main-nav__list">
        {navItems.map((item) => {
          const subNavKey =
            subNavKeyByPath[item.path as keyof typeof subNavKeyByPath]
          const dropdownItems = subNavKey ? subNavItems[subNavKey] : []
          const hasDropdown = dropdownItems.length > 0

          return (
            <li key={item.path} className="main-nav__item">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `main-nav__link${isActive ? ' is-active' : ''}`
                }
              >
                <span>{item.label}</span>
                {hasDropdown && (
                  <img
                    className="main-nav__arrow"
                    src="/nav-arrow.svg"
                    alt=""
                    aria-hidden="true"
                  />
                )}
              </NavLink>
              {hasDropdown && (
                <ul className="main-nav__dropdown">
                  {dropdownItems.map((dropdownItem) => (
                    <li key={dropdownItem.id}>
                      <Link
                        className="main-nav__dropdown-link"
                        to={`${item.path}#${dropdownItem.id}`}
                      >
                        {dropdownItem.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default MainNav
