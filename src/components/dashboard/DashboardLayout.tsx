import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import DashboardHero from './DashboardHero'
import DashboardSidebar, { type DashboardNavItem } from './DashboardSidebar'
import DashboardTopbar from './DashboardTopbar'
import { getStoredDashboardRole } from '../../utils/dashboardAuth'

export type DashboardRole = 'store' | 'driver' | 'center'

export interface DashboardLayoutProps {
  role: DashboardRole
  roleLabel: string
  navItems: DashboardNavItem[]
  pointTitle: string
  pointDescription: string
  topbarTitle: string
  topbarDescription: string
  userLabel: string
  heroTitle: string
  heroDescription: string
  children: ReactNode
  side: ReactNode
  leftClassName?: string
}

function DashboardLayout({
  role,
  roleLabel,
  navItems,
  pointTitle,
  pointDescription,
  topbarTitle,
  topbarDescription,
  userLabel,
  heroTitle,
  heroDescription,
  children,
  side,
  leftClassName,
}: DashboardLayoutProps) {
  const storedRole = getStoredDashboardRole()

  if (!storedRole) return <Navigate to="/login" replace />
  if (storedRole !== role) return <Navigate to={`/dashboard/${storedRole}`} replace />

  return (
    <div className={`dashboard-layout dashboard-layout--${role}`}>
      <DashboardSidebar
        roleLabel={roleLabel}
        navItems={navItems}
        pointTitle={pointTitle}
        pointDescription={pointDescription}
      />

      <main className="dashboard-main">
        <DashboardTopbar title={topbarTitle} description={topbarDescription} userLabel={userLabel} />

        <div className="dashboard-content">
          <section className={`dashboard-left${leftClassName ? ` ${leftClassName}` : ''}`}>
            <DashboardHero title={heroTitle} description={heroDescription} />
            {children}
          </section>
          <aside className="dashboard-right">{side}</aside>
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout
