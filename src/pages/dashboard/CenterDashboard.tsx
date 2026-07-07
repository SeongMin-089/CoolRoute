import DashboardAlert from '../../components/dashboard/DashboardAlert'
import DashboardBadge from '../../components/dashboard/DashboardBadge'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import DashboardProfileCard from '../../components/dashboard/DashboardProfileCard'
import DashboardSectionTitle from '../../components/dashboard/DashboardSectionTitle'
import DashboardSideCard from '../../components/dashboard/DashboardSideCard'
import DashboardStats, { type DashboardStatItem } from '../../components/dashboard/DashboardStats'
import DashboardTable from '../../components/dashboard/DashboardTable'
import { dashboardConfigs } from './dashboardConfigs'

const stats: DashboardStatItem[] = [
  { title: '신규 주문', value: '42건', desc: '자동 승인 31건', tone: 'info' },
  { title: '피킹 진행', value: '31건', desc: '냉장 18건', tone: 'ok' },
  { title: '출고 대기', value: '9건', desc: '피크 배차 대기', tone: 'warn' },
  { title: '온도 이상', value: '2건', desc: '냉동 구역 확인 필요', tone: 'risk' },
]

const flowSteps = [
  { label: '주문 접수', value: '42건', desc: '오전 마감 접수' },
  { label: '피킹 진행', value: '31건', desc: '냉장 18건 우선 처리' },
  { label: '출고 대기', value: '9건', desc: '피크 배차 확인' },
  { label: '검수 완료', value: '27건', desc: '이상 없음' },
]

const board = [
  { title: '냉장 피킹 1차', desc: '강남권 점포 출고 준비', tags: ['냉장', '18건 진행중'], status: '피킹 중', tone: 'ok' as const },
  { title: 'B 피크 출고', desc: '차량 배차 대기', tags: ['출고', '9건 지연 위험'], status: '확인 필요', tone: 'risk' as const },
  { title: '재고 보충', desc: '안전 재고 미달 상품', tags: ['김밥', '샐러드', '생수'], status: '보충 필요', tone: 'warn' as const },
]

function CenterDashboard() {
  return (
    <DashboardLayout
      {...dashboardConfigs.center}
      heroTitle="센터 대시보드"
      heroDescription="오늘 처리할 주문, 피킹, 입출고, 재고와 창고 온도 상태를 확인하세요."
      side={
        <>
          <DashboardProfileCard
            avatar="C"
            title="강남 통합물류센터"
            description="center_01 · 통합 관리"
            details={[
              { label: '운영 상태', value: '정상 운영' },
              { label: '출고 대기', value: '9건' },
              { label: '냉장 평균', value: '2.4°C' },
              { label: '마지막 갱신', value: '오늘 09:45' },
            ]}
          />
          <DashboardSideCard
            title="센터 모니터링"
            description="물류센터 우선 확인 항목입니다."
            items={[
              { title: '냉장 창고', desc: '2.4°C', action: '정상' },
              { title: '냉동 창고', desc: '-17.8°C', action: '확인' },
              { title: '출고 피크', desc: '82%', action: '보기' },
            ]}
          />
          <DashboardSideCard
            title="오늘 할 일"
            description="센터 우선 처리 항목입니다."
            items={[
              { title: 'B 피크 배차', desc: '출고 대기 3건', action: '확인' },
              { title: 'F-02 온도 점검', desc: '기준 범위 초과', action: '즉시' },
            ]}
          />
        </>
      }
    >
      <DashboardStats items={stats} />
      <DashboardAlert title="센터 알림">
        B 피크 출고 대기 3건과 냉동 F-02 온도 확인이 필요합니다. 안전 재고 미달 상품은 재고관리에서 우선 확인하세요.
      </DashboardAlert>

      <section className="dashboard-card dashboard-flow-card">
        <DashboardSectionTitle title="오늘 작업 흐름" description="접수부터 출고까지 현재 처리 단계를 확인합니다." />
        <div className="dashboard-flow-summary">
          {flowSteps.map((step) => (
            <article className="dashboard-flow-summary__item" key={step.label}>
              <span>{step.label}</span>
              <strong>{step.value}</strong>
              <p>{step.desc}</p>
            </article>
          ))}
        </div>
        <div className="dashboard-progress">
          <div className="dashboard-progress__text">
            <strong>74%</strong>
            <span>처리</span>
          </div>
          <div className="dashboard-progress__bar">
            <span style={{ width: '74%' }} />
          </div>
          <div className="dashboard-progress__info">
            <p><strong>다음 출고</strong><span>B 피크 1차</span></p>
            <p><strong>예상 마감</strong><span>12:20</span></p>
            <p><strong>확인 필요</strong><span>3건</span></p>
          </div>
        </div>
      </section>

      <section className="dashboard-card dashboard-board">
        <DashboardSectionTitle title="주요 작업 현황" description="현재 센터에서 우선 처리해야 할 작업을 확인합니다." />
        <div className="dashboard-board__items">
          {board.map((item) => (
            <article className="dashboard-work-card" key={item.title}>
              <div className="dashboard-work-card__head">
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
                <DashboardBadge tone={item.tone}>{item.status}</DashboardBadge>
              </div>
              <div className="dashboard-work-card__tags">
                {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="dashboard-card dashboard-table-card">
        <DashboardSectionTitle title="센터 작업 목록" description="작업코드별 담당자와 예정 시간을 확인합니다." />
        <DashboardTable
          columns={['작업코드', '작업명', '담당자', '구분', '상태']}
          rows={[
            { id: 'WMS-3812', cells: ['WMS-3812', '냉장 피킹 1차', '박서준', '피킹'], status: { text: '진행 중', tone: 'ok' } },
            { id: 'WMS-3820', cells: ['WMS-3820', 'B 피크 출고', '이하린', '출고'], status: { text: '지연 위험', tone: 'risk' } },
            { id: 'WMS-3828', cells: ['WMS-3828', '상온 보충 입고', '최민재', '입고'], status: { text: '검수 대기', tone: 'info' } },
            { id: 'WMS-3834', cells: ['WMS-3834', '폐기 회수 분류', '정유나', '회수'], status: { text: '작업 예약', tone: 'warn' } },
          ]}
        />
      </section>
    </DashboardLayout>
  )
}

export default CenterDashboard
