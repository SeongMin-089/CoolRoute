import type { ReactNode } from 'react'

export type DashboardTone = 'info' | 'ok' | 'warn' | 'risk'

function DashboardBadge({
  tone = 'info',
  children,
}: {
  tone?: DashboardTone
  children: ReactNode
}) {
  return <span className={`dashboard-badge dashboard-badge--${tone}`}>{children}</span>
}

export default DashboardBadge
