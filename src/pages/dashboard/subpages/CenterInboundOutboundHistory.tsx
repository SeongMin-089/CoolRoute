import RoleDashboardPage from '../RoleDashboardPage'

function CenterInboundOutboundHistory() {
  return (
    <RoleDashboardPage
      role="center"
      heroTitle="입출고 내역"
      heroDescription="센터 입고와 출고 처리 이력을 확인하세요."
      stats={[
        { title: '오늘 입고', value: '58건', desc: '냉장 24건', tone: 'info' },
        { title: '오늘 출고', value: '72건', desc: '점포 배송 기준', tone: 'ok' },
        { title: '보류 건수', value: '5건', desc: '검수 필요', tone: 'warn' },
        { title: '처리율', value: '96.4%', desc: '마감 전 기준', tone: 'risk' },
      ]}
      alertTitle="입출고 알림"
      alertDescription="검수 보류 5건을 확인하세요. 입고 보류 상품은 재고 반영 전에 담당자 확인이 필요합니다."
      boardTitle="입출고 처리 현황"
      boardDescription="입고, 출고, 보류 작업을 빠르게 확인합니다."
      boardItems={[
        { title: '냉장 신선식품 입고', desc: '120개', tags: ['입고', '냉장', '09:10'], status: '완료', tone: 'ok' },
        { title: '삼각김밥 출고', desc: '80개', tags: ['출고', '냉장', '10:25'], status: '진행 중', tone: 'info' },
        { title: '아이스 행사 상품', desc: '48개', tags: ['입고', '검수 확인'], status: '보류', tone: 'warn' },
      ]}
      tableTitle="입출고 처리 내역"
      tableDescription="입출고 번호별 처리 상태입니다."
      tableColumns={['처리번호', '유형', '상품명', '수량', '담당자', '상태']}
      tableRows={[
        { id: 'IO-3001', cells: ['IO-3001', '입고', '냉장 신선식품', '120', '박민서'], status: { text: '완료', tone: 'ok' } },
        { id: 'IO-3008', cells: ['IO-3008', '출고', '삼각김밥 3종', '80', '이서준'], status: { text: '진행 중', tone: 'info' } },
        { id: 'IO-3024', cells: ['IO-3024', '입고', '아이스 행사 상품', '48', '박민서'], status: { text: '보류', tone: 'risk' } },
      ]}
      profile={{ avatar: '입', title: '강남 통합물류센터', description: 'center_01 · 입출고 관리', details: [{ label: '오늘 입고', value: '58건' }, { label: '오늘 출고', value: '72건' }, { label: '보류', value: '5건' }, { label: '마지막 갱신', value: '오늘 09:45' }] }}
      sideSections={[
        { title: '입출고 상태', description: '오늘 처리 현황입니다.', items: [{ title: '오늘 입고', desc: '58건', action: '보기' }, { title: '오늘 출고', desc: '72건', action: '보기' }] },
        { title: '검수 메모', description: '확인이 필요한 상품입니다.', items: [{ title: '아이스 행사 상품', desc: '포장 상태 확인', action: '확인' }, { title: '냉동 행사 상품', desc: '온도 상태 확인', action: '즉시' }] },
      ]}
    />
  )
}

export default CenterInboundOutboundHistory
