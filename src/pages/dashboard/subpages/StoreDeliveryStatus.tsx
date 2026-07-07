import RoleDashboardPage from '../RoleDashboardPage'

function StoreDeliveryStatus() {
  return (
    <RoleDashboardPage
      role="store"
      heroTitle="배송 현황"
      heroDescription="오늘 도착할 배송 차량, 도착 예정 시간, 온도 상태와 입고 처리 항목을 확인하세요."
      pointTitle="배송 확인 포인트"
      pointDescription="12:30 도착 예정인 냉장 배송을 먼저 확인하세요. 입고 전 수량과 온도 이력을 함께 점검하면 됩니다."
      stats={[
        { title: '도착 예정', value: '3건', desc: '30분 내 1건', tone: 'info' },
        { title: '배송 중', value: '2건', desc: '1차 배송 이동 중', tone: 'ok' },
        { title: '입고 완료', value: '9건', desc: '검수 완료', tone: 'warn' },
        { title: '온도 정상', value: '99.8%', desc: '최근 2시간 정상', tone: 'risk' },
      ]}
      alertTitle="배송 알림"
      alertDescription="DLV-1201 냉장 배송은 12:30 도착 예정입니다. 도착 후 수량, 온도 이력, 파손 여부를 순서대로 확인하세요."
      boardTitle="배송 진행 현황"
      boardDescription="도착 예정 배송과 입고 처리 대상을 확인합니다."
      boardAction="입고 처리"
      boardItems={[
        { title: '냉장 신선식품', desc: '강남센터 1차 · 12:30 도착 예정', tags: ['냉장', '18박스', '3.1°C'], status: '배송 중', tone: 'info', actions: ['입고 처리', '이슈 등록'] },
        { title: '상온 보충 상품', desc: '강남센터 2차 · 15:00 도착 예정', tags: ['상온', '11박스', '정상'], status: '출발 대기', tone: 'warn', actions: ['상세 보기', '도착 알림'] },
        { title: '냉동 행사 상품', desc: '센터 상차 완료 · 16:20 도착 예정', tags: ['냉동', '8박스', '-18.8°C'], status: '상차 완료', tone: 'ok', actions: ['확인', '온도 보기'] },
      ]}
      tableTitle="배송 목록"
      tableDescription="차량, 기사, 도착 시간, 온도 상태입니다."
      tableColumns={['배송번호', '차량/기사', '구분', '예정 시간', '온도', '상태']}
      tableRows={[
        { id: 'DLV-1201', cells: ['DLV-1201', '12가 3456 · 김도윤', '냉장', '12:30', '3.1°C'], status: { text: '배송 중', tone: 'info' } },
        { id: 'DLV-1202', cells: ['DLV-1202', '34나 7781 · 박민서', '상온', '15:00', '정상'], status: { text: '출발 대기', tone: 'warn' } },
        { id: 'DLV-1203', cells: ['DLV-1203', '55다 9012 · 이서준', '냉동', '16:20', '-18.8°C'], status: { text: '센터 상차', tone: 'ok' } },
      ]}
      profile={{
        avatar: '배',
        title: '강남역 2호점',
        description: 'store_01 · 입고 대기',
        details: [{ label: '입고 상태', value: '대기중' }, { label: '배송 중', value: '2건' }, { label: '냉장 온도', value: '3.1°C' }, { label: '마지막 갱신', value: '오늘 09:42' }],
      }}
      sideSections={[
        { title: '다음 배송', description: '가장 먼저 처리할 배송입니다.', items: [{ title: '냉장 신선식품', desc: '12:30 · 냉장 박스 18개', action: '입고' }, { title: '입고 공간 확인', desc: '냉장 구역 검수 준비', action: '확인' }] },
        { title: '입고 체크리스트', description: '도착 후 처리 항목입니다.', items: [{ title: '수량 확인', desc: '배송 명세와 실제 박스 수량 비교', action: '확인' }, { title: '온도 이력 확인', desc: '냉장 0~5°C, 냉동 -18°C 이하', action: '점검' }] },
      ]}
    />
  )
}

export default StoreDeliveryStatus
