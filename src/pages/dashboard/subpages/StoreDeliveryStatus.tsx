import DashboardView from '../DashboardView'

const summaryCards = [
  {
    label: '도착 예정',
    value: '3건',
    meta: '30분 내 1건',
    trend: '예정',
    tone: 'info',
  },
  {
    label: '배송 중',
    value: '2건',
    meta: '1차 배송 이동 중',
    trend: '진행',
    tone: 'ok',
  },
  {
    label: '입고 완료',
    value: '9건',
    meta: '검수 완료',
    trend: '완료',
    tone: 'ok',
  },
  {
    label: '온도 정상',
    value: '99.8%',
    meta: '최근 2시간 정상',
    trend: '정상',
    tone: 'ok',
  },
] as const

const flow = [
  { label: '피킹 완료', caption: '출고 검수 완료', tone: 'ok' },
  { label: '상차 완료', caption: '냉장 상품 적재', tone: 'ok' },
  { label: '배송 중', caption: '현재 진행', tone: 'info' },
  { label: '도착 예정', caption: '12:30 예정', tone: 'warn' },
  { label: '입고 처리', caption: '도착 후 처리', tone: 'info' },
] as const

const deliveries = [
  {
    code: 'DLV-1201',
    vehicle: '12가 3456 · 김도윤',
    category: '냉장',
    status: '배송 중',
    tone: 'ok',
    eta: '12:30',
    temperature: '3.1°C',
  },
  {
    code: 'DLV-1202',
    vehicle: '34나 7781 · 박민서',
    category: '상온',
    status: '출발 대기',
    tone: 'info',
    eta: '15:00',
    temperature: '정상',
  },
  {
    code: 'DLV-1203',
    vehicle: '55다 9012 · 이서준',
    category: '냉동',
    status: '센터 상차',
    tone: 'warn',
    eta: '16:20',
    temperature: '-18.8°C',
  },
  {
    code: 'DLV-1198',
    vehicle: '19라 4412 · 정하린',
    category: '냉장',
    status: '입고 완료',
    tone: 'ok',
    eta: '09:40',
    temperature: '2.9°C',
  },
] as const

const checklist = ['수량 확인', '온도 이력 확인', '파손 여부 확인', '미입고 품목 확인']

const alerts = [
  'DLV-1201은 냉장 온도 정상 범위입니다.',
  'DLV-1202는 상온 상품으로 온도 확인 대상이 아닙니다.',
  '도착 후 입고 처리로 상태를 변경할 수 있습니다.',
] as const

function StoreDeliveryStatus() {
  return (
    <DashboardView role="store">
      <div className="dashboard-hero">
        <div className="dashboard-hero__copy">
          <span className="dashboard-eyebrow">Store Delivery</span>
          <h1>배송 현황</h1>
          <p>오늘 도착할 배송과 입고 상태를 확인하세요.</p>
        </div>
        <div className="dashboard-hero__actions">
          <button className="dashboard-action" type="button">
            입고 처리
          </button>
          <button
            className="dashboard-action dashboard-action--primary"
            type="button"
          >
            이슈 등록
          </button>
        </div>
      </div>

      <div className="dashboard-summary" aria-label="배송 요약">
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

      <section className="dashboard-panel">
        <div className="dashboard-panel__titlebar">
          <div>
            <span className="dashboard-panel__eyebrow">Process</span>
            <h2>배송 진행 단계</h2>
            <p>현재 배송은 이동 중이며, 도착 후 입고 처리가 진행됩니다.</p>
          </div>
        </div>

        <ol className="dashboard-flow dashboard-flow--five">
          {flow.map((item, index) => (
            <li className="dashboard-flow__item" key={item.label}>
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
            </li>
          ))}
        </ol>
      </section>

      <div className="dashboard-grid">
        <section className="dashboard-panel dashboard-panel--wide">
          <div className="dashboard-panel__titlebar">
            <div>
              <span className="dashboard-panel__eyebrow">Deliveries</span>
              <h2>배송 목록</h2>
              <p>차량, 기사, 도착 시간, 온도 상태를 확인하세요.</p>
            </div>
          </div>

          <div className="dashboard-table-wrap">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th scope="col">배송번호</th>
                  <th scope="col">차량/기사</th>
                  <th scope="col">구분</th>
                  <th scope="col">상태</th>
                  <th scope="col">예정 시간</th>
                  <th scope="col">온도</th>
                </tr>
              </thead>
              <tbody>
                {deliveries.map((delivery) => (
                  <tr key={delivery.code}>
                    <th scope="row">{delivery.code}</th>
                    <td>{delivery.vehicle}</td>
                    <td>{delivery.category}</td>
                    <td>
                      <span
                        className={`dashboard-status dashboard-status--${delivery.tone}`}
                      >
                        {delivery.status}
                      </span>
                    </td>
                    <td>{delivery.eta}</td>
                    <td>{delivery.temperature}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="dashboard-panel">
          <div className="dashboard-panel__titlebar">
            <div>
              <span className="dashboard-panel__eyebrow">Checklist</span>
              <h2>입고 처리 체크리스트</h2>
              <p>배송 도착 후 확인해야 할 항목입니다.</p>
            </div>
          </div>

          <ul className="dashboard-checklist">
            {checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <ul className="dashboard-info-list">
            {alerts.map((alert) => (
              <li key={alert}>{alert}</li>
            ))}
          </ul>
        </section>
      </div>
    </DashboardView>
  )
}

export default StoreDeliveryStatus
