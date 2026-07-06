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

const dashboardRoleNavItems: Record<
  DashboardRole,
  Array<{
    label: string
    path: string
  }>
> = {
  store: [
    { label: '대시보드', path: '/dashboard/store' },
    { label: '발주 관리', path: '/dashboard/store/orders' },
    { label: '배송 현황', path: '/dashboard/store/delivery' },
    { label: '폐기 관리', path: '/dashboard/store/disposal' },
  ],
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

const storeOverviewData: DashboardRoleData = {
  role: 'store',
  roleName: '점주',
  eyebrow: 'Store Workspace',
  title: '점포 대시보드',
  description: '오늘 발주, 배송, 입고, 폐기 현황을 한눈에 확인하세요.',
  operator: '강남역 2호점',
  updateLabel: '오늘 09:42 기준',
  primaryAction: '발주 등록',
  secondaryAction: '입고 처리',
  summaryCards: [
    {
      label: '발주 승인',
      value: '18건',
      meta: '자동 승인 14건',
      trend: '전일 대비 +4',
      tone: 'ok',
    },
    {
      label: '다음 입고',
      value: '12:30',
      meta: '냉장 배송 2건 대기',
      trend: '예정',
      tone: 'info',
    },
    {
      label: '폐기 임박',
      value: '7 SKU',
      meta: '유제품 4, 간편식 3',
      trend: '확인 필요',
      tone: 'warn',
    },
    {
      label: '냉장 온도',
      value: '3.1°C',
      meta: '최근 2시간 정상',
      trend: '정상',
      tone: 'ok',
    },
  ],
  flow: [
    {
      label: '발주 접수',
      value: '24',
      caption: '오전 발주 마감 전',
      tone: 'info',
    },
    {
      label: '센터 승인',
      value: '21',
      caption: '수량 조정 3건',
      tone: 'warn',
    },
    {
      label: '배송 중',
      value: '12',
      caption: '1차 배송 이동 중',
      tone: 'ok',
    },
    {
      label: '입고 완료',
      value: '9',
      caption: '검수 완료',
      tone: 'ok',
    },
  ],
  priorityItems: [
    {
      title: '폐기 임박 상품',
      detail: '바나나우유 250ml 등 6개 품목 확인 필요',
      due: '10:30까지',
      tone: 'warn',
    },
    {
      title: '재발주 필요 상품',
      detail: '삼각김밥 재고가 안전 기준보다 낮습니다.',
      due: '11:00까지',
      tone: 'risk',
    },
    {
      title: '1차 배송 입고',
      detail: '냉장 18박스, 상온 11박스 도착 예정',
      due: '12:30 예정',
      tone: 'info',
    },
    {
      title: '행사 상품 보충',
      detail: '아이스크림 행사 상품 3종 보충 필요',
      due: '영업 중',
      tone: 'ok',
    },
  ],
  recordTitle: '오늘 처리 현황',
  recordCaption: '배송, 입고, 폐기 관련 주요 업무를 정리했습니다.',
  records: [
    {
      code: 'ORD-2407',
      title: '냉장 신선식품 묶음',
      owner: '강남센터 1차',
      status: '배송 중',
      schedule: '12:30',
      tone: 'ok',
    },
    {
      code: 'ORD-2411',
      title: '간편식 프로모션',
      owner: '강남센터 2차',
      status: '피킹 완료',
      schedule: '15:00',
      tone: 'info',
    },
    {
      code: 'RTN-0912',
      title: '폐기 회수 등록',
      owner: '점포 담당',
      status: '확인 필요',
      schedule: '10:30',
      tone: 'warn',
    },
    {
      code: 'SFT-3301',
      title: '안전 재고 자동 제안',
      owner: 'AI 추천',
      status: '승인 대기',
      schedule: '11:00',
      tone: 'risk',
    },
  ],
  monitorTitle: '점포 상태',
  monitorCaption: '냉장 설비와 재고 이상 여부를 확인하세요.',
  monitors: [
    {
      label: '냉장 쇼케이스',
      value: '3.0°C',
      detail: '정상 범위 유지',
      tone: 'ok',
    },
    {
      label: '냉동고',
      value: '-19.4°C',
      detail: '정상 가동',
      tone: 'ok',
    },
    {
      label: '안전 재고 미달',
      value: '3개',
      detail: '김밥, 샐러드, 생수',
      tone: 'warn',
    },
    {
      label: '미검수 박스',
      value: '0개',
      detail: '미검수 없음',
      tone: 'info',
    },
  ],
}

const storeQuickActions = ['발주 등록', '배송 현황', '폐기 등록', '입고 처리'] as const

const storeRecentActivities = [
  'ORD-2407 냉장 신선식품 묶음 배송 중',
  'RTN-0912 폐기 회수 등록 확인 필요',
  'SFT-3301 안전 재고 제안 승인 대기',
  'DLV-1201 1차 배송 도착 예정',
] as const

const storeTodayAlerts = [
  '아이스크림 행사 상품 재고가 안전 기준보다 낮습니다.',
  '1차 냉장 배송은 12:30 도착 예정입니다.',
  '유제품 4개 품목은 오늘 폐기 여부 확인이 필요합니다.',
] as const

function getDashboardData(role: DashboardRole) {
  return role === 'store' ? storeOverviewData : dashboardRoleData[role]
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

        {role === 'store' && (
          <>
            <section
              className="dashboard-panel"
              aria-labelledby="store-quick-title"
            >
              <div className="dashboard-panel__titlebar">
                <div>
                  <span className="dashboard-panel__eyebrow">Quick</span>
                  <h2 id="store-quick-title">빠른 작업</h2>
                  <p>자주 처리하는 점포 업무를 바로 확인하세요.</p>
                </div>
              </div>

              <div className="dashboard-subpage__filters">
                {storeQuickActions.map((action) => (
                  <button className="dashboard-action" type="button" key={action}>
                    {action}
                  </button>
                ))}
              </div>
            </section>

            <section
              className="dashboard-panel"
              aria-labelledby="store-activity-title"
            >
              <div className="dashboard-panel__titlebar">
                <div>
                  <span className="dashboard-panel__eyebrow">Activity</span>
                  <h2 id="store-activity-title">최근 활동</h2>
                  <p>발주, 배송, 폐기 흐름을 최근 순서로 정리했습니다.</p>
                </div>
              </div>

              <ol className="dashboard-timeline">
                {storeRecentActivities.map((activity) => (
                  <li key={activity}>{activity}</li>
                ))}
              </ol>
            </section>

            <section
              className="dashboard-panel dashboard-panel--wide"
              aria-labelledby="store-alert-title"
            >
              <div className="dashboard-panel__titlebar">
                <div>
                  <span className="dashboard-panel__eyebrow">Notice</span>
                  <h2 id="store-alert-title">오늘 알림</h2>
                  <p>점포 운영 중 놓치기 쉬운 항목입니다.</p>
                </div>
              </div>

              <ul className="dashboard-info-list dashboard-info-list--inline">
                {storeTodayAlerts.map((alert) => (
                  <li key={alert}>{alert}</li>
                ))}
              </ul>
            </section>
          </>
        )}
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
  const authenticatedDashboard = getDashboardData(authenticatedRole)
  const requestedDashboard = getDashboardData(requestedRole)

  return (
    <main className="dashboard-access">
      <section className="dashboard-access__card" aria-labelledby="access-title">
        <span className="dashboard-access__eyebrow">Access restricted</span>
        <h1 id="access-title">접근 권한이 없습니다.</h1>
        <p>
          현재 로그인한 역할은 {authenticatedDashboard.roleName}입니다.{' '}
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

  const dashboard = getDashboardData(role)
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
