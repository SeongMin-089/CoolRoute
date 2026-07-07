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
  { title: '오늘 총 배송', value: '18건', desc: '점포 12곳 방문', tone: 'info' },
  { title: '완료', value: '11건', desc: '정상 입고 처리', tone: 'ok' },
  { title: '남은 배송', value: '6건', desc: '냉장 2건 우선', tone: 'warn' },
  { title: '미배송', value: '1건', desc: '사유 등록 필요', tone: 'risk' },
]

const deliveryStops = [
  {
    title: 'CU 강남역점',
    status: '배송중',
    tone: 'info' as const,
    priority: '냉장 우선',
    desc: '서울 강남구 테헤란로 152 · 14:30 도착 예정',
    items: ['도시락 24개', '샌드위치 18개', '우유 12개'],
    actions: ['배송 완료', '미배송 사유'],
  },
  {
    title: 'GS25 역삼센터점',
    status: '대기',
    tone: 'warn' as const,
    desc: '서울 강남구 논현로 508 · 15:10 도착 예정',
    items: ['컵얼음 40개', '생수 32개'],
    actions: ['배송 완료', '미배송 사유'],
  },
  {
    title: '세븐일레븐 선릉점',
    status: '완료',
    tone: 'ok' as const,
    desc: '서울 강남구 선릉로 428 · 13:45 완료',
    items: ['삼각김밥 36개', '커피 20개'],
    actions: ['완료 확인'],
  },
]

const routeSteps = [
  { label: '출발 센터', value: '남부센터', desc: '13:10 상차 완료' },
  { label: '완료 점포', value: '11건', desc: '전자 서명 완료' },
  { label: '다음 점포', value: '14:30', desc: 'CU 강남역점' },
  { label: '예상 종료', value: '18:20', desc: '강남권 5곳 남음' },
]

function DriverDashboard() {
  return (
    <DashboardLayout
      {...dashboardConfigs.driver}
      heroTitle="배송기사 대시보드"
      heroDescription="오늘 방문해야 할 점포, 배송 상품, 완료 여부를 확인하고 미배송 사유와 반품 회수 항목을 기록하세요."
      side={
        <>
          <DashboardProfileCard
            avatar="배"
            title="김배송 기사"
            description="driver_01 · 냉장 2호차"
            details={[
              { label: '운행 상태', value: '배송중' },
              { label: '담당 구역', value: '강남 / 역삼' },
              { label: '차량 온도', value: '냉장 3.2℃' },
              { label: '마지막 갱신', value: '오늘 13:20' },
            ]}
          />
          <DashboardSideCard
            title="다음 배송"
            description="가장 먼저 처리할 점포입니다."
            items={[
              { title: 'CU 강남역점', desc: '14:30 · 냉장 상품 54개', action: '진행' },
              { title: '도착 전 확인', desc: '입고 공간 확보 요청됨', action: '확인' },
            ]}
          />
          <DashboardSideCard
            title="회수 예정"
            description="반품 및 회수 상품입니다."
            items={[
              { title: '유통기한 임박 상품', desc: 'GS25 역삼센터점 · 8개', action: '회수' },
              { title: '파손 상품', desc: 'CU 강남역점 · 3개', action: '반품' },
            ]}
          />
          <DashboardSideCard
            title="오늘 할 일"
            description="기사 우선 처리 항목입니다."
            items={[
              { title: '미배송 사유 등록', desc: 'CU 삼성로점 · 1건', action: '등록' },
              { title: '냉장 온도 확인', desc: '현재 3.2℃ 정상', action: '점검' },
            ]}
          />
        </>
      }
    >
      <DashboardStats items={stats} />
      <DashboardAlert title="오늘의 알림">
        강남역점 냉장 상품은 14:30 이전 도착이 필요합니다. 미배송 발생 시 사유를 먼저 등록해주세요.
      </DashboardAlert>

      <section className="dashboard-card dashboard-flow-card">
        <DashboardSectionTitle title="오늘 배송 경로" description="현재 운행 진행률과 다음 방문 점포를 확인합니다." action={<button type="button">경로 보기</button>} />
        <div className="dashboard-flow-summary dashboard-flow-summary--compact">
          {routeSteps.map((step) => (
            <article className="dashboard-flow-summary__item" key={step.label}>
              <span>{step.label}</span>
              <strong>{step.value}</strong>
              <p>{step.desc}</p>
            </article>
          ))}
        </div>
        <div className="dashboard-progress">
          <div className="dashboard-progress__text">
            <strong>69%</strong>
            <span>완료</span>
          </div>
          <div className="dashboard-progress__bar">
            <span style={{ width: '69%' }} />
          </div>
          <div className="dashboard-progress__info">
            <p><strong>다음 점포</strong><span>CU 강남역점</span></p>
            <p><strong>예상 도착</strong><span>14:30</span></p>
            <p><strong>남은 거리</strong><span>8.4km</span></p>
          </div>
        </div>
      </section>

      <section className="dashboard-card dashboard-board">
        <DashboardSectionTitle title="배송할 점포 목록" description="점포별 주소, 상품 수량, 배송 처리 버튼을 확인합니다." action={<button type="button">전체 보기</button>} />
        <div className="dashboard-board__items">
          {deliveryStops.map((stop) => (
            <article className="dashboard-work-card" key={stop.title}>
              <div className="dashboard-work-card__head">
                <div>
                  <h3>{stop.title}</h3>
                  <p>{stop.desc}</p>
                </div>
                <div>
                  <DashboardBadge tone={stop.tone}>{stop.status}</DashboardBadge>
                  {stop.priority && <DashboardBadge tone="warn">{stop.priority}</DashboardBadge>}
                </div>
              </div>
              <div className="dashboard-work-card__tags">
                {stop.items.map((item) => <span key={item}>{item}</span>)}
              </div>
              <div className="dashboard-work-card__actions">
                {stop.actions.map((action) => <button key={action} type="button">{action}</button>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="dashboard-card dashboard-table-card">
        <DashboardSectionTitle title="미배송 / 반품 회수 기록" description="필요한 기록을 빠르게 확인합니다." />
        <DashboardTable
          columns={['구분', '점포', '상품', '수량', '상태']}
          rows={[
            { id: 'undelivered', cells: ['미배송', 'CU 삼성로점', '냉동 간편식', '12개'], status: { text: '사유 필요', tone: 'risk' } },
            { id: 'pickup', cells: ['회수', 'GS25 역삼센터점', '유통기한 임박 상품', '8개'], status: { text: '회수 예정', tone: 'warn' } },
            { id: 'return', cells: ['반품', 'CU 강남역점', '파손 상품', '3개'], status: { text: '확인 대기', tone: 'info' } },
          ]}
        />
      </section>
    </DashboardLayout>
  )
}

export default DriverDashboard
