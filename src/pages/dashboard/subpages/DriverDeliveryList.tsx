import RoleDashboardPage from '../RoleDashboardPage'

function DriverDeliveryList() {
  return (
    <RoleDashboardPage
      role="driver"
      heroTitle="배송 목록"
      heroDescription="오늘 방문해야 할 점포별 배송 순서, 상품 수량, 도착 예정 시간을 확인하세요."
      stats={[
        { title: '배정 점포', value: '12곳', desc: '강남 / 역삼 권역', tone: 'info' },
        { title: '배송 완료', value: '7곳', desc: '정상 입고', tone: 'ok' },
        { title: '다음 배송', value: '14:30', desc: 'CU 강남역점', tone: 'warn' },
        { title: '지연 위험', value: '1건', desc: '교통 혼잡 구간', tone: 'risk' },
      ]}
      alertTitle="배송 목록 알림"
      alertDescription="냉장 상품이 포함된 점포는 도착 전 입고 공간 확보 여부를 먼저 확인하세요."
      boardTitle="점포별 배송 현황"
      boardDescription="배송 순서와 처리 버튼을 확인합니다."
      boardAction="경로 보기"
      boardItems={[
        { title: 'CU 강남역점', desc: '14:30 도착 예정', tags: ['냉장 54개', '우선 배송'], status: '배송중', tone: 'info', actions: ['완료', '미배송'] },
        { title: 'GS25 역삼센터점', desc: '15:10 도착 예정', tags: ['상온 72개', '회수 있음'], status: '대기', tone: 'warn', actions: ['완료', '사유 등록'] },
        { title: '세븐일레븐 선릉점', desc: '13:45 완료', tags: ['냉장 56개', '서명 완료'], status: '완료', tone: 'ok', actions: ['확인'] },
      ]}
      tableTitle="배송 상세 목록"
      tableDescription="점포별 상품 수량과 예정 시간입니다."
      tableColumns={['순번', '점포', '주소', '예정', '상태']}
      tableRows={[
        { id: 'D-01', cells: ['7', 'CU 강남역점', '테헤란로 152', '14:30'], status: { text: '배송중', tone: 'info' } },
        { id: 'D-02', cells: ['8', 'GS25 역삼센터점', '논현로 508', '15:10'], status: { text: '대기', tone: 'warn' } },
        { id: 'D-03', cells: ['6', '세븐일레븐 선릉점', '선릉로 428', '13:45'], status: { text: '완료', tone: 'ok' } },
      ]}
      profile={{ avatar: '배', title: '김배송 기사', description: 'driver_01 · 배송 목록', details: [{ label: '운행 상태', value: '배송중' }, { label: '남은 점포', value: '5곳' }, { label: '차량 온도', value: '3.2℃' }, { label: '마지막 갱신', value: '오늘 13:20' }] }}
      sideSections={[
        { title: '다음 배송', description: '가장 먼저 처리할 점포입니다.', items: [{ title: 'CU 강남역점', desc: '14:30 · 냉장 상품 54개', action: '진행' }, { title: '도착 전 확인', desc: '입고 공간 확보 요청됨', action: '확인' }] },
        { title: '운행 메모', description: '배송 중 확인할 항목입니다.', items: [{ title: '온도 기록', desc: '냉장 3.2℃ 정상', action: '점검' }, { title: '서명 확인', desc: '완료 점포 전자서명', action: '확인' }] },
      ]}
    />
  )
}

export default DriverDeliveryList
