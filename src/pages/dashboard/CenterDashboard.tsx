import type { ReactNode } from 'react'
import { Link, Navigate, NavLink } from 'react-router-dom'
import '../../styles/pages/dashboard/CenterDashboard.scss'
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
  { label: '대시보드', path: '/dashboard/center', icon: '⌂' },
  { label: '재고관리', path: '/dashboard/center/inventory', icon: '□' },
  { label: '주문처리', path: '/dashboard/center/orders', icon: '✓' },
  { label: '입출고 내역', path: '/dashboard/center/inout', icon: '↕' },
  { label: '창고 온도', path: '/dashboard/center/temperature', icon: '°' },
]

const flowSteps = [
  { label: '주문 접수', value: '42건', desc: '오전 마감 접수' },
  { label: '피킹 진행', value: '31건', desc: '냉장 18건 우선 처리' },
  { label: '출고 대기', value: '9건', desc: '피크 배차 확인' },
  { label: '검수 완료', value: '27건', desc: '이상 없음' },
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
          <div className="center-dashboard__brand-icon">C</div>
          <div>
            <strong>CoolRoute</strong>
            <span>Cold Chain System</span>
          </div>
        </Link>

        <nav className="center-dashboard__nav" aria-label="물류센터 메뉴">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} end={item.path === '/dashboard/center'}>
              <span>{item.icon}</span>
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
            <strong>물류센터 관리 시스템</strong>
            <p>재고, 주문, 입출고, 창고 온도 상태를 한 화면에서 관리합니다.</p>
          </div>

          <div className="center-dashboard__user">
            <span>물류센터(center)</span>
            <Link to="/" onClick={clearStoredDashboardRole}>
              로그아웃
            </Link>
          </div>
        </header>

        <div className="center-dashboard__content">
          <section className="center-dashboard__left">
            <section className="center-card center-hero">
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
        <article className={`center-card center-stat center-stat--${item.tone}`} key={item.label}>
          <span>{item.label}</span>
          <strong>{item.value}</strong>
          <p>{item.meta}</p>
        </article>
      ))}
    </section>
  )
}

export function CenterFlowSummary() {
  return (
    <section className="center-card center-route">
      <div className="center-section-title">
        <div>
          <h2>오늘 작업 흐름</h2>
          <p>접수부터 출고까지 현재 처리 단계를 확인합니다.</p>
        </div>
      </div>

      <div className="center-flow-summary">
        {flowSteps.map((step) => (
          <article className="center-flow-summary__item" key={step.label}>
            <span>{step.label}</span>
            <strong>{step.value}</strong>
            <p>{step.desc}</p>
          </article>
        ))}
      </div>

      <div className="center-progress">
        <div className="center-progress__text">
          <strong>74%</strong>
          <span>처리</span>
        </div>
        <div className="center-progress__bar">
          <span />
        </div>
        <div className="center-progress__info">
          <p>
            <strong>다음 출고</strong>
            <span>B 피크 1차</span>
          </p>
          <p>
            <strong>예상 마감</strong>
            <span>12:20</span>
          </p>
          <p>
            <strong>확인 필요</strong>
            <span>3건</span>
          </p>
        </div>
      </div>
    </section>
  )
}

export function CenterBoard({ items }: { items: CenterBoardItem[] }) {
  return (
    <section className="center-card center-board">
      <div className="center-section-title">
        <div>
          <h2>주요 작업 현황</h2>
          <p>현재 센터에서 우선 처리해야 할 작업을 확인합니다.</p>
        </div>
      </div>
      <div className="center-board__items">
        {items.map((item) => (
          <article className="center-work-card" key={item.title}>
            <div className="center-work-card__head">
              <div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
              <b className={`center-status center-status--${item.tone}`}>{item.status}</b>
            </div>
            <div className="center-work-card__tags">
              {item.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
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
    <section className="center-card center-side-card">
      <h2>{title}</h2>
      <p>물류센터 우선 확인 항목입니다.</p>

      <div className="center-side-card__list">
        {items.map((item) => (
          <div className="center-mini-item" key={`${item.label}-${item.value}`}>
            <div>
              <strong>{item.label}</strong>
              <span>{item.value}</span>
            </div>
            {item.status && <button type="button">{item.status}</button>}
          </div>
        ))}
      </div>
    </section>
  )
}

export function CenterProfile() {
  return (
    <section className="center-card center-profile">
      <div className="center-profile__top">
        <div className="center-profile__avatar">C</div>
        <div>
          <strong>강남 통합물류센터</strong>
          <p>center_01 · 통합 관리</p>
        </div>
      </div>

      <dl>
        <div>
          <dt>운영 상태</dt>
          <dd>정상 운영</dd>
        </div>
        <div>
          <dt>출고 대기</dt>
          <dd>9건</dd>
        </div>
        <div>
          <dt>냉장 평균</dt>
          <dd>2.4°C</dd>
        </div>
        <div>
          <dt>마지막 갱신</dt>
          <dd>오늘 09:45</dd>
        </div>
      </dl>
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
          <CenterProfile />
          <CenterSide
            title="센터 모니터링"
            items={[
              { label: '냉장 창고', value: '2.4°C', status: '정상' },
              { label: '냉동 창고', value: '-17.8°C', status: '확인' },
              { label: '출고 피크', value: '82%', status: '보기' },
            ]}
          />
          <CenterSide
            title="오늘 할 일"
            items={[
              { label: 'B 피크 배차', value: '출고 대기 3건', status: '확인' },
              { label: 'F-02 온도 점검', value: '기준 범위 초과', status: '즉시' },
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
      <CenterFlowSummary />
      <CenterBoard items={board} />
      <section className="center-card center-table-card">
        <div className="center-section-title">
          <div>
            <h2>센터 작업 목록</h2>
            <p>작업코드별 담당자와 예정 시간을 확인합니다.</p>
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
                  <td>
                    <span className={`center-status center-status--${row[6]}`}>{row[4]}</span>
                  </td>
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
