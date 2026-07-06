import { Link, NavLink } from "react-router-dom"
import "../../../styles/pages/dashboard/StoreDashboard.scss"
import { clearStoredDashboardRole } from "../../../utils/dashboardAuth"

type StatTone = "blue" | "green" | "orange" | "red"

interface OrderStat {
  title: string
  value: string
  desc: string
  tone: StatTone
}

interface OrderRow {
  code: string
  product: string
  category: string
  requested: string
  approved: string
  status: string
  deadline: string
}

interface OrderCard {
  title: string
  desc: string
  tags: string[]
  status: string
  actions: string[]
}

const stats: OrderStat[] = [
  {
    title: "발주 요청",
    value: "24건",
    desc: "오전 마감 전 접수",
    tone: "blue",
  },
  {
    title: "승인 완료",
    value: "18건",
    desc: "자동 승인 14건",
    tone: "green",
  },
  {
    title: "조정 대기",
    value: "3건",
    desc: "센터 수량 확인 필요",
    tone: "orange",
  },
  {
    title: "재발주 필요",
    value: "2건",
    desc: "안전 재고 기준 미달",
    tone: "red",
  },
]

const orderRows: OrderRow[] = [
  {
    code: "ORD-2407",
    product: "냉장 신선식품",
    category: "냉장",
    requested: "24",
    approved: "22",
    status: "승인 완료",
    deadline: "10:30",
  },
  {
    code: "ORD-2411",
    product: "간편식 행사 상품",
    category: "냉장",
    requested: "18",
    approved: "15",
    status: "조정 대기",
    deadline: "11:00",
  },
  {
    code: "ORD-2418",
    product: "삼각김밥 3종",
    category: "냉장",
    requested: "30",
    approved: "30",
    status: "승인 완료",
    deadline: "09:40",
  },
  {
    code: "ORD-2420",
    product: "생수 500ml",
    category: "상온",
    requested: "20",
    approved: "0",
    status: "승인 대기",
    deadline: "12:00",
  },
  {
    code: "ORD-2424",
    product: "아이스크림 행사 상품",
    category: "냉동",
    requested: "12",
    approved: "10",
    status: "확인 필요",
    deadline: "13:30",
  },
]

const orderCards: OrderCard[] = [
  {
    title: "냉장 신선식품",
    desc: "강남센터 1차 · 10:30 마감",
    tags: ["요청 24", "승인 22", "냉장"],
    status: "승인 완료",
    actions: ["상세 보기", "수정"],
  },
  {
    title: "간편식 행사 상품",
    desc: "행사 진열 수량 보충 필요",
    tags: ["요청 18", "승인 15", "조정"],
    status: "조정 대기",
    actions: ["확인", "보류"],
  },
  {
    title: "생수 500ml",
    desc: "안전 재고 기준 미달 상품",
    tags: ["요청 20", "승인 대기", "상온"],
    status: "승인 대기",
    actions: ["승인", "수정"],
  },
]

const recommendItems = [
  {
    title: "삼각김밥 3종",
    desc: "최근 판매량 증가 · 12개 추가 권장",
    action: "추가",
  },
  {
    title: "생수 500ml",
    desc: "안전 재고 기준 미달 · 20개 권장",
    action: "발주",
  },
  {
    title: "아이스크림 행사 상품",
    desc: "진열 수량 부족 · 8개 보충 권장",
    action: "확인",
  },
]

const urgentItems = [
  {
    title: "수량 조정 확인",
    desc: "간편식 행사 상품 · 11:00 마감",
    action: "확인",
  },
  {
    title: "재발주 승인",
    desc: "생수 · 샐러드 · 삼각김밥",
    action: "승인",
  },
]

function StoreOrderManagement() {
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
          <strong>발주 확인 포인트</strong>
          <p>
            마감 전 승인 대기와 수량 조정 건을 먼저 확인하세요. 냉장 상품은 배송
            시간 기준으로 우선 처리합니다.
          </p>
        </div>
      </aside>

      <main className="store-dashboard__main">
        <header className="store-dashboard__topbar">
          <div>
            <strong>점주 관리 시스템</strong>
            <p>오늘 발주 요청과 승인 상태를 한 화면에서 관리합니다.</p>
          </div>

          <div className="store-dashboard__user">
            <span>점주(store)</span>
              <Link to="/" onClick={clearStoredDashboardRole}>
                로그아웃
              </Link>
          </div>
        </header>

        <div className="store-dashboard__content">
          <section className="store-dashboard__left store-dashboard__left--orders">
            <section className="store-card store-hero">
              <h1>발주 관리</h1>
              <p>
                오늘 접수된 발주 요청, 승인 상태, 수량 조정 건을 확인하고 필요한
                상품을 추가 발주하세요.
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
              <strong>발주 알림</strong>
              <p>
                조정 대기 3건은 센터 승인 전 확인이 필요합니다. 재발주 필요
                상품은 영업 중 재고 부족 가능성이 있습니다.
              </p>
            </section>

            <section className="store-card store-order-board">
              <div className="store-section-title">
                <div>
                  <h2>발주 처리 현황</h2>
                  <p>승인 완료, 조정 대기, 승인 대기 건을 빠르게 확인합니다.</p>
                </div>
                <button type="button">발주 등록</button>
              </div>

              <div className="store-order-board__items">
                {orderCards.map((order) => (
                  <article key={order.title} className="store-order-card">
                    <div className="store-order-card__head">
                      <div>
                        <h3>{order.title}</h3>
                        <p>{order.desc}</p>
                      </div>
                      <span>{order.status}</span>
                    </div>

                    <div className="store-order-card__tags">
                      {order.tags.map((tag) => (
                        <em key={tag}>{tag}</em>
                      ))}
                    </div>

                    <div className="store-order-card__actions">
                      {order.actions.map((action) => (
                        <button key={action} type="button">
                          {action}
                        </button>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="store-card store-order-table-card">
              <div className="store-section-title">
                <div>
                  <h2>발주 목록</h2>
                  <p>상품별 요청 수량과 승인 상태입니다.</p>
                </div>
                <button type="button">전체 보기</button>
              </div>

              <div className="store-order-table">
                <table>
                  <thead>
                    <tr>
                      <th>발주번호</th>
                      <th>상품명</th>
                      <th>구분</th>
                      <th>요청</th>
                      <th>승인</th>
                      <th>상태</th>
                      <th>마감</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderRows.map((order) => (
                      <tr key={order.code}>
                        <td>{order.code}</td>
                        <td>{order.product}</td>
                        <td>{order.category}</td>
                        <td>{order.requested}</td>
                        <td>{order.approved}</td>
                        <td>
                          <span>{order.status}</span>
                        </td>
                        <td>{order.deadline}</td>
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
                <div className="store-profile__avatar">발</div>
                <div>
                  <strong>강남역 2호점</strong>
                  <p>store_01 · 오전 발주 마감</p>
                </div>
              </div>

              <dl>
                <div>
                  <dt>발주 상태</dt>
                  <dd>진행중</dd>
                </div>
                <div>
                  <dt>승인 완료</dt>
                  <dd>18건</dd>
                </div>
                <div>
                  <dt>조정 대기</dt>
                  <dd>3건</dd>
                </div>
                <div>
                  <dt>마지막 갱신</dt>
                  <dd>오늘 09:42</dd>
                </div>
              </dl>
            </section>

            <section className="store-card store-side-card">
              <h2>우선 확인</h2>
              <p>마감 전 먼저 처리할 항목입니다.</p>

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
              <h2>추천 발주</h2>
              <p>판매량과 안전 재고 기준입니다.</p>

              <div className="store-side-card__list">
                {recommendItems.map((item) => (
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
              <h2>오늘 할 일</h2>
              <p>발주 관련 처리 항목입니다.</p>

              <div className="store-side-card__list">
                <div className="store-mini-item">
                  <div>
                    <strong>승인 대기 확인</strong>
                    <span>상온 상품 1건</span>
                  </div>
                  <button type="button">확인</button>
                </div>

                <div className="store-mini-item">
                  <div>
                    <strong>발주 마감 확인</strong>
                    <span>오전 마감 전 최종 검토</span>
                  </div>
                  <button type="button">검토</button>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  )
}

export default StoreOrderManagement
