import { CenterBoard, CenterDashboardShell, CenterSide, CenterStats, type CenterBoardItem, type CenterSummaryItem } from '../CenterDashboard'

const summary = [
  { label: '냉장 평균', value: '3.2°C', meta: '정상 범위', tone: 'info' },
  { label: '냉동 평균', value: '-19.1°C', meta: '정상 범위', tone: 'ok' },
  { label: '이상 감지', value: '2건', meta: '확인 필요', tone: 'warn' },
  { label: '센서 정상률', value: '99.1%', meta: '최근 2시간 기준', tone: 'risk' },
] satisfies CenterSummaryItem[]

const board = [
  { title: '냉장 R-01', desc: '3.1°C', tags: ['0~5°C', '안정', '09:45'], status: '정상', tone: 'ok' },
  { title: '냉장 R-02', desc: '4.8°C', tags: ['0~5°C', '상승', '확인'], status: '주의', tone: 'warn' },
  { title: '냉동 F-02', desc: '-17.8°C', tags: ['-25~-18°C', '초과', '즉시'], status: '확인 필요', tone: 'risk' },
] satisfies CenterBoardItem[]

const rows = [
  ['TEMP-R01', '냉장 R-01', '3.1°C', '0~5°C', '09:45', '정상', 'ok'],
  ['TEMP-R02', '냉장 R-02', '4.8°C', '0~5°C', '09:45', '주의', 'warn'],
  ['TEMP-F01', '냉동 F-01', '-19.4°C', '-25~-18°C', '09:45', '정상', 'ok'],
  ['TEMP-F02', '냉동 F-02', '-17.8°C', '-25~-18°C', '09:45', '확인 필요', 'risk'],
  ['TEMP-A01', '상온 A-01', '22.4°C', '15~25°C', '09:45', '정상', 'ok'],
] as const

function CenterWarehouseTemperature() {
  return (
    <CenterDashboardShell title="창고 온도" description="구역별 온도 상태와 이상 감지 이력을 확인하세요." side={<><CenterSide title="온도 상태" items={[{ label: '냉장 평균', value: '3.2°C' }, { label: '냉동 평균', value: '-19.1°C' }, { label: '이상 감지', value: '2건', status: '확인' }]} /><CenterSide title="이상 감지" items={[{ label: '냉동 F-02', value: '-17.8°C · 기준 초과', status: '즉시' }, { label: '냉장 R-02', value: '4.8°C · 상승 추세', status: '확인' }]} /></>}>
      <CenterStats items={summary} />
      <section className="center-card center-alert"><strong>온도 알림</strong><p>냉동 F-02 구역 온도가 기준 범위를 벗어났습니다. 센서 상태와 문 개방 이력을 확인하세요.</p></section>
      <CenterBoard items={board} />
      <section className="center-card center-table-card"><div className="center-card__titlebar"><div><span className="center-eyebrow">Temperature</span><h2>온도 이력</h2></div></div><div className="center-table-wrap"><table className="center-table"><thead><tr><th>센서</th><th>구역</th><th>현재 온도</th><th>기준 범위</th><th>최근 기록</th><th>상태</th></tr></thead><tbody>{rows.map((r) => <tr key={r[0]}><th>{r[0]}</th><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td><td>{r[4]}</td><td><span className={`center-status center-status--${r[6]}`}>{r[5]}</span></td></tr>)}</tbody></table></div></section>
    </CenterDashboardShell>
  )
}

export default CenterWarehouseTemperature
