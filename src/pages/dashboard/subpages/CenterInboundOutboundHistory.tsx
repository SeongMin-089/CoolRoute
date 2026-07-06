import { CenterBoard, CenterDashboardShell, CenterSide, CenterStats, type CenterBoardItem, type CenterSummaryItem } from '../CenterDashboard'

const summary = [
  { label: '오늘 입고', value: '58건', meta: '냉장 24건', tone: 'info' },
  { label: '오늘 출고', value: '72건', meta: '점포 배송 기준', tone: 'ok' },
  { label: '보류 건수', value: '5건', meta: '검수 필요', tone: 'warn' },
  { label: '처리율', value: '96.4%', meta: '마감 전 기준', tone: 'risk' },
] satisfies CenterSummaryItem[]

const board = [
  { title: '냉장 신선식품 입고', desc: '120개', tags: ['입고', '냉장', '09:10'], status: '완료', tone: 'ok' },
  { title: '삼각김밥 출고', desc: '80개', tags: ['출고', '냉장', '10:25'], status: '진행 중', tone: 'info' },
  { title: '아이스 행사 상품', desc: '48개', tags: ['입고', '검수 확인'], status: '보류', tone: 'warn' },
] satisfies CenterBoardItem[]

const rows = [
  ['IO-3001', '입고', '냉장 신선식품', '120', '박민서', '09:10', '완료', 'ok'],
  ['IO-3008', '출고', '삼각김밥 3종', '80', '이서준', '10:25', '진행 중', 'info'],
  ['IO-3012', '입고', '아이스크림 행사', '60', '정하린', '10:40', '검수 중', 'warn'],
  ['IO-3019', '출고', '생수 500ml', '100', '김도윤', '11:05', '완료', 'ok'],
  ['IO-3024', '입고', '아이스 행사 상품', '48', '박민서', '11:20', '보류', 'risk'],
] as const

function CenterInboundOutboundHistory() {
  return (
    <CenterDashboardShell title="입출고 내역" description="센터 입고와 출고 처리 이력을 확인하세요." side={<><CenterSide title="입출고 상태" items={[{ label: '오늘 입고', value: '58건' }, { label: '오늘 출고', value: '72건' }, { label: '보류', value: '5건', status: '확인' }]} /><CenterSide title="검수 메모" items={[{ label: '아이스 행사 상품', value: '포장 상태 확인', status: '확인' }, { label: '냉동 행사 상품', value: '온도 상태 확인', status: '즉시' }]} /></>}>
      <CenterStats items={summary} />
      <section className="center-card center-alert"><strong>입출고 알림</strong><p>검수 보류 5건을 확인하세요. 입고 보류 상품은 재고 반영 전에 담당자 확인이 필요합니다.</p></section>
      <CenterBoard items={board} />
      <section className="center-card center-table-card"><div className="center-card__titlebar"><div><span className="center-eyebrow">Inout</span><h2>입출고 처리 내역</h2></div></div><div className="center-table-wrap"><table className="center-table"><thead><tr><th>처리번호</th><th>유형</th><th>상품명</th><th>수량</th><th>담당자</th><th>처리시간</th><th>상태</th></tr></thead><tbody>{rows.map((r) => <tr key={r[0]}><th>{r[0]}</th><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td><td>{r[4]}</td><td>{r[5]}</td><td><span className={`center-status center-status--${r[7]}`}>{r[6]}</span></td></tr>)}</tbody></table></div></section>
    </CenterDashboardShell>
  )
}

export default CenterInboundOutboundHistory
