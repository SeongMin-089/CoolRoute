import type { ReactNode } from 'react'
import { Link, Navigate, NavLink } from 'react-router-dom'
import { clearStoredDashboardRole, getStoredDashboardRole } from '../../utils/dashboardAuth'

type Tone = 'ok' | 'warn' | 'risk' | 'info'

export interface CenterSummaryItem {
  label: string
  value: string
  meta: string
  tone: Tone
}

export interface CenterBoardItem {
  title: string
  desc: string
  tags: string[]
  status: string
  tone: Tone
}

const navItems = [
  { label: '대시보드', path: '/dashboard/center' },
  { label: '재고관리', path: '/dashboard/center/inventory' },
  { label: '주문처리', path: '/dashboard/center/orders' },
  { label: '입출고 내역', path: '/dashboard/center/inout' },
  { label: '창고 온도', path: '/dashboard/center/temperature' },
]

export function CenterDashboardShell({
  title,
  description,
  children,
  side,
}: {
  title: string
  description: string
  children: ReactNode
  side: ReactNode
}) {
  const role = getStoredDashboardRole()

  if (!role) return <Navigate to="/login" replace />
  if (role !== 'center') return <Navigate to={`/dashboard/${role}`} replace />

  return (
    <div className="center-dashboard">
      <aside className="center-dashboard__sidebar">
        <Link className="center-dashboard__brand" to="/">
          <strong>CoolRoute</strong>
          <span>Cold Chain System</span>
        </Link>

        <nav className="center-dashboard__nav" aria-label="물류센터 메뉴">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/dashboard/center'}
              className={({ isActive }) =>
                `center-dashboard__nav-link${isActive ? ' is-active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="center-dashboard__point">
          <strong>센터 확인 포인트</strong>
          <p>출고 지연, 안전 재고 미달, 냉장/냉동 온도 이상을 우선 확인하세요.</p>
        </div>
      </aside>

      <main className="center-dashboard__main">
        <header className="center-dashboard__topbar">
          <div>
            <span>물류센터 관리 시스템</span>
            <p>재고, 주문, 입출고, 창고 온도 상태를 한 화면에서 관리합니다.</p>
          </div>
          <div className="center-dashboard__user">
            <strong>물류센터(center)</strong>
            <Link to="/" onClick={clearStoredDashboardRole}>
              로그아웃
            </Link>
          </div>
        </header>

        <div className="center-dashboard__content">
          <section className="center-dashboard__left">
            <section className="center-card center-hero">
              <span className="center-eyebrow">Center Workspace</span>
              <h1>{title}</h1>
              <p>{description}</p>
            </section>
            {children}
          </section>
          <aside className="center-dashboard__right">{side}</aside>
        </div>
      </main>
    </div>
  )
}

export function CenterStats({ items }: { items: CenterSummaryItem[] }) {
  return (
    <section className="center-dashboard__stats">
      {items.map((item) => (
        <article className={`center-stat center-stat--${item.tone}`} key={item.label}>
          <span>{item.label}</span>
          <strong>{item.value}</strong>
          <p>{item.meta}</p>
        </article>
      ))}
    </section>
  )
}

export function CenterBoard({ items }: { items: CenterBoardItem[] }) {
  return (
    <section className="center-card center-board">
      <div className="center-card__titlebar">
        <div>
          <span className="center-eyebrow">Work Board</span>
          <h2>주요 작업 현황</h2>
        </div>
      </div>
      <div className="center-board__items">
        {items.map((item) => (
          <article className="center-work-card" key={item.title}>
            <div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
            <div className="center-work-card__tags">
              {item.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <b className={`center-status center-status--${item.tone}`}>{item.status}</b>
          </article>
        ))}
      </div>
    </section>
  )
}

export function CenterSide({
  title,
  items,
}: {
  title: string
  items: Array<{ label: string; value: string; status?: string }>
}) {
  return (
    <section className="center-side-card">
      <span className="center-eyebrow">Side Panel</span>
      <h2>{title}</h2>
      <ul>
        {items.map((item) => (
          <li className="center-mini-item" key={`${item.label}-${item.value}`}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
            {item.status && <em>{item.status}</em>}
          </li>
        ))}
      </ul>
    </section>
  )
}

const summary = [
  { label: '신규 주문', value: '42건', meta: '자동 승인 31건', tone: 'info' },
  { label: '피킹 진행', value: '31건', meta: '냉장 18건', tone: 'ok' },
  { label: '출고 대기', value: '9건', meta: '피크 배차 대기', tone: 'warn' },
  { label: '온도 이상', value: '2건', meta: '냉동 구역 확인 필요', tone: 'risk' },
] satisfies CenterSummaryItem[]

const board = [
  { title: '냉장 피킹 1차', desc: '강남권 점포 출고 준비', tags: ['냉장', '18건 진행중'], status: '피킹 중', tone: 'ok' },
  { title: 'B 피크 출고', desc: '차량 배차 대기', tags: ['출고', '9건 지연 위험'], status: '확인 필요', tone: 'risk' },
  { title: '재고 보충', desc: '안전 재고 미달 상품', tags: ['김밥', '샐러드', '생수'], status: '보충 필요', tone: 'warn' },
] satisfies CenterBoardItem[]

const rows = [
  ['WMS-3812', '냉장 피킹 1차', '박서준', '피킹', '진행 중', '10:10', 'ok'],
  ['WMS-3820', 'B 피크 출고', '이하린', '출고', '지연 위험', '10:20', 'risk'],
  ['WMS-3828', '상온 보충 입고', '최민재', '입고', '검수 대기', '11:00', 'info'],
  ['WMS-3834', '폐기 회수 분류', '정유나', '회수', '작업 예약', '14:00', 'warn'],
] as const

function CenterDashboard() {
  return (
    <CenterDashboardShell
      title="센터 대시보드"
      description="오늘 처리할 주문, 피킹, 입출고, 재고와 창고 온도 상태를 확인하세요."
      side={
        <>
          <CenterSide
            title="센터 프로필"
            items={[
              { label: '센터', value: '강남 통합물류센터' },
              { label: '계정', value: 'center_01 · 통합 관리' },
              { label: '출고 대기', value: '9건', status: '확인' },
              { label: '온도 이상', value: '2건', status: '즉시' },
            ]}
          />
          <CenterSide
            title="센터 모니터링"
            items={[
              { label: '냉장 창고', value: '2.4°C', status: '정상' },
              { label: '냉동 창고', value: '-17.8°C', status: '확인' },
              { label: '출고 피크', value: '82%', status: '보기' },
            ]}
          />
        </>
      }
    >
      <CenterStats items={summary} />
      <section className="center-card center-alert">
        <strong>센터 알림</strong>
        <p>B 피크 출고 대기 3건과 냉동 F-02 온도 확인이 필요합니다. 안전 재고 미달 상품은 재고관리에서 우선 확인하세요.</p>
      </section>
      <CenterBoard items={board} />
      <section className="center-card center-table-card">
        <div className="center-card__titlebar">
          <div>
            <span className="center-eyebrow">Task List</span>
            <h2>센터 작업 목록</h2>
          </div>
        </div>
        <div className="center-table-wrap">
          <table className="center-table">
            <thead>
              <tr>
                <th>작업코드</th>
                <th>작업명</th>
                <th>담당자</th>
                <th>구분</th>
                <th>상태</th>
                <th>예정</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row[0]}>
                  <th>{row[0]}</th>
                  <td>{row[1]}</td>
                  <td>{row[2]}</td>
                  <td>{row[3]}</td>
                  <td><span className={`center-status center-status--${row[6]}`}>{row[4]}</span></td>
                  <td>{row[5]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </CenterDashboardShell>
  )
}

export default CenterDashboard
