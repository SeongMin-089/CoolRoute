import RoleDashboardPage from '../RoleDashboardPage'

function StoreDisposalManagement() {
  return (
    <RoleDashboardPage
      role="store"
      heroTitle="폐기 관리"
      heroDescription="유통기한 임박 상품, 할인 전환 대상, 회수 예정 상품을 확인하고 처리하세요."
      pointTitle="폐기 확인 포인트"
      pointDescription="폐기 전 할인 판매 가능 여부를 먼저 확인하세요. 회수 요청 상품은 판매 재고에서 제외됩니다."
      stats={[
        { title: '폐기 임박', value: '7 SKU', desc: '유제품 4, 간편식 3', tone: 'warn' },
        { title: '폐기 등록', value: '4건', desc: '회수 대기 2건', tone: 'info' },
        { title: '회수 예정', value: '2건', desc: '17:30 방문 예정', tone: 'ok' },
        { title: '손실 예상', value: '38,000원', desc: '전일 대비 -12%', tone: 'risk' },
      ]}
      alertTitle="폐기 알림"
      alertDescription="유제품 4개 품목은 오늘 중 확인이 필요합니다. 할인 판매 가능한 상품은 폐기 등록 전에 먼저 처리하세요."
      boardTitle="폐기 처리 현황"
      boardDescription="폐기, 할인, 회수 대상 상품을 빠르게 확인합니다."
      boardAction="폐기 등록"
      boardItems={[
        { title: '바나나우유 250ml', desc: '오늘 18:00 기한 · 유제품', tags: ['4개', '폐기 임박', '냉장'], status: '확인 필요', tone: 'warn', actions: ['폐기 등록', '할인 전환'] },
        { title: '참치마요 삼각김밥', desc: '오늘 22:00 기한 · 간편식', tags: ['6개', '할인 권장', '판매 가능'], status: '할인 권장', tone: 'info', actions: ['할인 등록', '폐기 보류'] },
        { title: '딸기 요구르트', desc: '오늘 20:00 기한 · 유제품', tags: ['2개', '회수 예정', 'BOX-09'], status: '회수 예정', tone: 'ok', actions: ['회수 확인', '상세 보기'] },
      ]}
      tableTitle="폐기 / 회수 목록"
      tableDescription="상품별 기한과 처리 상태입니다."
      tableColumns={['코드', '상품명', '구분', '수량', '기한', '상태']}
      tableRows={[
        { id: 'EXP-101', cells: ['EXP-101', '바나나우유 250ml', '유제품', '4개', '오늘 18:00'], status: { text: '폐기 임박', tone: 'warn' } },
        { id: 'EXP-102', cells: ['EXP-102', '참치마요 삼각김밥', '간편식', '6개', '오늘 22:00'], status: { text: '할인 권장', tone: 'info' } },
        { id: 'EXP-104', cells: ['EXP-104', '딸기 요구르트', '유제품', '2개', '오늘 20:00'], status: { text: '회수 예정', tone: 'ok' } },
      ]}
      profile={{
        avatar: '폐',
        title: '강남역 2호점',
        description: 'store_01 · 폐기 확인',
        details: [{ label: '폐기 상태', value: '확인중' }, { label: '폐기 임박', value: '7 SKU' }, { label: '회수 예정', value: '2건' }, { label: '마지막 갱신', value: '오늘 09:42' }],
      }}
      sideSections={[
        { title: '우선 확인', description: '먼저 처리할 폐기 항목입니다.', items: [{ title: '유제품 폐기 확인', desc: '바나나우유 외 4개 품목', action: '확인' }, { title: '할인 판매 전환', desc: '삼각김밥 6개 · 오늘 22:00', action: '등록' }] },
        { title: '회수 정보', description: '오늘 회수 예정 정보입니다.', items: [{ title: '회수 박스', desc: 'BOX-09 · 회수 대기', action: '확인' }, { title: '담당 기사', desc: '김도윤 기사 · 오늘 17:30', action: '연락' }] },
      ]}
    />
  )
}

export default StoreDisposalManagement
