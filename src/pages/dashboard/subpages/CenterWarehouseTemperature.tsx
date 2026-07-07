import RoleDashboardPage from '../RoleDashboardPage'

function CenterWarehouseTemperature() {
  return (
    <RoleDashboardPage
      role="center"
      heroTitle="창고 온도"
      heroDescription="구역별 온도 상태와 이상 감지 이력을 확인하세요."
      stats={[
        { title: '냉장 평균', value: '3.2°C', desc: '정상 범위', tone: 'info' },
        { title: '냉동 평균', value: '-19.1°C', desc: '정상 범위', tone: 'ok' },
        { title: '이상 감지', value: '2건', desc: '확인 필요', tone: 'warn' },
        { title: '센서 정상률', value: '99.1%', desc: '최근 2시간 기준', tone: 'risk' },
      ]}
      alertTitle="온도 알림"
      alertDescription="냉동 F-02 구역 온도가 기준 범위를 벗어났습니다. 센서 상태와 문 개방 이력을 확인하세요."
      boardTitle="구역별 온도 현황"
      boardDescription="냉장, 냉동, 상온 구역의 온도 상태입니다."
      boardItems={[
        { title: '냉장 R-01', desc: '3.1°C', tags: ['0~5°C', '안정', '09:45'], status: '정상', tone: 'ok' },
        { title: '냉장 R-02', desc: '4.8°C', tags: ['0~5°C', '상승', '확인'], status: '주의', tone: 'warn' },
        { title: '냉동 F-02', desc: '-17.8°C', tags: ['-25~-18°C', '초과', '즉시'], status: '확인 필요', tone: 'risk' },
      ]}
      tableTitle="온도 이력"
      tableDescription="센서별 최근 온도 기록입니다."
      tableColumns={['센서', '구역', '현재 온도', '기준 범위', '최근 기록', '상태']}
      tableRows={[
        { id: 'TEMP-R01', cells: ['TEMP-R01', '냉장 R-01', '3.1°C', '0~5°C', '09:45'], status: { text: '정상', tone: 'ok' } },
        { id: 'TEMP-R02', cells: ['TEMP-R02', '냉장 R-02', '4.8°C', '0~5°C', '09:45'], status: { text: '주의', tone: 'warn' } },
        { id: 'TEMP-F02', cells: ['TEMP-F02', '냉동 F-02', '-17.8°C', '-25~-18°C', '09:45'], status: { text: '확인 필요', tone: 'risk' } },
      ]}
      profile={{ avatar: '온', title: '강남 통합물류센터', description: 'center_01 · 창고 온도', details: [{ label: '냉장 평균', value: '3.2°C' }, { label: '냉동 평균', value: '-19.1°C' }, { label: '이상 감지', value: '2건' }, { label: '마지막 갱신', value: '오늘 09:45' }] }}
      sideSections={[
        { title: '온도 상태', description: '구역별 평균 온도입니다.', items: [{ title: '냉장 평균', desc: '3.2°C', action: '정상' }, { title: '냉동 평균', desc: '-19.1°C', action: '정상' }] },
        { title: '이상 감지', description: '즉시 확인할 구역입니다.', items: [{ title: '냉동 F-02', desc: '-17.8°C · 기준 초과', action: '즉시' }, { title: '냉장 R-02', desc: '4.8°C · 상승 추세', action: '확인' }] },
      ]}
    />
  )
}

export default CenterWarehouseTemperature
