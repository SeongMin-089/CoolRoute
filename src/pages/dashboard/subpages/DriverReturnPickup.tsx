import RoleDashboardPage from '../RoleDashboardPage'

function DriverReturnPickup() {
  return (
    <RoleDashboardPage
      role="driver"
      heroTitle="반품 / 회수"
      heroDescription="점포별 반품 상품과 폐기 회수 박스를 확인하고 센터 반납 상태를 기록하세요."
      stats={[
        { title: '회수 예정', value: '5건', desc: '오늘 방문 점포 기준', tone: 'info' },
        { title: '회수 완료', value: '2건', desc: '센터 반납 예정', tone: 'ok' },
        { title: '반품 확인', value: '3건', desc: '파손 상품 포함', tone: 'warn' },
        { title: '누락 위험', value: '1건', desc: '박스 번호 확인 필요', tone: 'risk' },
      ]}
      alertTitle="회수 알림"
      alertDescription="GS25 역삼센터점 회수 박스는 냉장 상품과 분리해 적재하세요."
      boardTitle="회수 처리 현황"
      boardDescription="점포별 회수 상품과 처리 상태입니다."
      boardAction="회수 등록"
      boardItems={[
        { title: 'GS25 역삼센터점', desc: '유통기한 임박 상품', tags: ['8개', 'BOX-09'], status: '회수 예정', tone: 'warn', actions: ['회수', '상세'] },
        { title: 'CU 강남역점', desc: '파손 상품 반품', tags: ['3개', '검수 필요'], status: '확인 대기', tone: 'info', actions: ['반품', '확인'] },
        { title: '세븐일레븐 선릉점', desc: '폐기 회수 박스', tags: ['2박스', '완료'], status: '회수 완료', tone: 'ok', actions: ['확인'] },
      ]}
      tableTitle="반품 / 회수 목록"
      tableDescription="상품과 박스 번호를 확인합니다."
      tableColumns={['코드', '점포', '상품', '수량', '상태']}
      tableRows={[
        { id: 'RTN-01', cells: ['RTN-01', 'GS25 역삼센터점', '유통기한 임박 상품', '8개'], status: { text: '회수 예정', tone: 'warn' } },
        { id: 'RTN-02', cells: ['RTN-02', 'CU 강남역점', '파손 상품', '3개'], status: { text: '확인 대기', tone: 'info' } },
        { id: 'RTN-03', cells: ['RTN-03', '세븐일레븐 선릉점', '폐기 박스', '2박스'], status: { text: '회수 완료', tone: 'ok' } },
      ]}
      profile={{ avatar: '회', title: '김배송 기사', description: 'driver_01 · 회수 처리', details: [{ label: '회수 상태', value: '진행중' }, { label: '회수 예정', value: '5건' }, { label: '반품 확인', value: '3건' }, { label: '마지막 갱신', value: '오늘 13:20' }] }}
      sideSections={[
        { title: '회수 예정', description: '오늘 처리할 회수 항목입니다.', items: [{ title: '유통기한 임박 상품', desc: 'GS25 역삼센터점 · 8개', action: '회수' }, { title: '파손 상품', desc: 'CU 강남역점 · 3개', action: '반품' }] },
        { title: '반납 안내', description: '센터 도착 전 확인합니다.', items: [{ title: '박스 번호 확인', desc: 'BOX-09 · BOX-11', action: '확인' }, { title: '분리 적재', desc: '냉장 회수품 별도 보관', action: '완료' }] },
      ]}
    />
  )
}

export default DriverReturnPickup
