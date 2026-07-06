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
    { label: '발주관리', path: '/dashboard/store/orders' },
    { label: '배송현황', path: '/dashboard/store/delivery' },
    { label: '폐기관리', path: '/dashboard/store/disposal' },
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
  roleName: '편의점주',
  eyebrow: 'Store Workspace',
  title: '점포 운영 대시보드',
  description:
    '오늘 발주, 입고 예정, 배송 상태, 폐기 임박 상품을 한 화면에서 확인합니다.',
  operator: '강남역 2호점',
  updateLabel: '오늘 09:42 기준',
  primaryAction: '발주 등록',
  secondaryAction: '입고 확인',
  summaryCards: [
    {
      label: '오늘 발주 승인',
      value: '18건',
      meta: '자동 승인 14건',
      trend: '+4건',
      tone: 'ok',
    },
    {
      label: '입고 예정',
      value: '12:30',
      meta: '냉장 차량 2대 대기',
      trend: '정상',
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
      label: '냉장 평균 온도',
      value: '3.1°C',
      meta: '최근 2시간 안정권',
      trend: '정상',
      tone: 'ok',
    },
  ],
  flow: [
    {
      label: '발주 요청',
      value: '24',
      caption: '오전 마감 전 접수',
      tone: 'info',
    },
    {
      label: '센터 승인',
      value: '21',
      caption: '3건 수량 조정 대기',
      tone: 'warn',
    },
    {
      label: '배송 중',
      value: '12',
      caption: '1차 배송 도착 예정',
      tone: 'ok',
    },
    {
      label: '입고 완료',
      value: '9',
      caption: '검수 완료 처리',
      tone: 'ok',
    },
  ],
  priorityItems: [
    {
      title: '폐기 임박 상품 확인',
      detail: '바나나우유 250ml 등 6개 품목의 처리 여부를 확인합니다.',
      due: '10:30까지',
      tone: 'warn',
    },
    {
      title: '긴급 재발주 검토',
      detail: '삼각김밥 재고가 안전 재고 아래로 내려갔습니다.',
      due: '11:00까지',
      tone: 'risk',
    },
    {
      title: '1차 배송 입고 검수',
      detail: '냉장 박스 18개, 상온 박스 11개 도착 예정입니다.',
      due: '12:30 예정',
      tone: 'info',
    },
    {
      title: '프로모션 진열 수량 조정',
      detail: '아이스크림 행사 SKU 3종의 매대 보충이 필요합니다.',
      due: '영업 중',
      tone: 'ok',
    },
  ],
  recordTitle: '오늘 입고 및 처리 목록',
  recordCaption: '점포 기준으로 도착 예정과 검수 상태를 정리했습니다.',
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
  monitorTitle: '점포 모니터링',
  monitorCaption: '냉장 설비와 재고 예외 신호를 요약합니다.',
  monitors: [
    {
      label: '냉장 쇼케이스',
      value: '3.0°C',
      detail: '허용 범위 유지',
      tone: 'ok',
    },
    {
      label: '냉동고',
      value: '-19.4°C',
      detail: '정상 순환',
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
      detail: '대기 없음',
      tone: 'info',
    },
  ],
}

const storeQuickActions = [
  '발주 등록',
  '배송 현황 확인',
  '폐기 상품 등록',
  '입고 검수 처리',
] as const

const storeRecentActivities = [
  'ORD-2407 냉장 신선식품 묶음 배송 중',
  'RTN-0912 폐기 회수 등록 확인 필요',
  'SFT-3301 안전 재고 자동 제안 승인 대기',
  'DLV-1201 1차 배송 도착 예정',
] as const

const storeTodayAlerts = [
  '아이스크림 행사 상품 재고가 안전 기준 아래로 내려갔습니다.',
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
                  <p>점주가 자주 처리하는 업무를 바로 확인합니다.</p>
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
                  <p>최근 발주, 배송, 폐기 흐름을 시간순으로 정리했습니다.</p>
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
                  <p>점포 운영 중 놓치기 쉬운 확인 항목입니다.</p>
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
