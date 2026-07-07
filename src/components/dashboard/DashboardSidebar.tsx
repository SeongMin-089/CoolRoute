import { Link, NavLink } from 'react-router-dom'

export interface DashboardNavItem {
  label: string
  path: string
  icon: string
  end?: boolean
}

function DashboardSidebar({
  roleLabel,
  navItems,
  pointTitle,
  pointDescription,
}: {
  roleLabel: string
  navItems: DashboardNavItem[]
  pointTitle: string
  pointDescription: string
}) {
  return (
    <aside className="dashboard-sidebar">
      <Link className="dashboard-sidebar__brand" to="/">
        <div className="dashboard-sidebar__brand-icon">C</div>
        <div>
          <strong>CoolRoute</strong>
          <span>Cold Chain System</span>
        </div>
      </Link>

      <nav className="dashboard-sidebar__nav" aria-label={`${roleLabel} 메뉴`}>
        {navItems.map((item) => (
          <NavLink key={item.path} to={item.path} end={item.end}>
            <span>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="dashboard-sidebar__point">
        <strong>{pointTitle}</strong>
        <p>{pointDescription}</p>
      </div>
    </aside>
  )
}

export default DashboardSidebar
