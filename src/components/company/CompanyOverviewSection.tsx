import SectionBadge from '../common/SectionBadge'

const overviewStats = [
  { value: '전국 6개', label: '콜드체인 물류센터' },
  { value: '24시간', label: '온도 관제 운영' },
  { value: '편의점 특화', label: '콜드체인 물류 전문' },
  { value: '3,200+ 점포', label: '정온 배송 네트워크' },
]

const strategies = [
  {
    code: 'STRATEGY 01',
    title: '데이터 기반 온도 관리',
    description:
      '온도·발주·재고를 한 흐름으로 연결해 이상 구간을 빠르게 찾아내고 대응합니다.',
  },
  {
    code: 'STRATEGY 02',
    title: '전국 거점 네트워크',
    description:
      '권역별 6개 정온 물류센터로 신선 배송 반경을 좁히고 회차 시간을 줄입니다.',
  },
  {
    code: 'STRATEGY 03',
    title: '지속가능 운영',
    description:
      '폐기 절감과 저탄소 배차로 운영 비용과 환경 부담을 함께 낮춥니다.',
  },
]

function CompanyOverviewSection() {
  return (
    <section
      id="overview"
      className="company-section company-overview"
      aria-labelledby="company-overview-title"
    >
      <div className="company-section__inner company-overview__inner">
        <div className="company-overview__top">
          <div className="company-overview__content">
            <SectionBadge className="company-overview__badge">
              OVERVIEW
            </SectionBadge>

            <h2 id="company-overview-title">회사개요</h2>

            <p>
              편의점 냉장·냉동 상품의 발주부터 보관, 배송, 점포 입고까지
              콜드체인 전 구간을 책임지는 물류 전문 기업입니다. 데이터 기반
              온도 관리로 신선식품의 품질을 끝까지 지킵니다.
            </p>

            <div className="company-overview__stats">
              {overviewStats.map((stat) => (
                <article className="company-overview__stat" key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </article>
              ))}
            </div>
          </div>

          <article className="company-overview__vision-card">
            <SectionBadge className="company-overview__vision-badge">
              VISION
            </SectionBadge>

            <h3>
              데이터와 정온 기술로
              <br />
              콜드체인 표준을 만드는
              <br />
              <span>스마트 콜드체인 물류 기업</span>
            </h3>

            <p>
              온도·발주·재고·배송 데이터를 하나로 연결해 더 신선하고 더
              효율적인 편의점 물류를 실현합니다.
            </p>
          </article>
        </div>

        <div className="company-overview__strategy-head">
          <SectionBadge className="company-overview__strategy-badge">
            STRATEGY
          </SectionBadge>

          <h2>비전을 떠받치는 3가지 전략 축</h2>
        </div>

        <div className="company-overview__strategies">
          {strategies.map((strategy) => (
            <article className="company-overview__strategy" key={strategy.code}>
              <span>{strategy.code}</span>
              <h3>{strategy.title}</h3>
              <p>{strategy.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CompanyOverviewSection
