import DashboardView from '../DashboardView'

const summaryCards = [
  {
    label: '발주 요청',
    value: '24건',
    meta: '오전 마감 전',
    trend: '+6건',
    tone: 'info',
  },
  {
    label: '승인 완료',
    value: '18건',
    meta: '자동 승인 14건',
    trend: '75%',
    tone: 'ok',
  },
  {
    label: '조정 대기',
    value: '3건',
    meta: '수량 확인 필요',
    trend: '확인',
    tone: 'warn',
  },
  {
    label: '재발주 필요',
    value: '2건',
    meta: '안전 재고 기준 미달',
    trend: '주의',
    tone: 'risk',
  },
] as const

const filters = ['전체', '승인 완료', '승인 대기', '조정 대기', '확인 필요']

const orders = [
  {
    code: 'ORD-2407',
    product: '냉장 신선식품 묶음',
    category: '냉장',
    requested: 24,
    approved: 22,
    status: '승인 완료',
    tone: 'ok',
    deadline: '10:30',
  },
  {
    code: 'ORD-2411',
    product: '간편식 프로모션',
    category: '냉장',
    requested: 18,
    approved: 15,
    status: '조정 대기',
    tone: 'warn',
    deadline: '11:00',
  },
  {
    code: 'ORD-2418',
    product: '삼각김밥 3종',
    category: '냉장',
    requested: 30,
    approved: 30,
    status: '승인 완료',
    tone: 'ok',
    deadline: '09:40',
  },
  {
    code: 'ORD-2420',
    product: '생수 500ml',
    category: '상온',
    requested: 20,
    approved: 0,
    status: '승인 대기',
    tone: 'info',
    deadline: '12:00',
  },
  {
    code: 'ORD-2424',
    product: '아이스크림 행사',
    category: '냉동',
    requested: 12,
    approved: 10,
    status: '확인 필요',
    tone: 'risk',
    deadline: '13:30',
  },
] as const

const recommendations = [
  '삼각김밥 3종: 최근 3일 판매량 증가, 12개 추가 발주 권장',
  '아이스크림 행사 상품: 진열 수량 부족, 8개 보충 권장',
  '생수 500ml: 안전 재고 기준 미달, 20개 발주 권장',
] as const

function StoreOrderManagement() {
  return (
    <DashboardView role="store">
      <div className="dashboard-hero">
        <div className="dashboard-hero__copy">
          <span className="dashboard-eyebrow">Store Order</span>
          <h1>발주 관리</h1>
          <p>오늘 발주 요청과 승인 상태를 확인하세요.</p>
        </div>
        <div className="dashboard-hero__actions">
          <button className="dashboard-action" type="button">
            추천 발주
          </button>
          <button
            className="dashboard-action dashboard-action--primary"
            type="button"
          >
            발주 등록
          </button>
        </div>
      </div>

      <div className="dashboard-summary" aria-label="발주 요약">
        {summaryCards.map((card) => (
          <article
            className={`dashboard-card dashboard-card--${card.tone}`}
            key={card.label}
          >
            <div className="dashboard-card__topline">
              <span className="dashboard-card__label">{card.label}</span>
              <span className="dashboard-card__trend">{card.trend}</span>
            </div>
            <strong className="dashboard-card__value">{card.value}</strong>
            <p className="dashboard-card__meta">{card.meta}</p>
          </article>
        ))}
      </div>

      <div className="dashboard-filter-list" aria-label="발주 상태 필터">
        {filters.map((filter, index) => (
          <button
            className={`dashboard-filter${index === 0 ? ' is-active' : ''}`}
            type="button"
            key={filter}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="dashboard-grid">
        <section className="dashboard-panel dashboard-panel--wide">
          <div className="dashboard-panel__titlebar">
            <div>
              <span className="dashboard-panel__eyebrow">Orders</span>
              <h2>발주 목록</h2>
              <p>발주별 승인 상태와 마감 시간을 확인하세요.</p>
            </div>
          </div>

          <div className="dashboard-table-wrap">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th scope="col">발주번호</th>
                  <th scope="col">상품명</th>
                  <th scope="col">카테고리</th>
                  <th scope="col">요청</th>
                  <th scope="col">승인</th>
                  <th scope="col">상태</th>
                  <th scope="col">마감</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.code}>
                    <th scope="row">{order.code}</th>
                    <td>{order.product}</td>
                    <td>{order.category}</td>
                    <td>{order.requested}</td>
                    <td>{order.approved}</td>
                    <td>
                      <span
                        className={`dashboard-status dashboard-status--${order.tone}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td>{order.deadline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="dashboard-panel">
          <div className="dashboard-panel__titlebar">
            <div>
              <span className="dashboard-panel__eyebrow">Recommendation</span>
              <h2>추천 발주</h2>
              <p>판매 추이와 안전 재고를 기준으로 보충 상품을 제안합니다.</p>
            </div>
          </div>

          <ul className="dashboard-sub-list">
            {recommendations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="dashboard-subpage__notice">
            <strong>발주 안내</strong>
            <p>마감 전 승인되지 않은 발주는 센터에서 수량을 조정할 수 있습니다.</p>
            <p>냉장/냉동 상품은 온도 구분에 따라 묶음 발주합니다.</p>
          </div>
        </section>
      </div>
    </DashboardView>
  )
}

export default StoreOrderManagement
