export interface SubNavItem {
  label: string
  id: string
  iconGray?: string
  iconWhite?: string
}

export interface SubNavData {
  company: SubNavItem[];
  business: SubNavItem[];
  solution: SubNavItem[];
  logisticsInfo: SubNavItem[];
  support: SubNavItem[];
  recruit: SubNavItem[];
}

export const subNavItems: SubNavData = {
  company: [
    {
      label: '회사 개요',
      id: 'overview',
      iconGray: '/overview-gray.svg',
      iconWhite: '/overview-white.svg',
    },
    {
      label: '경영이념',
      id: 'philosophy',
      iconGray: '/philosophy-gray.svg',
      iconWhite: '/philosophy-white.svg',
    },
    {
      label: '조직안내',
      id: 'organization',
      iconGray: '/organization-gray.svg',
      iconWhite: '/organization-white.svg',
    },
  ],
  business: [
    {
      label: '콜드체인 물류',
      id: 'cold-chain',
      iconGray: '/cold-chain-gray.svg',
      iconWhite: '/cold-chain-white.svg',
    },
    {
      label: '편의점 물류',
      id: 'convenience',
      iconGray: '/convenience-gray.svg',
      iconWhite: '/convenience-white.svg',
    },
    {
      label: '물류 운영 관리',
      id: 'operation',
      iconGray: '/operation-gray.svg',
      iconWhite: '/operation-white.svg',
    },
  ],
  solution: [
    { label: '통합 관리 시스템', id: 'integrated' },
    { label: '온도 모니터링', id: 'temperature' },
    { label: '역할별 관리 시스템', id: 'role-system' },
  ],
  logisticsInfo: [
    { label: "콜드체인이란?", id: "definition" },
    { label: "편의점 물류 흐름", id: "flow" },
    { label: "상품 품질 관리", id: "quality" },
    { label: "콜드체인 관리 포인트", id: "point" },
    { label: "온도 이탈 대응", id: "response" },
  ],
  support: [
    { label: "공지사항", id: "notice" },
    { label: "자주 묻는 질문", id: "faq" },
    { label: "이용안내", id: "guide" },
    { label: "문의안내", id: "contact" },
  ],
  recruit: [
    { label: "인재상", id: "talent" },
    { label: "직무소개", id: "job" },
    { label: "복지", id: "benefit" },
    { label: "채용공고", id: "posting" },
  ],
};
