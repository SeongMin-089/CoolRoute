import DashboardView from '../DashboardView'

const summaryCards = [
  {
    label: '폐기 임박',
    value: '7 SKU',
    meta: '유제품 4, 간편식 3',
    trend: '확인',
    tone: 'warn',
  },
  {
    label: '폐기 등록',
    value: '4건',
    meta: '회수 대기 2건',
    trend: '+1건',
    tone: 'info',
  },
  {
    label: '회수 예정',
    value: '2건',
    meta: '17:30 방문 예정',
    trend: '예정',
    tone: 'ok',
  },
  {
    label: '손실 예상',
    value: '38,000원',
    meta: '전일 대비 -12%',
    trend: '절감',
    tone: 'ok',
  },
] as const

const expiringItems = [
  {
    code: 'EXP-101',
    product: '바나나우유 250ml',
    category: '유제품',
    quantity: 4,
    expiry: '오늘 18:00',
    status: '폐기 임박',
    statusTone: 'risk',
    action: '확인 필요',
    actionTone: 'warn',
  },
  {
    code: 'EXP-102',
    product: '참치마요 삼각김밥',
    category: '간편식',
    quantity: 6,
    expiry: '오늘 22:00',
    status: '할인 판매 권장',
    statusTone: 'warn',
    action: '등록 대기',
    actionTone: 'info',
  },
  {
    code: 'EXP-103',
    product: '샐러드 컵',
    category: '신선식품',
    quantity: 3,
    expiry: '내일 09:00',
    status: '확인 필요',
    statusTone: 'warn',
    action: '확인 중',
    actionTone: 'info',
  },
  {
    code: 'EXP-104',
    product: '딸기 요구르트',
    category: '유제품',
    quantity: 2,
    expiry: '오늘 20:00',
    status: '폐기 등록',
    statusTone: 'ok',
    action: '회수 예정',
    actionTone: 'ok',
  },
] as const

const guideItems = [
  '폐기 전 할인 판매 가능한 상품을 먼저 확인하세요.',
  '냉장 상품은 회수 박스에 분리 보관하세요.',
  '회수 요청 상품은 판매 재고에서 제외됩니다.',
] as const

function StoreDisposalManagement() {
  return (
    <DashboardView role="store">
      <div className="dashboard-hero">
        <div className="dashboard-hero__copy">
          <span className="dashboard-eyebrow">Store Disposal</span>
          <h1>폐기 관리</h1>
          <p>유통기한 임박 상품과 회수 상태를 확인하세요.</p>
        </div>
        <div className="dashboard-hero__actions">
          <button className="dashboard-action" type="button">
            회수 요청
          </button>
          <button
            className="dashboard-action dashboard-action--primary"
            type="button"
          >
            폐기 등록
          </button>
        </div>
      </div>

      <div className="dashboard-summary" aria-label="폐기 요약">
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

      <div className="dashboard-grid">
        <section className="dashboard-panel dashboard-panel--wide">
          <div className="dashboard-panel__titlebar">
            <div>
              <span className="dashboard-panel__eyebrow">Expiring</span>
              <h2>폐기 대상 목록</h2>
              <p>유통기한과 처리 상태를 기준으로 확인하세요.</p>
            </div>
          </div>

          <div className="dashboard-table-wrap">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th scope="col">코드</th>
                  <th scope="col">상품명</th>
                  <th scope="col">카테고리</th>
                  <th scope="col">수량</th>
                  <th scope="col">기한</th>
                  <th scope="col">상태</th>
                  <th scope="col">처리</th>
                </tr>
              </thead>
              <tbody>
                {expiringItems.map((item) => (
                  <tr key={item.code}>
                    <th scope="row">{item.code}</th>
                    <td>{item.product}</td>
                    <td>{item.category}</td>
                    <td>{item.quantity}</td>
                    <td>{item.expiry}</td>
                    <td>
                      <span
                        className={`dashboard-status dashboard-status--${item.statusTone}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`dashboard-status dashboard-status--${item.actionTone}`}
                      >
                        {item.action}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="dashboard-panel">
          <div className="dashboard-panel__titlebar">
            <div>
              <span className="dashboard-panel__eyebrow">Pickup</span>
              <h2>회수 정보</h2>
              <p>오늘 회수 예정 정보를 확인하세요.</p>
            </div>
          </div>

          <dl className="dashboard-mini-card">
            <div>
              <dt>박스 번호</dt>
              <dd>BOX-09</dd>
            </div>
            <div>
              <dt>담당 기사</dt>
              <dd>김도윤 기사</dd>
            </div>
            <div>
              <dt>예정 시간</dt>
              <dd>오늘 17:30</dd>
            </div>
            <div>
              <dt>상태</dt>
              <dd>
                <span className="dashboard-status dashboard-status--info">
                  회수 대기
                </span>
              </dd>
            </div>
          </dl>

          <ul className="dashboard-info-list">
            {guideItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>
    </DashboardView>
  )
}

export default StoreDisposalManagement
