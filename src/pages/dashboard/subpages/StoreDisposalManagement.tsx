import { Link, NavLink } from 'react-router-dom'
import '../../../styles/pages/dashboard/StoreDashboard.scss'
import { clearStoredDashboardRole } from '../../../utils/dashboardAuth'

type StatTone = 'blue' | 'green' | 'orange' | 'red'

interface DisposalStat {
  title: string
  value: string
  desc: string
  tone: StatTone
}

interface DisposalRow {
  code: string
  product: string
  category: string
  quantity: string
  deadline: string
  status: string
  action: string
}

interface DisposalCard {
  title: string
  desc: string
  tags: string[]
  status: string
  actions: string[]
}

const stats: DisposalStat[] = [
  {
    title: '폐기 임박',
    value: '7 SKU',
    desc: '유제품 4, 간편식 3',
    tone: 'orange',
  },
  {
    title: '폐기 등록',
    value: '4건',
    desc: '회수 대기 2건',
    tone: 'blue',
  },
  {
    title: '회수 예정',
    value: '2건',
    desc: '17:30 방문 예정',
    tone: 'green',
  },
  {
    title: '손실 예상',
    value: '38,000원',
    desc: '전일 대비 -12%',
    tone: 'red',
  },
]

const disposalCards: DisposalCard[] = [
  {
    title: '바나나우유 250ml',
    desc: '오늘 18:00 기한 · 유제품',
    tags: ['4개', '폐기 임박', '냉장'],
    status: '확인 필요',
    actions: ['폐기 등록', '할인 전환'],
  },
  {
    title: '참치마요 삼각김밥',
    desc: '오늘 22:00 기한 · 간편식',
    tags: ['6개', '할인 권장', '판매 가능'],
    status: '할인 권장',
    actions: ['할인 등록', '폐기 보류'],
  },
  {
    title: '딸기 요구르트',
    desc: '오늘 20:00 기한 · 유제품',
    tags: ['2개', '회수 예정', 'BOX-09'],
    status: '회수 예정',
    actions: ['회수 확인', '상세 보기'],
  },
]

const disposalRows: DisposalRow[] = [
  {
    code: 'EXP-101',
    product: '바나나우유 250ml',
    category: '유제품',
    quantity: '4개',
    deadline: '오늘 18:00',
    status: '폐기 임박',
    action: '확인 필요',
  },
  {
    code: 'EXP-102',
    product: '참치마요 삼각김밥',
    category: '간편식',
    quantity: '6개',
    deadline: '오늘 22:00',
    status: '할인 권장',
    action: '등록 대기',
  },
  {
    code: 'EXP-103',
    product: '샐러드 컵',
    category: '신선식품',
    quantity: '3개',
    deadline: '내일 09:00',
    status: '확인 필요',
    action: '확인 중',
  },
  {
    code: 'EXP-104',
    product: '딸기 요구르트',
    category: '유제품',
    quantity: '2개',
    deadline: '오늘 20:00',
    status: '폐기 등록',
    action: '회수 예정',
  },
]

const urgentItems = [
  {
    title: '유제품 폐기 확인',
    desc: '바나나우유 외 4개 품목',
    action: '확인',
  },
  {
    title: '할인 판매 전환',
    desc: '삼각김밥 6개 · 오늘 22:00',
    action: '등록',
  },
]

const pickupItems = [
  {
    title: '회수 박스',
    desc: 'BOX-09 · 회수 대기',
    action: '확인',
  },
  {
    title: '담당 기사',
    desc: '김도윤 기사 · 오늘 17:30',
    action: '연락',
  },
]

const guideItems = [
  {
    title: '할인 가능 상품 확인',
    desc: '폐기 전 할인 판매 가능한 상품을 먼저 확인하세요.',
    action: '확인',
  },
  {
    title: '냉장 상품 분리 보관',
    desc: '회수 요청 상품은 회수 박스에 따로 보관하세요.',
    action: '완료',
  },
]

function StoreDisposalManagement() {
  return (
    <div className="store-dashboard">
      <aside className="store-dashboard__sidebar">
        <Link className="store-dashboard__brand" to="/">
          <div className="store-dashboard__brand-icon">C</div>
          <div>
            <strong>CoolRoute</strong>
            <span>Cold Chain System</span>
          </div>
        </Link>

        <nav className="store-dashboard__nav" aria-label="점주 메뉴">
          <NavLink to="/dashboard/store" end>
            <span>▦</span>
            대시보드
          </NavLink>
          <NavLink to="/dashboard/store/orders">
            <span>≡</span>
            발주관리
          </NavLink>
          <NavLink to="/dashboard/store/delivery">
            <span>▸</span>
            배송현황
          </NavLink>
          <NavLink to="/dashboard/store/disposal">
            <span>!</span>
            폐기관리
          </NavLink>
        </nav>

        <div className="store-dashboard__point">
          <strong>폐기 확인 포인트</strong>
          <p>
            폐기 전 할인 판매 가능 여부를 먼저 확인하세요. 회수 요청 상품은
            판매 재고에서 제외됩니다.
          </p>
        </div>
      </aside>

      <main className="store-dashboard__main">
        <header className="store-dashboard__topbar">
          <div>
            <strong>점주 관리 시스템</strong>
            <p>유통기한 임박 상품과 회수 처리 상태를 한 화면에서 관리합니다.</p>
          </div>

          <div className="store-dashboard__user">
            <span>점주(store)</span>
              <Link to="/" onClick={clearStoredDashboardRole}>
                로그아웃
              </Link>
          </div>
        </header>

        <div className="store-dashboard__content">
          <section className="store-dashboard__left store-dashboard__left--disposal">
            <section className="store-card store-hero">
              <h1>폐기 관리</h1>
              <p>
                유통기한 임박 상품, 할인 전환 대상, 회수 예정 상품을 확인하고
                처리하세요.
              </p>
            </section>

            <section className="store-dashboard__stats">
              {stats.map((stat) => (
                <article
                  key={stat.title}
                  className={`store-card store-stat store-stat--${stat.tone}`}
                >
                  <span>{stat.title}</span>
                  <strong>{stat.value}</strong>
                  <p>{stat.desc}</p>
                </article>
              ))}
            </section>

            <section className="store-card store-alert">
              <strong>폐기 알림</strong>
              <p>
                유제품 4개 품목은 오늘 중 확인이 필요합니다. 할인 판매 가능한
                상품은 폐기 등록 전에 먼저 처리하세요.
              </p>
            </section>

            <section className="store-card store-disposal-board">
              <div className="store-section-title">
                <div>
                  <h2>폐기 처리 현황</h2>
                  <p>폐기, 할인, 회수 대상 상품을 빠르게 확인합니다.</p>
                </div>
                <button type="button">폐기 등록</button>
              </div>

              <div className="store-disposal-board__items">
                {disposalCards.map((item) => (
                  <article key={item.title} className="store-disposal-card">
                    <div className="store-disposal-card__head">
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.desc}</p>
                      </div>
                      <span>{item.status}</span>
                    </div>

                    <div className="store-disposal-card__tags">
                      {item.tags.map((tag) => (
                        <em key={tag}>{tag}</em>
                      ))}
                    </div>

                    <div className="store-disposal-card__actions">
                      {item.actions.map((action) => (
                        <button key={action} type="button">
                          {action}
                        </button>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="store-card store-disposal-table-card">
              <div className="store-section-title">
                <div>
                  <h2>폐기 / 회수 목록</h2>
                  <p>상품별 기한과 처리 상태입니다.</p>
                </div>
                <button type="button">기록 관리</button>
              </div>

              <div className="store-disposal-table">
                <table>
                  <thead>
                    <tr>
                      <th>코드</th>
                      <th>상품명</th>
                      <th>구분</th>
                      <th>수량</th>
                      <th>기한</th>
                      <th>상태</th>
                      <th>처리</th>
                    </tr>
                  </thead>
                  <tbody>
                    {disposalRows.map((row) => (
                      <tr key={row.code}>
                        <td>{row.code}</td>
                        <td>{row.product}</td>
                        <td>{row.category}</td>
                        <td>{row.quantity}</td>
                        <td>{row.deadline}</td>
                        <td>
                          <span>{row.status}</span>
                        </td>
                        <td>{row.action}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </section>

          <aside className="store-dashboard__right">
            <section className="store-card store-profile">
              <div className="store-profile__top">
                <div className="store-profile__avatar">폐</div>
                <div>
                  <strong>강남역 2호점</strong>
                  <p>store_01 · 폐기 확인</p>
                </div>
              </div>

              <dl>
                <div>
                  <dt>폐기 상태</dt>
                  <dd>확인중</dd>
                </div>
                <div>
                  <dt>폐기 임박</dt>
                  <dd>7 SKU</dd>
                </div>
                <div>
                  <dt>회수 예정</dt>
                  <dd>2건</dd>
                </div>
                <div>
                  <dt>마지막 갱신</dt>
                  <dd>오늘 09:42</dd>
                </div>
              </dl>
            </section>

            <section className="store-card store-side-card">
              <h2>우선 확인</h2>
              <p>먼저 처리할 폐기 항목입니다.</p>

              <div className="store-side-card__list">
                {urgentItems.map((item) => (
                  <div className="store-mini-item" key={item.title}>
                    <div>
                      <strong>{item.title}</strong>
                      <span>{item.desc}</span>
                    </div>
                    <button type="button">{item.action}</button>
                  </div>
                ))}
              </div>
            </section>

            <section className="store-card store-side-card">
              <h2>회수 정보</h2>
              <p>오늘 회수 예정 정보입니다.</p>

              <div className="store-side-card__list">
                {pickupItems.map((item) => (
                  <div className="store-mini-item" key={item.title}>
                    <div>
                      <strong>{item.title}</strong>
                      <span>{item.desc}</span>
                    </div>
                    <button type="button">{item.action}</button>
                  </div>
                ))}
              </div>
            </section>

            <section className="store-card store-side-card">
              <h2>처리 안내</h2>
              <p>폐기 전 확인할 기준입니다.</p>

              <div className="store-side-card__list">
                {guideItems.map((item) => (
                  <div className="store-mini-item" key={item.title}>
                    <div>
                      <strong>{item.title}</strong>
                      <span>{item.desc}</span>
                    </div>
                    <button type="button">{item.action}</button>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  )
}

export default StoreDisposalManagement
