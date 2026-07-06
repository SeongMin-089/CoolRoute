export type DashboardRole = 'store' | 'driver' | 'center'

export type DashboardTone = 'ok' | 'warn' | 'risk' | 'info'

export interface DashboardCardItem {
  label: string
  value: string
  meta: string
  trend: string
  tone: DashboardTone
}

export interface DashboardFlowItem {
  label: string
  value: string
  caption: string
  tone: DashboardTone
}

export interface DashboardPriorityItem {
  title: string
  detail: string
  due: string
  tone: DashboardTone
}

export interface DashboardRecordItem {
  code: string
  title: string
  owner: string
  status: string
  schedule: string
  tone: DashboardTone
}

export interface DashboardMonitorItem {
  label: string
  value: string
  detail: string
  tone: DashboardTone
}

export interface DashboardRoleData {
  role: DashboardRole
  roleName: string
  eyebrow: string
  title: string
  description: string
  operator: string
  updateLabel: string
  primaryAction: string
  secondaryAction: string
  summaryCards: DashboardCardItem[]
  flow: DashboardFlowItem[]
  priorityItems: DashboardPriorityItem[]
  recordTitle: string
  recordCaption: string
  records: DashboardRecordItem[]
  monitorTitle: string
  monitorCaption: string
  monitors: DashboardMonitorItem[]
}

export interface DashboardData {
  store: DashboardCardItem[]
  driver: DashboardCardItem[]
  center: DashboardCardItem[]
}

export const dashboardRoleData: Record<DashboardRole, DashboardRoleData> = {
  store: {
    role: 'store',
    roleName: '편의점주',
    eyebrow: 'Store Workspace',
    title: '점포 운영 대시보드',
    description:
      '오늘 발주, 입고 예정, 배송 상태, 폐기 임박 상품을 한 화면에서 확인합니다.',
    operator: '강남역 2호점',
    updateLabel: '오늘 09:42 기준',
    primaryAction: '발주 등록',
    secondaryAction: '입고 확인',
    summaryCards: [
      {
        label: '오늘 발주 승인',
        value: '18건',
        meta: '자동 승인 14건',
        trend: '+4건',
        tone: 'ok',
      },
      {
        label: '입고 예정',
        value: '12:30',
        meta: '냉장 차량 2대 대기',
        trend: '정상',
        tone: 'info',
      },
      {
        label: '폐기 임박',
        value: '7 SKU',
        meta: '유제품 4, 간편식 3',
        trend: '확인 필요',
        tone: 'warn',
      },
      {
        label: '냉장 평균 온도',
        value: '3.1°C',
        meta: '최근 2시간 안정권',
        trend: '정상',
        tone: 'ok',
      },
    ],
    flow: [
      {
        label: '발주 요청',
        value: '24',
        caption: '오전 마감 전 접수',
        tone: 'info',
      },
      {
        label: '센터 승인',
        value: '21',
        caption: '3건 수량 조정 대기',
        tone: 'warn',
      },
      {
        label: '배송 중',
        value: '12',
        caption: '1차 배송 도착 예정',
        tone: 'ok',
      },
      {
        label: '입고 완료',
        value: '9',
        caption: '검수 완료 처리',
        tone: 'ok',
      },
    ],
    priorityItems: [
      {
        title: '폐기 임박 상품 확인',
        detail: '바나나우유 250ml 외 6개 품목',
        due: '10:30까지',
        tone: 'warn',
      },
      {
        title: '긴급 재발주 검토',
        detail: '삼각김밥 재고가 안전 재고 아래로 내려갔습니다.',
        due: '11:00까지',
        tone: 'risk',
      },
      {
        title: '1차 배송 입고 검수',
        detail: '냉장 박스 18개, 상온 박스 11개',
        due: '12:30 예정',
        tone: 'info',
      },
      {
        title: '프로모션 진열 수량 조정',
        detail: '도시락 행사 SKU 3종 매대 보충 필요',
        due: '영업 중',
        tone: 'ok',
      },
    ],
    recordTitle: '오늘 입고 및 처리 목록',
    recordCaption: '점포 기준으로 도착 예정과 검수 상태를 정리했습니다.',
    records: [
      {
        code: 'ORD-2407',
        title: '냉장 신선식품 묶음',
        owner: '강남센터 1차',
        status: '배송 중',
        schedule: '12:30',
        tone: 'ok',
      },
      {
        code: 'ORD-2411',
        title: '간편식 프로모션',
        owner: '강남센터 2차',
        status: '피킹 완료',
        schedule: '15:00',
        tone: 'info',
      },
      {
        code: 'RTN-0912',
        title: '폐기 회수 등록',
        owner: '점포 담당',
        status: '확인 필요',
        schedule: '10:30',
        tone: 'warn',
      },
      {
        code: 'SFT-3301',
        title: '안전 재고 자동 제안',
        owner: 'AI 추천',
        status: '승인 대기',
        schedule: '11:00',
        tone: 'risk',
      },
    ],
    monitorTitle: '점포 모니터링',
    monitorCaption: '냉장 설비와 재고 예외 신호를 요약합니다.',
    monitors: [
      {
        label: '냉장 쇼케이스',
        value: '3.0°C',
        detail: '허용 범위 유지',
        tone: 'ok',
      },
      {
        label: '냉동고',
        value: '-19.4°C',
        detail: '정상 순환',
        tone: 'ok',
      },
      {
        label: '안전 재고 미달',
        value: '3개',
        detail: '김밥, 샐러드, 생수',
        tone: 'warn',
      },
      {
        label: '미검수 박스',
        value: '0개',
        detail: '대기 없음',
        tone: 'info',
      },
    ],
  },
  driver: {
    role: 'driver',
    roleName: '물류기사',
    eyebrow: 'Driver Workspace',
    title: '배송 운행 대시보드',
    description:
      '오늘 배차, 점포별 도착 예정, 온도 이력, 지연 위험을 주행 순서대로 확인합니다.',
    operator: '김도윤 기사',
    updateLabel: '오늘 09:42 기준',
    primaryAction: '배송 시작',
    secondaryAction: '온도 리포트',
    summaryCards: [
      {
        label: '배차 완료',
        value: '12/14',
        meta: '2건 상차 대기',
        trend: '86%',
        tone: 'info',
      },
      {
        label: '배송 진행',
        value: '8건',
        meta: '1권역 순환 중',
        trend: '+2건',
        tone: 'ok',
      },
      {
        label: '지연 위험',
        value: '2건',
        meta: '교통 혼잡 구간',
        trend: '주의',
        tone: 'warn',
      },
      {
        label: '차량 온도',
        value: '2.8°C',
        meta: '콜드체인 정상',
        trend: '안정',
        tone: 'ok',
      },
    ],
    flow: [
      {
        label: '상차 완료',
        value: '10',
        caption: '냉장 구획 밀봉 확인',
        tone: 'ok',
      },
      {
        label: '이동 중',
        value: '4',
        caption: '강남 1권역',
        tone: 'info',
      },
      {
        label: '도착 예정',
        value: '3',
        caption: '30분 내 도착',
        tone: 'warn',
      },
      {
        label: '인수 완료',
        value: '5',
        caption: '전자 서명 완료',
        tone: 'ok',
      },
    ],
    priorityItems: [
      {
        title: '역삼점 우선 도착',
        detail: '냉장 식품 프로모션 물량이 포함되어 있습니다.',
        due: '10:50까지',
        tone: 'risk',
      },
      {
        title: '차량 온도 기록 유지',
        detail: '센서 2번이 5분간 경고 경계값에 근접했습니다.',
        due: '상시',
        tone: 'warn',
      },
      {
        title: '2차 상차 위치 확인',
        detail: '강남센터 B 도크에서 추가 상차 예정입니다.',
        due: '13:20 예정',
        tone: 'info',
      },
      {
        title: '회수 박스 반납',
        detail: '폐기 회수 박스 6개를 센터로 반납합니다.',
        due: '운행 종료',
        tone: 'ok',
      },
    ],
    recordTitle: '운행 순서',
    recordCaption: '점포별 배송 상태와 예정 시간을 운행 순서로 표시합니다.',
    records: [
      {
        code: 'STOP-01',
        title: '강남역 2호점',
        owner: '1권역',
        status: '이동 중',
        schedule: '10:30',
        tone: 'ok',
      },
      {
        code: 'STOP-02',
        title: '역삼 테헤란점',
        owner: '1권역',
        status: '지연 위험',
        schedule: '10:50',
        tone: 'risk',
      },
      {
        code: 'STOP-03',
        title: '논현 중앙점',
        owner: '1권역',
        status: '대기',
        schedule: '11:25',
        tone: 'info',
      },
      {
        code: 'STOP-04',
        title: '압구정 로데오점',
        owner: '2권역',
        status: '상차 대기',
        schedule: '13:20',
        tone: 'warn',
      },
    ],
    monitorTitle: '차량 모니터링',
    monitorCaption: '운행 중 차량 상태와 콜드체인 지표입니다.',
    monitors: [
      {
        label: '냉장 구획',
        value: '2.8°C',
        detail: '설정 온도 유지',
        tone: 'ok',
      },
      {
        label: '냉동 구획',
        value: '-18.9°C',
        detail: '정상 운전',
        tone: 'ok',
      },
      {
        label: '잔여 거리',
        value: '42km',
        detail: '1차 운행 기준',
        tone: 'info',
      },
      {
        label: '센서 경고',
        value: '1건',
        detail: '2번 센서 확인',
        tone: 'warn',
      },
    ],
  },
  center: {
    role: 'center',
    roleName: '물류센터',
    eyebrow: 'Center Workspace',
    title: '센터 관제 대시보드',
    description:
      '발주 승인, 피킹, 재고 회전, 입출고 예외를 센터 관제 기준으로 모니터링합니다.',
    operator: '강남 통합물류센터',
    updateLabel: '오늘 09:42 기준',
    primaryAction: '출고 배정',
    secondaryAction: '재고 조정',
    summaryCards: [
      {
        label: '신규 발주',
        value: '42건',
        meta: '자동 승인 31건',
        trend: '+11건',
        tone: 'info',
      },
      {
        label: '피킹 진행',
        value: '31건',
        meta: '냉장 18, 상온 13',
        trend: '74%',
        tone: 'ok',
      },
      {
        label: '냉장 재고율',
        value: '87%',
        meta: '안전 재고 이상',
        trend: '안정',
        tone: 'ok',
      },
      {
        label: '출고 지연',
        value: '3건',
        meta: '도크 혼잡 영향',
        trend: '주의',
        tone: 'warn',
      },
    ],
    flow: [
      {
        label: '발주 수신',
        value: '42',
        caption: '점포 주문 접수',
        tone: 'info',
      },
      {
        label: '피킹',
        value: '31',
        caption: '작업자 배정 완료',
        tone: 'ok',
      },
      {
        label: '검수',
        value: '18',
        caption: '품질 확인 진행',
        tone: 'ok',
      },
      {
        label: '출고 대기',
        value: '9',
        caption: '도크 배차 대기',
        tone: 'warn',
      },
    ],
    priorityItems: [
      {
        title: 'B 도크 병목 해소',
        detail: '2차 배송 차량 상차 시간이 겹쳤습니다.',
        due: '10:20까지',
        tone: 'risk',
      },
      {
        title: '냉장 SKU 재고 보충',
        detail: '샐러드 3종 안전 재고가 오후 기준선에 근접했습니다.',
        due: '오전 중',
        tone: 'warn',
      },
      {
        title: '자동 승인 예외 검토',
        detail: '수량 편차가 큰 발주 5건을 확인합니다.',
        due: '11:30까지',
        tone: 'info',
      },
      {
        title: '회수품 분류 완료',
        detail: '폐기 회수품 12박스 분류 완료 예정입니다.',
        due: '14:00 예정',
        tone: 'ok',
      },
    ],
    recordTitle: '센터 작업 현황',
    recordCaption: '주요 작업 단위별 담당자와 처리 상태입니다.',
    records: [
      {
        code: 'WMS-3812',
        title: '냉장 피킹 1차',
        owner: '박서준',
        status: '진행 중',
        schedule: '10:10',
        tone: 'ok',
      },
      {
        code: 'WMS-3820',
        title: 'B 도크 출고',
        owner: '이하린',
        status: '지연 위험',
        schedule: '10:20',
        tone: 'risk',
      },
      {
        code: 'WMS-3828',
        title: '상온 보충 입고',
        owner: '최민재',
        status: '검수 대기',
        schedule: '11:00',
        tone: 'info',
      },
      {
        code: 'WMS-3834',
        title: '폐기 회수 분류',
        owner: '정유나',
        status: '작업 예약',
        schedule: '14:00',
        tone: 'warn',
      },
    ],
    monitorTitle: '센터 모니터링',
    monitorCaption: '재고, 도크, 온도, 설비 상태를 관제합니다.',
    monitors: [
      {
        label: '냉장 창고',
        value: '2.4°C',
        detail: '정상 범위',
        tone: 'ok',
      },
      {
        label: '출고 도크',
        value: '82%',
        detail: 'B 도크 혼잡',
        tone: 'warn',
      },
      {
        label: '입고 검수',
        value: '18건',
        detail: '평균 24분 대기',
        tone: 'info',
      },
      {
        label: '설비 알림',
        value: '0건',
        detail: '장애 없음',
        tone: 'ok',
      },
    ],
  },
}

export const dashboardCards: DashboardData = {
  store: dashboardRoleData.store.summaryCards,
  driver: dashboardRoleData.driver.summaryCards,
  center: dashboardRoleData.center.summaryCards,
}
