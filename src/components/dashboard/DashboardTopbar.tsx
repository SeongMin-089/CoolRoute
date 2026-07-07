import { Link } from 'react-router-dom'
import { clearStoredDashboardRole } from '../../utils/dashboardAuth'

function DashboardTopbar({
  title,
  description,
  userLabel,
}: {
  title: string
  description: string
  userLabel: string
}) {
  return (
    <header className="dashboard-topbar">
      <div>
        <strong>{title}</strong>
        <p>{description}</p>
      </div>

      <div className="dashboard-topbar__user">
        <span>{userLabel}</span>
        <Link to="/" onClick={clearStoredDashboardRole}>
          로그아웃
        </Link>
      </div>
    </header>
  )
}

export default DashboardTopbar
