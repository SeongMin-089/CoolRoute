import DashboardAlert from '../../components/dashboard/DashboardAlert'
import DashboardBadge from '../../components/dashboard/DashboardBadge'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import DashboardProfileCard from '../../components/dashboard/DashboardProfileCard'
import DashboardSectionTitle from '../../components/dashboard/DashboardSectionTitle'
import DashboardSideCard from '../../components/dashboard/DashboardSideCard'
import DashboardStats, { type DashboardStatItem } from '../../components/dashboard/DashboardStats'
import DashboardTable from '../../components/dashboard/DashboardTable'
import { dashboardConfigs } from './dashboardConfigs'

const flowSteps = [
  { label: '발주 접수', value: '24건', desc: '오전 마감 전 접수' },
  { label: '센터 승인', value: '21건', desc: '수량 조정 3건' },
  { label: '배송 중', value: '12건', desc: '1차 냉장 배송 이동 중' },
  { label: '입고 완료', value: '9건', desc: '검수 완료' },
]

const stats: DashboardStatItem[] = [
  { title: '발주 승인', value: '18건', desc: '자동 승인 14건', tone: 'info' },
  { title: '다음 입고', value: '12:30', desc: '냉장 배송 2건 대기', tone: 'ok' },
  { title: '폐기 임박', value: '7 SKU', desc: '유제품 4, 간편식 3', tone: 'warn' },
  { title: '냉장 온도', value: '3.1°C', desc: '최근 2시간 정상', tone: 'risk' },
]

const orderItems = [
  {
    title: '냉장 신선식품',
    status: '배송중',
    tone: 'info' as const,
    priority: '냉장 우선',
    desc: '강남센터 1차 · 12:30 도착 예정',
    items: ['샐러드 18개', '유제품 24개', '간편식 12개'],
    actions: ['입고 처리', '이슈 등록'],
  },
  {
    title: '간편식 행사 상품',
    status: '피킹 완료',
    tone: 'ok' as const,
    desc: '강남센터 2차 · 15:00 도착 예정',
    items: ['도시락 20개', '삼각김밥 30개'],
    actions: ['상세 보기', '발주 수정'],
  },
  {
    title: '재고 보충 제안',
    status: '승인 대기',
    tone: 'warn' as const,
    desc: '안전 재고 기준 미달 상품',
    items: ['생수 20개', '샐러드 8개', '삼각김밥 12개'],
    actions: ['승인', '보류'],
  },
]

function StoreDashboard() {
  return (
    <DashboardLayout
      {...dashboardConfigs.store}
      heroTitle="점포 대시보드"
      heroDescription="오늘 처리해야 할 발주 승인, 입고 예정, 폐기 임박 상품과 냉장 온도 상태를 확인하세요."
      side={
        <>
          <DashboardProfileCard
            avatar="점"
            title="강남역 2호점"
            description="store_01 · 냉장 운영점"
            details={[
              { label: '운영 상태', value: '영업중' },
              { label: '담당 센터', value: '강남센터' },
              { label: '냉장 온도', value: '3.1°C' },
              { label: '마지막 갱신', value: '오늘 09:42' },
            ]}
          />
          <DashboardSideCard
            title="다음 입고"
            description="가장 먼저 처리할 배송입니다."
            items={[
              { title: '냉장 신선식품', desc: '12:30 · 냉장 박스 18개', action: '입고' },
              { title: '검수 확인', desc: '수량과 온도 이력 확인', action: '확인' },
            ]}
          />
          <DashboardSideCard
            title="회수 예정"
            description="폐기 및 회수 상품입니다."
            items={[
              { title: '유제품 폐기 회수', desc: '오늘 17:30 · 4개 품목', action: '회수' },
              { title: '회수 박스', desc: 'BOX-09 · 회수 대기', action: '확인' },
            ]}
          />
          <DashboardSideCard
            title="오늘 할 일"
            description="점주 우선 처리 항목입니다."
            items={[
              { title: '재발주 승인', desc: '생수 · 샐러드 · 삼각김밥', action: '승인' },
              { title: '폐기 임박 확인', desc: '유제품 4개 품목', action: '확인' },
            ]}
          />
        </>
      }
    >
      <DashboardStats items={stats} />
      <DashboardAlert title="오늘의 알림">
        1차 냉장 배송은 12:30 도착 예정입니다. 유제품 4개 품목은 폐기 여부 확인이 필요합니다.
      </DashboardAlert>

      <section className="dashboard-card dashboard-flow-card">
        <DashboardSectionTitle
          title="오늘 업무 흐름"
          description="발주부터 입고까지 현재 처리 단계를 확인합니다."
          action={<button type="button">흐름 보기</button>}
        />
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
            <strong>75%</strong>
            <span>처리</span>
          </div>
          <div className="dashboard-progress__bar">
            <span style={{ width: '75%' }} />
          </div>
          <div className="dashboard-progress__info">
            <p><strong>다음 입고</strong><span>냉장 신선식품</span></p>
            <p><strong>예상 도착</strong><span>12:30</span></p>
            <p><strong>미검수 박스</strong><span>0개</span></p>
          </div>
        </div>
      </section>

      <section className="dashboard-card dashboard-board">
        <DashboardSectionTitle
          title="입고 / 발주 목록"
          description="상품별 상태와 처리 버튼을 확인합니다."
          action={<button type="button">전체 보기</button>}
        />
        <div className="dashboard-board__items">
          {orderItems.map((item) => (
            <article className="dashboard-work-card" key={item.title}>
              <div className="dashboard-work-card__head">
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
                <div>
                  <DashboardBadge tone={item.tone}>{item.status}</DashboardBadge>
                  {item.priority && <DashboardBadge tone="warn">{item.priority}</DashboardBadge>}
                </div>
              </div>
              <div className="dashboard-work-card__tags">
                {item.items.map((product) => <span key={product}>{product}</span>)}
              </div>
              <div className="dashboard-work-card__actions">
                {item.actions.map((action) => <button key={action} type="button">{action}</button>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="dashboard-card dashboard-table-card">
        <DashboardSectionTitle title="폐기 / 회수 기록" description="오늘 확인해야 할 폐기와 회수 상품입니다." />
        <DashboardTable
          columns={['구분', '상품', '수량', '기한', '상태']}
          rows={[
            { id: 'milk', cells: ['폐기', '바나나우유 250ml', '4개', '오늘 18:00'], status: { text: '확인 필요', tone: 'warn' } },
            { id: 'rice', cells: ['할인', '참치마요 삼각김밥', '6개', '오늘 22:00'], status: { text: '할인 권장', tone: 'info' } },
            { id: 'yogurt', cells: ['회수', '딸기 요구르트', '2개', '오늘 17:30'], status: { text: '회수 예정', tone: 'ok' } },
          ]}
        />
      </section>
    </DashboardLayout>
  )
}

export default StoreDashboard
