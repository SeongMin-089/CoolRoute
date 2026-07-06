import type { DashboardRole } from '../data/dashboardData'

export const DASHBOARD_AUTH_ROLE_KEY = 'coolroute-auth-role'

export function isDashboardRole(value: string | null): value is DashboardRole {
  return value === 'store' || value === 'driver' || value === 'center'
}

export function getStoredDashboardRole(): DashboardRole | null {
  if (typeof window === 'undefined') {
    return null
  }

  const storedRole = window.sessionStorage.getItem(DASHBOARD_AUTH_ROLE_KEY)

  return isDashboardRole(storedRole) ? storedRole : null
}

export function setStoredDashboardRole(role: DashboardRole) {
  window.sessionStorage.setItem(DASHBOARD_AUTH_ROLE_KEY, role)
}

export function clearStoredDashboardRole() {
  window.sessionStorage.removeItem(DASHBOARD_AUTH_ROLE_KEY)
}
