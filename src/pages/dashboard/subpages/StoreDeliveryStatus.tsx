import { Link, NavLink } from 'react-router-dom'
import '../../../styles/pages/dashboard/StoreDashboard.scss'
import { clearStoredDashboardRole } from '../../../utils/dashboardAuth'

type StatTone = 'blue' | 'green' | 'orange' | 'red'

interface DeliveryStat {
  title: string
  value: string
  desc: string
  tone: StatTone
}

interface DeliveryRow {
  code: string
  vehicle: string
  category: string
  status: string
  eta: string
  temperature: string
}

interface DeliveryCard {
  title: string
  desc: string
  tags: string[]
  status: string
  actions: string[]
}

const stats: DeliveryStat[] = [
  {
    title: '도착 예정',
    value: '3건',
    desc: '30분 내 1건',
    tone: 'blue',
  },
  {
    title: '배송 중',
    value: '2건',
    desc: '1차 배송 이동 중',
    tone: 'green',
  },
  {
    title: '입고 완료',
    value: '9건',
    desc: '검수 완료',
    tone: 'orange',
  },
  {
    title: '온도 정상',
    value: '99.8%',
    desc: '최근 2시간 정상',
    tone: 'red',
  },
]

const deliveryCards: DeliveryCard[] = [
  {
    title: '냉장 신선식품',
    desc: '강남센터 1차 · 12:30 도착 예정',
    tags: ['냉장', '18박스', '3.1°C'],
    status: '배송 중',
    actions: ['입고 처리', '이슈 등록'],
  },
  {
    title: '상온 보충 상품',
    desc: '강남센터 2차 · 15:00 도착 예정',
    tags: ['상온', '11박스', '정상'],
    status: '출발 대기',
    actions: ['상세 보기', '도착 알림'],
  },
  {
    title: '냉동 행사 상품',
    desc: '센터 상차 완료 · 16:20 도착 예정',
    tags: ['냉동', '8박스', '-18.8°C'],
    status: '상차 완료',
    actions: ['확인', '온도 보기'],
  },
]

const deliveryRows: DeliveryRow[] = [
  {
    code: 'DLV-1201',
    vehicle: '12가 3456 · 김도윤',
    category: '냉장',
    status: '배송 중',
    eta: '12:30',
    temperature: '3.1°C',
  },
  {
    code: 'DLV-1202',
    vehicle: '34나 7781 · 박민서',
    category: '상온',
    status: '출발 대기',
    eta: '15:00',
    temperature: '정상',
  },
  {
    code: 'DLV-1203',
    vehicle: '55다 9012 · 이서준',
    category: '냉동',
    status: '센터 상차',
    eta: '16:20',
    temperature: '-18.8°C',
  },
  {
    code: 'DLV-1198',
    vehicle: '19라 4412 · 정하린',
    category: '냉장',
    status: '입고 완료',
    eta: '09:40',
    temperature: '2.9°C',
  },
]

const nextItems = [
  {
    title: '냉장 신선식품',
    desc: '12:30 · 냉장 박스 18개',
    action: '입고',
  },
  {
    title: '입고 공간 확인',
    desc: '냉장 구역 검수 준비',
    action: '확인',
  },
]

const checklistItems = [
  {
    title: '수량 확인',
    desc: '배송 명세와 실제 박스 수량 비교',
    action: '확인',
  },
  {
    title: '온도 이력 확인',
    desc: '냉장 0~5°C, 냉동 -18°C 이하',
    action: '점검',
  },
  {
    title: '파손 여부 확인',
    desc: '박스 외관 및 상품 파손 확인',
    action: '기록',
  },
]

function StoreDeliveryStatus() {
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
          <strong>배송 확인 포인트</strong>
          <p>
            12:30 도착 예정인 냉장 배송을 먼저 확인하세요. 입고 전 수량과 온도
            이력을 함께 점검하면 됩니다.
          </p>
        </div>
      </aside>

      <main className="store-dashboard__main">
        <header className="store-dashboard__topbar">
          <div>
            <strong>점주 관리 시스템</strong>
            <p>오늘 도착할 배송과 입고 처리 상태를 한 화면에서 관리합니다.</p>
          </div>

          <div className="store-dashboard__user">
            <span>점주(store)</span>
              <Link to="/" onClick={clearStoredDashboardRole}>
                로그아웃
              </Link>
          </div>
        </header>

        <div className="store-dashboard__content">
          <section className="store-dashboard__left store-dashboard__left--delivery">
            <section className="store-card store-hero">
              <h1>배송 현황</h1>
              <p>
                오늘 도착할 배송 차량, 도착 예정 시간, 온도 상태와 입고 처리
                항목을 확인하세요.
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
              <strong>배송 알림</strong>
              <p>
                DLV-1201 냉장 배송은 12:30 도착 예정입니다. 도착 후 수량,
                온도 이력, 파손 여부를 순서대로 확인하세요.
              </p>
            </section>

            <section className="store-card store-delivery-board">
              <div className="store-section-title">
                <div>
                  <h2>배송 진행 현황</h2>
                  <p>도착 예정 배송과 입고 처리 대상을 확인합니다.</p>
                </div>
                <button type="button">입고 처리</button>
              </div>

              <div className="store-delivery-board__items">
                {deliveryCards.map((delivery) => (
                  <article key={delivery.title} className="store-delivery-card">
                    <div className="store-delivery-card__head">
                      <div>
                        <h3>{delivery.title}</h3>
                        <p>{delivery.desc}</p>
                      </div>
                      <span>{delivery.status}</span>
                    </div>

                    <div className="store-delivery-card__tags">
                      {delivery.tags.map((tag) => (
                        <em key={tag}>{tag}</em>
                      ))}
                    </div>

                    <div className="store-delivery-card__actions">
                      {delivery.actions.map((action) => (
                        <button key={action} type="button">
                          {action}
                        </button>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="store-card store-delivery-table-card">
              <div className="store-section-title">
                <div>
                  <h2>배송 목록</h2>
                  <p>차량, 기사, 도착 시간, 온도 상태입니다.</p>
                </div>
                <button type="button">전체 보기</button>
              </div>

              <div className="store-delivery-table">
                <table>
                  <thead>
                    <tr>
                      <th>배송번호</th>
                      <th>차량/기사</th>
                      <th>구분</th>
                      <th>상태</th>
                      <th>예정 시간</th>
                      <th>온도</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deliveryRows.map((delivery) => (
                      <tr key={delivery.code}>
                        <td>{delivery.code}</td>
                        <td>{delivery.vehicle}</td>
                        <td>{delivery.category}</td>
                        <td>
                          <span>{delivery.status}</span>
                        </td>
                        <td>{delivery.eta}</td>
                        <td>{delivery.temperature}</td>
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
                <div className="store-profile__avatar">배</div>
                <div>
                  <strong>강남역 2호점</strong>
                  <p>store_01 · 입고 대기</p>
                </div>
              </div>

              <dl>
                <div>
                  <dt>입고 상태</dt>
                  <dd>대기중</dd>
                </div>
                <div>
                  <dt>배송 중</dt>
                  <dd>2건</dd>
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
              <h2>다음 배송</h2>
              <p>가장 먼저 처리할 배송입니다.</p>

              <div className="store-side-card__list">
                {nextItems.map((item) => (
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
              <h2>입고 체크리스트</h2>
              <p>도착 후 처리 항목입니다.</p>

              <div className="store-side-card__list">
                {checklistItems.map((item) => (
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
              <h2>온도 확인</h2>
              <p>콜드체인 상태입니다.</p>

              <div className="store-side-card__list">
                <div className="store-mini-item">
                  <div>
                    <strong>냉장 배송</strong>
                    <span>3.1°C · 정상 범위</span>
                  </div>
                  <button type="button">정상</button>
                </div>

                <div className="store-mini-item">
                  <div>
                    <strong>냉동 배송</strong>
                    <span>-18.8°C · 확인 필요</span>
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

export default StoreDeliveryStatus
