import RoleDashboardPage from '../RoleDashboardPage'

function DriverUndeliveredManagement() {
  return (
    <RoleDashboardPage
      role="driver"
      heroTitle="미배송 관리"
      heroDescription="미배송 발생 건의 사유를 등록하고 재배송 또는 센터 반납 처리를 확인하세요."
      stats={[
        { title: '미배송', value: '1건', desc: '사유 등록 필요', tone: 'risk' },
        { title: '재배송 예정', value: '2건', desc: '오후 재방문', tone: 'warn' },
        { title: '사유 등록', value: '4건', desc: '전일 포함', tone: 'info' },
        { title: '처리 완료', value: '7건', desc: '센터 보고 완료', tone: 'ok' },
      ]}
      alertTitle="미배송 알림"
      alertDescription="CU 삼성로점 미배송 건은 사유 등록 후 재배송 가능 여부를 확인해야 합니다."
      boardTitle="미배송 처리 현황"
      boardDescription="미배송 사유와 후속 조치를 확인합니다."
      boardAction="사유 등록"
      boardItems={[
        { title: 'CU 삼성로점', desc: '냉동 간편식 배송 실패', tags: ['점포 부재', '12개'], status: '사유 필요', tone: 'risk', actions: ['등록', '재배송'] },
        { title: 'GS25 역삼센터점', desc: '입고 공간 부족', tags: ['재방문', '상온'], status: '재배송 예정', tone: 'warn', actions: ['확인'] },
        { title: 'CU 논현점', desc: '전일 미배송 처리', tags: ['완료', '보고'], status: '처리 완료', tone: 'ok', actions: ['보기'] },
      ]}
      tableTitle="미배송 목록"
      tableDescription="점포별 미배송 사유와 처리 상태입니다."
      tableColumns={['코드', '점포', '상품', '사유', '상태']}
      tableRows={[
        { id: 'UND-01', cells: ['UND-01', 'CU 삼성로점', '냉동 간편식', '점포 부재'], status: { text: '사유 필요', tone: 'risk' } },
        { id: 'UND-02', cells: ['UND-02', 'GS25 역삼센터점', '상온 보충 상품', '입고 공간 부족'], status: { text: '재배송 예정', tone: 'warn' } },
        { id: 'UND-03', cells: ['UND-03', 'CU 논현점', '냉장 상품', '영업 종료'], status: { text: '처리 완료', tone: 'ok' } },
      ]}
      profile={{ avatar: '미', title: '김배송 기사', description: 'driver_01 · 미배송 관리', details: [{ label: '미배송', value: '1건' }, { label: '재배송', value: '2건' }, { label: '보고 상태', value: '진행중' }, { label: '마지막 갱신', value: '오늘 13:20' }] }}
      sideSections={[
        { title: '우선 등록', description: '먼저 처리할 미배송 건입니다.', items: [{ title: 'CU 삼성로점', desc: '점포 부재 · 사유 필요', action: '등록' }, { title: '재배송 가능 여부', desc: '오후 동선 확인', action: '확인' }] },
        { title: '처리 기준', description: '미배송 후속 처리입니다.', items: [{ title: '사진 기록', desc: '점포 부재 증빙 첨부', action: '촬영' }, { title: '센터 보고', desc: '관리자 확인 요청', action: '보고' }] },
      ]}
    />
  )
}

export default DriverUndeliveredManagement
