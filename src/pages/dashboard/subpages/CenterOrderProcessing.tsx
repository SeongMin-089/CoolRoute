import { CenterBoard, CenterDashboardShell, CenterSide, CenterStats, type CenterBoardItem, type CenterSummaryItem } from '../CenterDashboard'

const summary = [
  { label: '신규 주문', value: '36건', meta: '오전 마감 접수', tone: 'info' },
  { label: '승인 대기', value: '9건', meta: '수량 확인 필요', tone: 'warn' },
  { label: '피킹 진행', value: '18건', meta: '냉장 12건', tone: 'ok' },
  { label: '출고 준비', value: '7건', meta: '차량 배차 대기', tone: 'risk' },
] satisfies CenterSummaryItem[]

const board = [
  { title: '강남역 2호점', desc: '냉장 신선식품', tags: ['냉장', '24개', '10:30'], status: '피킹 중', tone: 'ok' },
  { title: '삼성 테헤란점', desc: '간편식 행사 상품', tags: ['냉장', '18개', '조정'], status: '수량 조정', tone: 'warn' },
  { title: '정구역 로데오점', desc: '냉동 행사 상품', tags: ['냉동', '12개', '배차'], status: '출고 준비', tone: 'info' },
] satisfies CenterBoardItem[]

const rows = [
  ['ORD-2407', '강남역 2호점', '냉장', '24', '피킹 중', '10:30', 'ok'],
  ['ORD-2411', '삼성 테헤란점', '냉장', '18', '수량 조정', '11:00', 'warn'],
  ['ORD-2418', '선현 중학교점', '상온', '32', '승인 대기', '11:20', 'info'],
  ['ORD-2420', '정구역 로데오점', '냉동', '12', '출고 준비', '12:00', 'ok'],
  ['ORD-2424', '일성 무역센터점', '냉장', '28', '신규 접수', '12:30', 'info'],
] as const

function CenterOrderProcessing() {
  return (
    <CenterDashboardShell title="주문처리" description="점포 발주 요청과 출고 준비 상태를 확인하세요." side={<><CenterSide title="주문 처리 상태" items={[{ label: '신규 주문', value: '36건' }, { label: '승인 대기', value: '9건', status: '확인' }, { label: '피킹 진행', value: '18건' }]} /><CenterSide title="처리 우선순위" items={[{ label: '냉장 상품', value: '오전 마감 우선', status: '보기' }, { label: '출고 준비', value: '피크 배차 확인', status: '확인' }]} /></>}>
      <CenterStats items={summary} />
      <section className="center-card center-alert"><strong>주문 알림</strong><p>승인 대기 9건과 수량 조정 요청을 먼저 확인하세요. 출고 준비 상품은 피크 배차 상태를 함께 확인해야 합니다.</p></section>
      <CenterBoard items={board} />
      <section className="center-card center-table-card"><div className="center-card__titlebar"><div><span className="center-eyebrow">Orders</span><h2>주문 목록</h2></div></div><div className="center-table-wrap"><table className="center-table"><thead><tr><th>주문번호</th><th>점포</th><th>상품 구분</th><th>요청수량</th><th>처리상태</th><th>마감</th></tr></thead><tbody>{rows.map((r) => <tr key={r[0]}><th>{r[0]}</th><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td><td><span className={`center-status center-status--${r[6]}`}>{r[4]}</span></td><td>{r[5]}</td></tr>)}</tbody></table></div></section>
    </CenterDashboardShell>
  )
}

export default CenterOrderProcessing
