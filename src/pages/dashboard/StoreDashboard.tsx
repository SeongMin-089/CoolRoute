import { Link, NavLink } from "react-router-dom"
import "../../styles/pages/dashboard/StoreDashboard.scss"
import { clearStoredDashboardRole } from "../../utils/dashboardAuth"

type StatTone = "blue" | "green" | "orange" | "red"

interface StoreStat {
  title: string
  value: string
  desc: string
  tone: StatTone
}

interface OrderItem {
  store: string
  status: string
  priority?: string
  desc: string
  items: string[]
  actions: string[]
}

interface DisposalRow {
  type: string
  product: string
  count: string
  deadline: string
  status: string
}

const flowSteps = [
  {
    label: "발주 접수",
    value: "24건",
    desc: "오전 마감 전 접수",
  },
  {
    label: "센터 승인",
    value: "21건",
    desc: "수량 조정 3건",
  },
  {
    label: "배송 중",
    value: "12건",
    desc: "1차 냉장 배송 이동 중",
  },
  {
    label: "입고 완료",
    value: "9건",
    desc: "검수 완료",
  },
]

const inboundRows = [
  {
    time: "12:30",
    item: "냉장 신선식품",
    count: "18박스",
    status: "도착 예정",
  },
  {
    time: "15:00",
    item: "간편식 행사 상품",
    count: "11박스",
    status: "피킹 완료",
  },
  {
    time: "17:30",
    item: "폐기 회수 박스",
    count: "BOX-09",
    status: "회수 대기",
  },
]

const stats: StoreStat[] = [
  {
    title: "발주 승인",
    value: "18건",
    desc: "자동 승인 14건",
    tone: "blue",
  },
  {
    title: "다음 입고",
    value: "12:30",
    desc: "냉장 배송 2건 대기",
    tone: "green",
  },
  {
    title: "폐기 임박",
    value: "7 SKU",
    desc: "유제품 4, 간편식 3",
    tone: "orange",
  },
  {
    title: "냉장 온도",
    value: "3.1°C",
    desc: "최근 2시간 정상",
    tone: "red",
  },
]

const orderItems: OrderItem[] = [
  {
    store: "냉장 신선식품",
    status: "배송중",
    priority: "냉장 우선",
    desc: "강남센터 1차 · 12:30 도착 예정",
    items: ["샐러드 18개", "유제품 24개", "간편식 12개"],
    actions: ["입고 처리", "이슈 등록"],
  },
  {
    store: "간편식 행사 상품",
    status: "피킹 완료",
    desc: "강남센터 2차 · 15:00 도착 예정",
    items: ["도시락 20개", "삼각김밥 30개"],
    actions: ["상세 보기", "발주 수정"],
  },
  {
    store: "재고 보충 제안",
    status: "승인 대기",
    desc: "안전 재고 기준 미달 상품",
    items: ["생수 20개", "샐러드 8개", "삼각김밥 12개"],
    actions: ["승인", "보류"],
  },
]

const disposalRows: DisposalRow[] = [
  {
    type: "폐기",
    product: "바나나우유 250ml",
    count: "4개",
    deadline: "오늘 18:00",
    status: "확인 필요",
  },
  {
    type: "할인",
    product: "참치마요 삼각김밥",
    count: "6개",
    deadline: "오늘 22:00",
    status: "할인 권장",
  },
  {
    type: "회수",
    product: "딸기 요구르트",
    count: "2개",
    deadline: "오늘 17:30",
    status: "회수 예정",
  },
]

function StoreDashboard() {
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
          <strong>오늘의 점포 포인트</strong>
          <p>
            냉장 배송 2건과 폐기 임박 상품을 먼저 확인하세요. 입고 후 온도와
            수량 검수를 진행하면 됩니다.
          </p>
        </div>
      </aside>

      <main className="store-dashboard__main">
        <header className="store-dashboard__topbar">
          <div>
            <strong>점주 관리 시스템</strong>
            <p>오늘 발주, 배송, 입고, 폐기 상태를 한 화면에서 관리합니다.</p>
          </div>

          <div className="store-dashboard__user">
            <span>점주(store)</span>
            <Link to="/login" onClick={clearStoredDashboardRole}>
              로그아웃
            </Link>
          </div>
        </header>

        <div className="store-dashboard__content">
          <section className="store-dashboard__left">
            <section className="store-card store-hero">
              <h1>점포 대시보드</h1>
              <p>
                오늘 처리해야 할 발주 승인, 입고 예정, 폐기 임박 상품과 냉장
                온도 상태를 확인하세요.
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
              <strong>오늘의 알림</strong>
              <p>
                1차 냉장 배송은 12:30 도착 예정입니다. 유제품 4개 품목은 폐기
                여부 확인이 필요합니다.
              </p>
            </section>

            <section className="store-card store-route">
              <div className="store-section-title">
                <div>
                  <h2>오늘 업무 흐름</h2>
                  <p>발주부터 입고까지 현재 처리 단계를 확인합니다.</p>
                </div>
                <button type="button">흐름 보기</button>
              </div>

              <div className="store-flow-summary">
                {flowSteps.map((step) => (
                  <article
                    key={step.label}
                    className="store-flow-summary__item"
                  >
                    <span>{step.label}</span>
                    <strong>{step.value}</strong>
                    <p>{step.desc}</p>
                  </article>
                ))}
              </div>

              <div className="store-progress">
                <div className="store-progress__text">
                  <strong>75%</strong>
                  <span>처리</span>
                </div>

                <div className="store-progress__bar">
                  <span />
                </div>

                <div className="store-progress__info">
                  <p>
                    <strong>다음 입고</strong>
                    <span>냉장 신선식품</span>
                  </p>
                  <p>
                    <strong>예상 도착</strong>
                    <span>12:30</span>
                  </p>
                  <p>
                    <strong>미검수 박스</strong>
                    <span>0개</span>
                  </p>
                </div>
              </div>

              <div className="store-flow-table">
                <table>
                  <thead>
                    <tr>
                      <th>시간</th>
                      <th>업무</th>
                      <th>수량</th>
                      <th>상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inboundRows.map((row) => (
                      <tr key={`${row.time}-${row.item}`}>
                        <td>{row.time}</td>
                        <td>{row.item}</td>
                        <td>{row.count}</td>
                        <td>
                          <span>{row.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="store-card store-list">
              <div className="store-section-title">
                <div>
                  <h2>입고 / 발주 목록</h2>
                  <p>상품별 상태와 처리 버튼을 확인합니다.</p>
                </div>
                <button type="button">전체 보기</button>
              </div>

              <div className="store-list__items">
                {orderItems.map((item) => (
                  <article key={item.store} className="store-stop">
                    <div className="store-stop__head">
                      <h3>{item.store}</h3>
                      <div>
                        <span className="store-badge store-badge--blue">
                          {item.status}
                        </span>
                        {item.priority && (
                          <span className="store-badge store-badge--orange">
                            {item.priority}
                          </span>
                        )}
                      </div>
                    </div>

                    <p>{item.desc}</p>

                    <div className="store-stop__items">
                      {item.items.map((product) => (
                        <span key={product}>{product}</span>
                      ))}
                    </div>

                    <div className="store-stop__actions">
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

            <section className="store-card store-record">
              <div className="store-section-title">
                <div>
                  <h2>폐기 / 회수 기록</h2>
                  <p>오늘 확인해야 할 폐기와 회수 상품입니다.</p>
                </div>
                <button type="button">기록 관리</button>
              </div>

              <div className="store-record__table">
                <table>
                  <thead>
                    <tr>
                      <th>구분</th>
                      <th>상품</th>
                      <th>수량</th>
                      <th>기한</th>
                      <th>상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    {disposalRows.map((row) => (
                      <tr key={`${row.type}-${row.product}`}>
                        <td>{row.type}</td>
                        <td>{row.product}</td>
                        <td>{row.count}</td>
                        <td>{row.deadline}</td>
                        <td>
                          <span>{row.status}</span>
                        </td>
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
                <div className="store-profile__avatar">점</div>
                <div>
                  <strong>강남역 2호점</strong>
                  <p>store_01 · 냉장 운영점</p>
                </div>
              </div>

              <dl>
                <div>
                  <dt>운영 상태</dt>
                  <dd>영업중</dd>
                </div>
                <div>
                  <dt>담당 센터</dt>
                  <dd>강남센터</dd>
                </div>
                <div>
                  <dt>냉장 온도</dt>
                  <dd>3.1°C</dd>
                </div>
                <div>
                  <dt>마지막 갱신</dt>
                  <dd>오늘 09:42</dd>
                </div>
              </dl>
            </section>

            <section className="store-card store-side-card">
              <h2>다음 입고</h2>
              <p>가장 먼저 처리할 배송입니다.</p>

              <div className="store-side-card__list">
                <div className="store-mini-item">
                  <div>
                    <strong>냉장 신선식품</strong>
                    <span>12:30 · 냉장 박스 18개</span>
                  </div>
                  <button type="button">입고</button>
                </div>

                <div className="store-mini-item">
                  <div>
                    <strong>검수 확인</strong>
                    <span>수량과 온도 이력 확인</span>
                  </div>
                  <button type="button">확인</button>
                </div>
              </div>
            </section>

            <section className="store-card store-side-card">
              <h2>회수 예정</h2>
              <p>폐기 및 회수 상품입니다.</p>

              <div className="store-side-card__list">
                <div className="store-mini-item">
                  <div>
                    <strong>유제품 폐기 회수</strong>
                    <span>오늘 17:30 · 4개 품목</span>
                  </div>
                  <button type="button">회수</button>
                </div>

                <div className="store-mini-item">
                  <div>
                    <strong>회수 박스</strong>
                    <span>BOX-09 · 회수 대기</span>
                  </div>
                  <button type="button">확인</button>
                </div>
              </div>
            </section>

            <section className="store-card store-side-card">
              <h2>오늘 할 일</h2>
              <p>점주 우선 처리 항목입니다.</p>

              <div className="store-side-card__list">
                <div className="store-mini-item">
                  <div>
                    <strong>재발주 승인</strong>
                    <span>생수 · 샐러드 · 삼각김밥</span>
                  </div>
                  <button type="button">승인</button>
                </div>

                <div className="store-mini-item">
                  <div>
                    <strong>폐기 임박 확인</strong>
                    <span>유제품 4개 품목</span>
                  </div>
                  <button type="button">확인</button>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  )
}

export default StoreDashboard
