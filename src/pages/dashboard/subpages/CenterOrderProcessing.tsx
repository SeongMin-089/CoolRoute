import RoleDashboardPage from '../RoleDashboardPage'

function CenterOrderProcessing() {
  return (
    <RoleDashboardPage
      role="center"
      heroTitle="주문처리"
      heroDescription="점포 발주 요청과 출고 준비 상태를 확인하세요."
      stats={[
        { title: '신규 주문', value: '36건', desc: '오전 마감 접수', tone: 'info' },
        { title: '승인 대기', value: '9건', desc: '수량 확인 필요', tone: 'warn' },
        { title: '피킹 진행', value: '18건', desc: '냉장 12건', tone: 'ok' },
        { title: '출고 준비', value: '7건', desc: '차량 배차 대기', tone: 'risk' },
      ]}
      alertTitle="주문 알림"
      alertDescription="승인 대기 9건과 수량 조정 요청을 먼저 확인하세요. 출고 준비 상품은 피크 배차 상태를 함께 확인해야 합니다."
      boardTitle="주문 처리 현황"
      boardDescription="점포별 주문 상태와 피킹 진행 상황입니다."
      boardItems={[
        { title: '강남역 2호점', desc: '냉장 신선식품', tags: ['냉장', '24개', '10:30'], status: '피킹 중', tone: 'ok' },
        { title: '삼성 테헤란점', desc: '간편식 행사 상품', tags: ['냉장', '18개', '조정'], status: '수량 조정', tone: 'warn' },
        { title: '정구역 로데오점', desc: '냉동 행사 상품', tags: ['냉동', '12개', '배차'], status: '출고 준비', tone: 'info' },
      ]}
      tableTitle="주문 목록"
      tableDescription="주문별 요청 수량과 처리 상태입니다."
      tableColumns={['주문번호', '점포', '상품 구분', '요청수량', '마감', '상태']}
      tableRows={[
        { id: 'ORD-2407', cells: ['ORD-2407', '강남역 2호점', '냉장', '24', '10:30'], status: { text: '피킹 중', tone: 'ok' } },
        { id: 'ORD-2411', cells: ['ORD-2411', '삼성 테헤란점', '냉장', '18', '11:00'], status: { text: '수량 조정', tone: 'warn' } },
        { id: 'ORD-2418', cells: ['ORD-2418', '선현 중학교점', '상온', '32', '11:20'], status: { text: '승인 대기', tone: 'info' } },
      ]}
      profile={{ avatar: '주', title: '강남 통합물류센터', description: 'center_01 · 주문 처리', details: [{ label: '신규 주문', value: '36건' }, { label: '승인 대기', value: '9건' }, { label: '피킹 진행', value: '18건' }, { label: '마지막 갱신', value: '오늘 09:45' }] }}
      sideSections={[
        { title: '주문 처리 상태', description: '센터 주문 우선 확인 항목입니다.', items: [{ title: '신규 주문', desc: '36건', action: '보기' }, { title: '승인 대기', desc: '9건', action: '확인' }] },
        { title: '처리 우선순위', description: '마감 전 처리 기준입니다.', items: [{ title: '냉장 상품', desc: '오전 마감 우선', action: '보기' }, { title: '출고 준비', desc: '피크 배차 확인', action: '확인' }] },
      ]}
    />
  )
}

export default CenterOrderProcessing
