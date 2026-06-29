export interface RouteItem {
  label: string
  path: string
}

export const navItems: RouteItem[] = [
  { label: '회사소개', path: '/company' },
  { label: '사업분야', path: '/business' },
  { label: '물류솔루션', path: '/solution' },
  { label: '물류정보', path: '/logistics-info' },
  { label: '고객지원', path: '/support' },
  { label: '인재채용', path: '/recruit' },
]
