import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import SectionBadge from '../common/SectionBadge'

interface RoleCard {
  id: string
  title: string
  icon: ReactNode
  items: string[]
  loginLabel: string
}

const storeIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6" />
  </svg>
)

const driverIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7M5.5 18.5a2 2 0 1 0 .1 0M18.5 18.5a2 2 0 1 0 .1 0" />
  </svg>
)

const centerIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M3 9l9-6 9 6v11H3zM3 9h18M9 20v-6h6v6" />
  </svg>
)

const roleCards: RoleCard[] = [
  {
    id: 'store',
    title: '점주',
    icon: storeIcon,
    items: ['상품 발주', '배송 상태 확인', '폐기 임박 상품 확인'],
    loginLabel: '점주 로그인',
  },
  {
    id: 'driver',
    title: '배송기사',
    icon: driverIcon,
    items: ['금일 배송 목록 확인', '배송 완료 처리', '미배송 사유 등록'],
    loginLabel: '기사 로그인',
  },
  {
    id: 'center',
    title: '물류센터',
    icon: centerIcon,
    items: ['재고 관리', '점포 발주 처리', '입고·출고 내역 관리'],
    loginLabel: '센터 로그인',
  },
]

function RoleSystem() {
  return (
    <section id="role-system" className="solution-section">
      <div className="solution-section__inner">
        <div className="solution-copy solution-copy--center">
          <SectionBadge>Role System</SectionBadge>
          <h2>역할별 관리 시스템</h2>
        </div>

        <div className="solution-grid">
          {roleCards.map((role) => (
            <article className="solution-card solution-card--role" key={role.id}>
              <div className="solution-icon">{role.icon}</div>

              <h3>{role.title}</h3>

              <ul className="solution-list">
                {role.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <Link className="solution-login" to="/login">
                {role.loginLabel}
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>

        <p className="solution-note">
          <span className="solution-note__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
          </span>
          온도 모니터링은 냉장·냉동 상품과 창고 온도를{' '}
          <b className="is-ok">정상</b> / <b className="is-warn">경고</b>로
          구분합니다. 사용자는 자신의 역할에 맞는 기능만 확인하며, 실제 업무
          처리는 로그인 후 역할별 대시보드에서 진행됩니다.
        </p>
      </div>
    </section>
  )
}

export default RoleSystem
