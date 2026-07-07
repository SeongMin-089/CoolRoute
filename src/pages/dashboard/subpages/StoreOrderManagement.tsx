import RoleDashboardPage from '../RoleDashboardPage'

function StoreOrderManagement() {
  return (
    <RoleDashboardPage
      role="store"
      heroTitle="발주 관리"
      heroDescription="오늘 접수된 발주 요청, 승인 상태, 수량 조정 건을 확인하고 필요한 상품을 추가 발주하세요."
      pointTitle="발주 확인 포인트"
      pointDescription="마감 전 승인 대기와 수량 조정 건을 먼저 확인하세요. 냉장 상품은 배송 시간 기준으로 우선 처리합니다."
      stats={[
        { title: '발주 요청', value: '24건', desc: '오전 마감 전 접수', tone: 'info' },
        { title: '승인 완료', value: '18건', desc: '자동 승인 14건', tone: 'ok' },
        { title: '조정 대기', value: '3건', desc: '센터 수량 확인 필요', tone: 'warn' },
        { title: '재발주 필요', value: '2건', desc: '안전 재고 기준 미달', tone: 'risk' },
      ]}
      alertTitle="발주 알림"
      alertDescription="조정 대기 3건은 센터 승인 전 확인이 필요합니다. 재발주 필요 상품은 영업 중 재고 부족 가능성이 있습니다."
      boardTitle="발주 처리 현황"
      boardDescription="승인 완료, 조정 대기, 승인 대기 건을 빠르게 확인합니다."
      boardAction="발주 등록"
      boardItems={[
        { title: '냉장 신선식품', desc: '강남센터 1차 · 10:30 마감', tags: ['요청 24', '승인 22', '냉장'], status: '승인 완료', tone: 'ok', actions: ['상세 보기', '수정'] },
        { title: '간편식 행사 상품', desc: '행사 진열 수량 보충 필요', tags: ['요청 18', '승인 15', '조정'], status: '조정 대기', tone: 'warn', actions: ['확인', '보류'] },
        { title: '생수 500ml', desc: '안전 재고 기준 미달 상품', tags: ['요청 20', '승인 대기', '상온'], status: '승인 대기', tone: 'info', actions: ['승인', '수정'] },
      ]}
      tableTitle="발주 목록"
      tableDescription="상품별 요청 수량과 승인 상태입니다."
      tableColumns={['발주번호', '상품명', '구분', '요청', '승인', '상태']}
      tableRows={[
        { id: 'ORD-2407', cells: ['ORD-2407', '냉장 신선식품', '냉장', '24', '22'], status: { text: '승인 완료', tone: 'ok' } },
        { id: 'ORD-2411', cells: ['ORD-2411', '간편식 행사 상품', '냉장', '18', '15'], status: { text: '조정 대기', tone: 'warn' } },
        { id: 'ORD-2418', cells: ['ORD-2418', '삼각김밥 3종', '냉장', '30', '30'], status: { text: '승인 완료', tone: 'ok' } },
        { id: 'ORD-2420', cells: ['ORD-2420', '생수 500ml', '상온', '20', '0'], status: { text: '승인 대기', tone: 'info' } },
      ]}
      profile={{
        avatar: '발',
        title: '강남역 2호점',
        description: 'store_01 · 오전 발주 마감',
        details: [
          { label: '발주 상태', value: '진행중' },
          { label: '승인 완료', value: '18건' },
          { label: '조정 대기', value: '3건' },
          { label: '마지막 갱신', value: '오늘 09:42' },
        ],
      }}
      sideSections={[
        { title: '우선 확인', description: '마감 전 먼저 처리할 항목입니다.', items: [{ title: '수량 조정 확인', desc: '간편식 행사 상품 · 11:00 마감', action: '확인' }, { title: '재발주 승인', desc: '생수 · 샐러드 · 삼각김밥', action: '승인' }] },
        { title: '추천 발주', description: '판매량과 안전 재고 기준입니다.', items: [{ title: '삼각김밥 3종', desc: '최근 판매량 증가 · 12개 추가 권장', action: '추가' }, { title: '생수 500ml', desc: '안전 재고 기준 미달 · 20개 권장', action: '발주' }] },
      ]}
    />
  )
}

export default StoreOrderManagement
