import type { DashboardLayoutProps } from '../../components/dashboard/DashboardLayout'

type DashboardLayoutConfig = Pick<
  DashboardLayoutProps,
  | 'role'
  | 'roleLabel'
  | 'navItems'
  | 'pointTitle'
  | 'pointDescription'
  | 'topbarTitle'
  | 'topbarDescription'
  | 'userLabel'
>

export const dashboardConfigs: Record<'store' | 'driver' | 'center', DashboardLayoutConfig> = {
  store: {
    role: 'store',
    roleLabel: '점주',
    navItems: [
      { label: '대시보드', path: '/dashboard/store', icon: '▦', end: true },
      { label: '발주관리', path: '/dashboard/store/orders', icon: '≡' },
      { label: '배송현황', path: '/dashboard/store/delivery', icon: '▸' },
      { label: '폐기관리', path: '/dashboard/store/disposal', icon: '!' },
    ],
    pointTitle: '오늘의 점포 포인트',
    pointDescription: '냉장 배송 2건과 폐기 임박 상품을 먼저 확인하세요. 입고 후 온도와 수량 검수를 진행하면 됩니다.',
    topbarTitle: '점주 관리 시스템',
    topbarDescription: '오늘 발주, 배송, 입고, 폐기 상태를 한 화면에서 관리합니다.',
    userLabel: '점주(store)',
  },
  driver: {
    role: 'driver',
    roleLabel: '배송기사',
    navItems: [
      { label: '대시보드', path: '/dashboard/driver', icon: '▦', end: true },
      { label: '배송 목록', path: '/dashboard/driver/deliveries', icon: '≡' },
      { label: '반품 / 회수', path: '/dashboard/driver/returns', icon: '↺' },
      { label: '미배송 관리', path: '/dashboard/driver/undelivered', icon: '!' },
    ],
    pointTitle: '오늘의 운행 포인트',
    pointDescription: '오후 냉장 배송 2건이 우선입니다. 회수 상품은 마지막 점포에서 확인하세요.',
    topbarTitle: '배송기사 관리 시스템',
    topbarDescription: '오늘 배송할 점포와 처리 상태를 한 화면에서 관리합니다.',
    userLabel: '배송기사(driver)',
  },
  center: {
    role: 'center',
    roleLabel: '물류센터',
    navItems: [
      { label: '대시보드', path: '/dashboard/center', icon: '⌂', end: true },
      { label: '재고관리', path: '/dashboard/center/inventory', icon: '□' },
      { label: '주문처리', path: '/dashboard/center/orders', icon: '✓' },
      { label: '입출고 내역', path: '/dashboard/center/inout', icon: '↕' },
      { label: '창고 온도', path: '/dashboard/center/temperature', icon: '°' },
    ],
    pointTitle: '센터 확인 포인트',
    pointDescription: '출고 지연, 안전 재고 미달, 냉장/냉동 온도 이상을 우선 확인하세요.',
    topbarTitle: '물류센터 관리 시스템',
    topbarDescription: '재고, 주문, 입출고, 창고 온도 상태를 한 화면에서 관리합니다.',
    userLabel: '물류센터(center)',
  },
}
