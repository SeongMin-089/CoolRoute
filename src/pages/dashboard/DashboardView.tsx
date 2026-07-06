import type { ReactNode } from 'react'
import { Link, Navigate, NavLink, useLocation } from 'react-router-dom'
import DashboardCard from '../../components/common/DashboardCard'
import {
  dashboardRoleData,
  type DashboardRole,
  type DashboardRoleData,
  type DashboardTone,
} from '../../data/dashboardData'
import {
  clearStoredDashboardRole,
  getStoredDashboardRole,
} from '../../utils/dashboardAuth'

interface DashboardViewProps {
  role: DashboardRole
  children?: ReactNode
}

const dashboardNavItems: Array<{
  label: string
  path: string
}> = [
  { label: '대시보드', path: '/dashboard/store' },
  { label: '발주관리', path: '/dashboard/store/orders' },
  { label: '배송현황', path: '/dashboard/store/delivery' },
  { label: '폐기관리', path: '/dashboard/store/disposal' },
]

const dashboardRoleNavItems: Record<
  DashboardRole,
  Array<{
    label: string
    path: string
  }>
> = {
  store: dashboardNavItems,
  driver: [
    { label: '대시보드', path: '/dashboard/driver' },
    { label: '배송목록', path: '/dashboard/driver/deliveries' },
    { label: '반품, 회수', path: '/dashboard/driver/returns' },
    { label: '미배송 관리', path: '/dashboard/driver/undelivered' },
  ],
  center: [
    { label: '대시보드', path: '/dashboard/center' },
    { label: '재고관리', path: '/dashboard/center/inventory' },
    { label: '주문처리', path: '/dashboard/center/orders' },
    { label: '입출고 내역', path: '/dashboard/center/inout' },
    { label: '창고 온도', path: '/dashboard/center/temperature' },
  ],
}

function DashboardOverview({
  role,
  dashboard,
}: {
  role: DashboardRole
  dashboard: DashboardRoleData
}) {
  return (
    <>
      <div className="dashboard-hero">
        <div className="dashboard-hero__copy">
          <span className="dashboard-eyebrow">{dashboard.eyebrow}</span>
          <h1 id="dashboard-title">{dashboard.title}</h1>
          <p>{dashboard.description}</p>
        </div>

        <div className="dashboard-hero__meta" aria-label="대시보드 정보">
          <span>{dashboard.updateLabel}</span>
          <strong>{dashboard.operator}</strong>
          <div className="dashboard-hero__actions">
            <button className="dashboard-action" type="button">
              {dashboard.secondaryAction}
            </button>
            <button
              className="dashboard-action dashboard-action--primary"
              type="button"
            >
              {dashboard.primaryAction}
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard-summary" aria-label="핵심 지표">
        {dashboard.summaryCards.map((card) => (
          <DashboardCard
            key={card.label}
            label={card.label}
            value={card.value}
            meta={card.meta}
            trend={card.trend}
            tone={card.tone}
          />
        ))}
      </div>

      <div className="dashboard-grid">
        <section
          className="dashboard-panel dashboard-panel--wide"
          aria-labelledby={`${role}-flow-title`}
        >
          <div className="dashboard-panel__titlebar">
            <div>
              <span className="dashboard-panel__eyebrow">Process</span>
              <h2 id={`${role}-flow-title`}>실시간 처리 흐름</h2>
            </div>
            <DashboardStatus tone="ok">Live</DashboardStatus>
          </div>

          <ol className="dashboard-flow">
            {dashboard.flow.map((item, index) => (
              <li key={item.label} className="dashboard-flow__item">
                <span
                  className={`dashboard-flow__step dashboard-flow__step--${item.tone}`}
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <div>
                  <strong>{item.label}</strong>
                  <p>{item.caption}</p>
                </div>
                <b>{item.value}</b>
              </li>
            ))}
          </ol>
        </section>

        <section
          className="dashboard-panel"
          aria-labelledby={`${role}-priority-title`}
        >
          <div className="dashboard-panel__titlebar">
            <div>
              <span className="dashboard-panel__eyebrow">Priority</span>
              <h2 id={`${role}-priority-title`}>우선 처리</h2>
            </div>
          </div>

          <ul className="dashboard-priority">
            {dashboard.priorityItems.map((item) => (
              <li
                key={item.title}
                className={`dashboard-priority__item dashboard-priority__item--${item.tone}`}
              >
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.detail}</p>
                </div>
                <span>{item.due}</span>
              </li>
            ))}
          </ul>
        </section>

        <section
          className="dashboard-panel dashboard-panel--wide"
          aria-labelledby={`${role}-records-title`}
        >
          <div className="dashboard-panel__titlebar">
            <div>
              <span className="dashboard-panel__eyebrow">Tasks</span>
              <h2 id={`${role}-records-title`}>{dashboard.recordTitle}</h2>
              <p>{dashboard.recordCaption}</p>
            </div>
          </div>

          <div className="dashboard-table-wrap">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th scope="col">코드</th>
                  <th scope="col">업무</th>
                  <th scope="col">담당</th>
                  <th scope="col">상태</th>
                  <th scope="col">예정</th>
                </tr>
              </thead>
              <tbody>
                {dashboard.records.map((record) => (
                  <tr key={record.code}>
                    <th scope="row">{record.code}</th>
                    <td>{record.title}</td>
                    <td>{record.owner}</td>
                    <td>
                      <DashboardStatus tone={record.tone}>
                        {record.status}
                      </DashboardStatus>
                    </td>
                    <td>{record.schedule}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section
          className="dashboard-panel"
          aria-labelledby={`${role}-monitor-title`}
        >
          <div className="dashboard-panel__titlebar">
            <div>
              <span className="dashboard-panel__eyebrow">Monitor</span>
              <h2 id={`${role}-monitor-title`}>{dashboard.monitorTitle}</h2>
              <p>{dashboard.monitorCaption}</p>
            </div>
          </div>

          <dl className="dashboard-monitor">
            {dashboard.monitors.map((item) => (
              <div
                key={item.label}
                className={`dashboard-monitor__item dashboard-monitor__item--${item.tone}`}
              >
                <dt>{item.label}</dt>
                <dd>
                  <strong>{item.value}</strong>
                  <span>{item.detail}</span>
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </>
  )
}

function DashboardStatus({
  tone,
  children,
}: {
  tone: DashboardTone
  children: string
}) {
  return (
    <span className={`dashboard-status dashboard-status--${tone}`}>
      {children}
    </span>
  )
}

function DashboardAccessDenied({
  authenticatedRole,
  requestedRole,
}: {
  authenticatedRole: DashboardRole
  requestedRole: DashboardRole
}) {
  const authenticatedDashboard = dashboardRoleData[authenticatedRole]
  const requestedDashboard = dashboardRoleData[requestedRole]

  return (
    <main className="dashboard-access">
      <section className="dashboard-access__card" aria-labelledby="access-title">
        <span className="dashboard-access__eyebrow">Access restricted</span>
        <h1 id="access-title">접근 권한이 없습니다.</h1>
        <p>
          현재 로그인 역할은 {authenticatedDashboard.roleName}입니다.{' '}
          {requestedDashboard.roleName} 대시보드는 해당 역할 계정으로 로그인해야
          볼 수 있습니다.
        </p>
        <div className="dashboard-access__actions">
          <Link
            className="dashboard-action dashboard-action--primary"
            to={`/dashboard/${authenticatedRole}`}
          >
            내 대시보드로 이동
          </Link>
          <Link
            className="dashboard-action"
            to="/login"
            onClick={clearStoredDashboardRole}
          >
            다시 로그인
          </Link>
        </div>
      </section>
    </main>
  )
}

function DashboardView({ role, children }: DashboardViewProps) {
  const location = useLocation()
  const authenticatedRole = getStoredDashboardRole()

  if (!authenticatedRole) {
    return <Navigate to="/login" replace />
  }

  if (authenticatedRole !== role) {
    return (
      <DashboardAccessDenied
        authenticatedRole={authenticatedRole}
        requestedRole={role}
      />
    )
  }

  const dashboard = dashboardRoleData[role]
  const isOverviewPath = location.pathname === `/dashboard/${role}`
  const navItems = dashboardRoleNavItems[role]

  return (
    <main className={`dashboard-shell dashboard-shell--${role}`}>
      <aside className="dashboard-sidebar" aria-label="대시보드 메뉴">
        <Link className="dashboard-brand" to="/" aria-label="CoolRoute 홈">
          <span className="dashboard-brand__mark" aria-hidden="true">
            C
          </span>
          <span className="dashboard-brand__text">CoolRoute</span>
        </Link>

        <nav className="dashboard-sidebar__nav" aria-label="하위 메뉴">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              className={({ isActive }) =>
                `dashboard-sidebar__link${isActive ? ' is-active' : ''}`
              }
              to={item.path}
              end={item.path === `/dashboard/${role}`}
            >
              <span className="dashboard-sidebar__dot" aria-hidden="true" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="dashboard-sidebar__profile">
          <span className="dashboard-sidebar__label">접속 역할</span>
          <strong>{dashboard.roleName}</strong>
          <p>{dashboard.operator}</p>
        </div>

        <Link
          className="dashboard-sidebar__logout"
          to="/login"
          onClick={clearStoredDashboardRole}
        >
          로그인 화면으로
        </Link>
      </aside>

      <section
        className={`dashboard-workspace${
          isOverviewPath ? '' : ' dashboard-workspace--subpage'
        }`}
        aria-labelledby={isOverviewPath ? 'dashboard-title' : undefined}
      >
        {isOverviewPath ? (
          <DashboardOverview role={role} dashboard={dashboard} />
        ) : (
          children
        )}
      </section>
    </main>
  )
}

export default DashboardView
