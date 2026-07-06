import { CenterBoard, CenterDashboardShell, CenterSide, CenterStats, type CenterBoardItem, type CenterSummaryItem } from '../CenterDashboard'

const summary = [
  { label: '전체 SKU', value: '1,284개', meta: '냉장 · 냉동 · 상온 합계', tone: 'info' },
  { label: '안전 재고 미달', value: '18개', meta: '발주 검토 필요', tone: 'warn' },
  { label: '입고 대기', value: '42건', meta: '오늘 예정', tone: 'ok' },
  { label: '재고 정확도', value: '98.7%', meta: '전일 검수 기준', tone: 'risk' },
] satisfies CenterSummaryItem[]

const board = [
  { title: '냉장 구역', desc: '74% 사용 · R-01, R-02', tags: ['냉장', '정상'], status: '정상', tone: 'ok' },
  { title: '냉동 구역', desc: '68% 사용 · F-01, F-02', tags: ['냉동', '정상'], status: '정상', tone: 'ok' },
  { title: '상온 구역', desc: '81% 사용 · A-01, A-03', tags: ['상온', '확인'], status: '확인 필요', tone: 'warn' },
] satisfies CenterBoardItem[]

const rows = [
  ['SKU-1001', '삼각김밥 3종', '냉장', '320', '250', 'R-01-A', '정상', 'ok'],
  ['SKU-1007', '바나나우유 250ml', '냉장', '88', '120', 'R-02-B', '부족', 'risk'],
  ['SKU-2012', '아이스크림 행사', '냉동', '140', '100', 'F-01-C', '정상', 'ok'],
  ['SKU-3308', '생수 500ml', '상온', '52', '100', 'A-03-D', '부족', 'risk'],
  ['SKU-4102', '아이스 행사 상품', '냉장', '64', '80', 'R-03-A', '확인 필요', 'warn'],
] as const

function CenterInventoryManagement() {
  return (
    <CenterDashboardShell
      title="재고관리"
      description="센터 재고와 안전 재고 기준을 확인하세요."
      side={
        <>
          <CenterSide title="센터 재고 상태" items={[{ label: '전체 SKU', value: '1,284개' }, { label: '부족 상품', value: '18개', status: '확인' }, { label: '입고 대기', value: '42건' }]} />
          <CenterSide title="부족 상품" items={[{ label: '바나나우유 250ml', value: '현재 88 · 안전 120', status: '확인' }, { label: '생수 500ml', value: '현재 52 · 안전 100', status: '보충' }]} />
        </>
      }
    >
      <CenterStats items={summary} />
      <section className="center-card center-alert"><strong>재고 알림</strong><p>안전 재고 미달 상품 18개를 확인하세요. 냉장 R-02와 상온 A-03 구역의 보충 작업이 필요합니다.</p></section>
      <CenterBoard items={board} />
      <section className="center-card center-table-card">
        <div className="center-card__titlebar"><div><span className="center-eyebrow">Inventory</span><h2>재고 목록</h2></div></div>
        <div className="center-table-wrap"><table className="center-table"><thead><tr><th>상품코드</th><th>상품명</th><th>구분</th><th>현재고</th><th>안전재고</th><th>위치</th><th>상태</th></tr></thead><tbody>{rows.map((r) => <tr key={r[0]}><th>{r[0]}</th><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td><td>{r[4]}</td><td>{r[5]}</td><td><span className={`center-status center-status--${r[7]}`}>{r[6]}</span></td></tr>)}</tbody></table></div>
      </section>
    </CenterDashboardShell>
  )
}

export default CenterInventoryManagement
