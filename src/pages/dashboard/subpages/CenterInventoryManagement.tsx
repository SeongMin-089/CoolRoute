import RoleDashboardPage from '../RoleDashboardPage'

function CenterInventoryManagement() {
  return (
    <RoleDashboardPage
      role="center"
      heroTitle="재고관리"
      heroDescription="센터 재고와 안전 재고 기준을 확인하세요."
      stats={[
        { title: '전체 SKU', value: '1,284개', desc: '냉장 · 냉동 · 상온 합계', tone: 'info' },
        { title: '안전 재고 미달', value: '18개', desc: '발주 검토 필요', tone: 'warn' },
        { title: '입고 대기', value: '42건', desc: '오늘 예정', tone: 'ok' },
        { title: '재고 정확도', value: '98.7%', desc: '전일 검수 기준', tone: 'risk' },
      ]}
      alertTitle="재고 알림"
      alertDescription="안전 재고 미달 상품 18개를 확인하세요. 냉장 R-02와 상온 A-03 구역의 보충 작업이 필요합니다."
      boardTitle="구역별 재고 현황"
      boardDescription="창고 구역별 사용률과 확인 대상을 봅니다."
      boardItems={[
        { title: '냉장 구역', desc: '74% 사용 · R-01, R-02', tags: ['냉장', '정상'], status: '정상', tone: 'ok' },
        { title: '냉동 구역', desc: '68% 사용 · F-01, F-02', tags: ['냉동', '정상'], status: '정상', tone: 'ok' },
        { title: '상온 구역', desc: '81% 사용 · A-01, A-03', tags: ['상온', '확인'], status: '확인 필요', tone: 'warn' },
      ]}
      tableTitle="재고 목록"
      tableDescription="상품별 현재고와 안전재고입니다."
      tableColumns={['상품코드', '상품명', '구분', '현재고', '안전재고', '상태']}
      tableRows={[
        { id: 'SKU-1001', cells: ['SKU-1001', '삼각김밥 3종', '냉장', '320', '250'], status: { text: '정상', tone: 'ok' } },
        { id: 'SKU-1007', cells: ['SKU-1007', '바나나우유 250ml', '냉장', '88', '120'], status: { text: '부족', tone: 'risk' } },
        { id: 'SKU-3308', cells: ['SKU-3308', '생수 500ml', '상온', '52', '100'], status: { text: '부족', tone: 'risk' } },
      ]}
      profile={{ avatar: '재', title: '강남 통합물류센터', description: 'center_01 · 재고 관리', details: [{ label: '전체 SKU', value: '1,284개' }, { label: '부족 상품', value: '18개' }, { label: '입고 대기', value: '42건' }, { label: '마지막 갱신', value: '오늘 09:45' }] }}
      sideSections={[
        { title: '센터 재고 상태', description: '재고 우선 확인 항목입니다.', items: [{ title: '전체 SKU', desc: '1,284개', action: '보기' }, { title: '부족 상품', desc: '18개', action: '확인' }] },
        { title: '부족 상품', description: '보충이 필요한 상품입니다.', items: [{ title: '바나나우유 250ml', desc: '현재 88 · 안전 120', action: '확인' }, { title: '생수 500ml', desc: '현재 52 · 안전 100', action: '보충' }] },
      ]}
    />
  )
}

export default CenterInventoryManagement
