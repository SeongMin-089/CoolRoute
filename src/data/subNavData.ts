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
    {
      label: '통합 관리 시스템',
      id: 'integrated',
      iconGray: '/integrated-gray.svg',
      iconWhite: '/integrated-white.svg',
    },
    {
      label: '온도 모니터링',
      id: 'temperature',
      iconGray: '/temperature-gray.svg',
      iconWhite: '/temperature-white.svg',
    },
    {
      label: '역할별 관리 시스템',
      id: 'role-system',
      iconGray: '/role-system-gray.svg',
      iconWhite: '/role-system-white.svg',
    },
  ],
  logisticsInfo: [
    {
      label: "콜드체인이란?",
      id: "intro",
      iconGray: "/coldchain-info-gray.svg",
      iconWhite: "/coldchain-info-white.svg",
    },
    {
      label: "상품을 나누는 온도",
      id: "temp",
      iconGray: "/temperature-type-gray.svg",
      iconWhite: "/temperature-type-white.svg",
    },
    {
      label: "편의점 물류 관리",
      id: "cvs",
      iconGray: "/cvs-logistics-gray.svg",
      iconWhite: "/cvs-logistics-white.svg",
    },
    {
      label: "상품 품질 관리",
      id: "quality",
      iconGray: "/quality-gray.svg",
      iconWhite: "/quality-white.svg",
    },
    {
      label: "콜드 체인 관리 포인트",
      id: "point",
      iconGray: "/management-point-gray.svg",
      iconWhite: "/management-point-white.svg",
    },
  ],
  support: [
    {
      label: "공지사항",
      id: "notice",
      iconGray: "/notice-gray.svg",
      iconWhite: "/notice-white.svg",
    },
    {
      label: "자주 묻는 질문",
      id: "faq",
      iconGray: "/faq-gray.svg",
      iconWhite: "/faq-white.svg",
    },
    {
      label: "이용안내",
      id: "guide",
      iconGray: "/guide-gray.svg",
      iconWhite: "/guide-white.svg",
    },
    {
      label: "문의안내",
      id: "contact",
      iconGray: "/contact-gray.svg",
      iconWhite: "/contact-white.svg",
    },
  ],
  recruit: [
    {
      label: "인재상",
      id: "talent",
      iconGray: "/talent-gray.svg",
      iconWhite: "/talent-white.svg",
    },
    {
      label: "직무소개",
      id: "job",
      iconGray: "/job-gray.svg",
      iconWhite: "/job-white.svg",
    },
    {
      label: "복지",
      id: "benefit",
      iconGray: "/benefit-gray.svg",
      iconWhite: "/benefit-white.svg",
    },
    {
      label: "채용공고",
      id: "posting",
      iconGray: "/posting-gray.svg",
      iconWhite: "/posting-white.svg",
    },
  ],
};
