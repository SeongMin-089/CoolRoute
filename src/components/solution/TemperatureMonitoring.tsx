import SectionBadge from '../common/SectionBadge'

type StatusTone = 'ok' | 'warn' | 'risk'

interface Kpi {
  value: string
  label: string
}

interface StatusRow {
  label: string
  status: string
  tone: StatusTone
}

const kpis: Kpi[] = [
  { value: '24h', label: '관제 운영' },
  { value: '±1℃', label: '경고 기준' },
  { value: 'D+0', label: '이력 기록' },
]

const liveRows: StatusRow[] = [
  { label: '냉장 창고 · 3.2℃', status: '정상', tone: 'ok' },
  { label: '냉동 창고 · −19.6℃', status: '정상', tone: 'ok' },
  { label: '냉동 3호차 · −15.2℃', status: '경고', tone: 'warn' },
  { label: '안전재고 미만 품목', status: '3건', tone: 'warn' },
]

const criteriaRows: StatusRow[] = [
  { label: '기준 범위 유지 · 모니터링만 진행', status: '정상', tone: 'ok' },
  { label: '기준 ±1℃ 이탈 · 담당자 확인 요청', status: '경고', tone: 'warn' },
  { label: '이탈 지속 · 재배차 또는 회수 판단', status: '위험', tone: 'risk' },
]

function StatusCard({ title, rows }: { title: string; rows: StatusRow[] }) {
  return (
    <div className="solution-card">
      <div className="solution-card__title">{title}</div>

      {rows.map((row) => (
        <div className="solution-row" key={row.label}>
          <span className="solution-row__label">{row.label}</span>
          <span className={`solution-status solution-status--${row.tone}`}>
            {row.status}
          </span>
        </div>
      ))}
    </div>
  )
}

function TemperatureMonitoring() {
  return (
    <section id="temperature" className="solution-section solution-section--alt">
      <div className="solution-section__inner solution-split">
        <div className="solution-copy">
          <SectionBadge>Monitoring</SectionBadge>

          <h2>온도 모니터링</h2>

          <p>
            전 구간 온도와 안전재고를 한 화면에서 봅니다. 기준을 벗어나면 즉시
            경고로 전환되어, 누가 보더라도 같은 상태를 같은 기준으로 판단할 수
            있습니다.
          </p>

          <div className="solution-kpis">
            {kpis.map((kpi) => (
              <div key={kpi.label}>
                <strong>{kpi.value}</strong>
                <span>{kpi.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="solution-board">
          <StatusCard title="실시간 온도 상태" rows={liveRows} />
          <StatusCard title="경고 기준 · 대응 단계" rows={criteriaRows} />
        </div>
      </div>
    </section>
  )
}

export default TemperatureMonitoring
