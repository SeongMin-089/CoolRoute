import PageHero from '../components/common/PageHero'
import SectionBadge from '../components/common/SectionBadge'
import SubNav from '../components/navigation/SubNav'
import { subNavItems } from '../data/subNavData'

const businessSections = [
  {
    id: 'cold-chain',
    badge: 'COLDCHAIN',
    title: '콜드체인 물류',
    description:
      '냉장·냉동 상품의 온도를 유지하며 보관·출고·배송하는 핵심 서비스입니다.',
    points: [
      '냉장·냉동 상품의 온도 유지 물류 서비스',
      '상품 보관·출고·배송 과정에서 적정 온도 관리',
      '온도 이상으로 인한 상품 품질 저하 방지',
    ],
    keywords: ['온도 유지', '실시간 관제', '냉장·냉동 분리'],
    image: '/business-coldchain.png',
  },
  {
    id: 'convenience',
    badge: 'CONVENIENCE',
    title: '편의점 물류',
    description: '편의점 점포 발주부터 배송까지 물류 흐름을 관리합니다.',
    points: [
      '편의점 점포 발주 및 배송 흐름 관리',
      '물류센터 주문 처리와 점포 입고 과정 관리',
      '도시락·삼각김밥·우유·아이스크림 등 상품 공급 관리',
    ],
    keywords: ['점포 발주', '정시 배송', '신선식품'],
    image: '/business-convenience.png',
    reverse: true,
  },
  {
    id: 'operation',
    badge: 'OPERATION',
    title: '물류 운영 관리',
    description: '재고·배송·폐기 흐름을 하나의 화면에서 통합적으로 관리합니다.',
    points: [
      '상품별 현재고와 안전재고 관리',
      '배송 목록·배송 완료·미배송 상태 관리',
      '유통기한 임박 상품 및 폐기 대상 상품 관리',
    ],
    keywords: ['재고 관리', '배송 추적', '폐기 관리'],
    image: '/business-operation.png',
  },
]

function Business() {
  return (
    <div className="page page--business">
      <PageHero
        eyebrow="홈 › 사업분야"
        title="사업분야"
        description={`콜드체인 물류, 편의점 물류, 물류 운영 관리
각 분야를 자세히 확인해보세요.`}
        backgroundImage="/business-hero-bg.png"
      />
      <SubNav items={subNavItems.business} />
      {businessSections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className={`business-section${
            section.reverse ? ' business-section--reverse' : ''
          }`}
          aria-labelledby={`business-${section.id}-title`}
        >
          <div className="business-section__inner">
            <div className="business-section__content">
              <SectionBadge className="business-section__badge">
                {section.badge}
              </SectionBadge>

              <h2 id={`business-${section.id}-title`}>{section.title}</h2>

              <p>{section.description}</p>

              <ol className="business-section__list">
                {section.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ol>

              <div className="business-section__keywords">
                {section.keywords.map((keyword) => (
                  <span key={keyword}>{keyword}</span>
                ))}
              </div>
            </div>

            <div className="business-section__media">
              <img src={section.image} alt="" aria-hidden="true" />
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}

export default Business
