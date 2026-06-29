import type { SubNavItem } from '../../data/subNavData'

interface SubNavProps {
  items?: SubNavItem[]
}

function SubNav({ items = [] }: SubNavProps) {
  const handleClick = (sectionId: string) => {
    const section = document.getElementById(sectionId)

    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav className="sub-nav" aria-label="Page section navigation">
      <ul className="sub-nav__list">
        {items.map((item) => (
          <li key={item.id} className="sub-nav__item">
            <button
              type="button"
              className="sub-nav__button"
              onClick={() => handleClick(item.id)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default SubNav
