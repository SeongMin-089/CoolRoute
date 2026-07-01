import SectionBadge from '../common/SectionBadge'

const philosophyItems = [
  {
    title: '신뢰',
    description:
      '정해진 시간, 정해진 온도, 약속한 신선함을 빠짐없이 지켜 점포의 신뢰를 얻습니다.',
    icon: 'trust',
  },
  {
    title: '안전',
    description:
      '전 구간 실시간 온도 관제로 변질을 차단하고, 안전한 먹거리를 매장까지 전달합니다.',
    icon: 'safety',
  },
  {
    title: '효율',
    description:
      '발주·배송·재고·폐기를 하나로 연결해 낭비 없는 콜드체인 운영을 만듭니다.',
    icon: 'efficiency',
  },
]

function PhilosophyIcon({ type }: { type: string }) {
  if (type === 'trust') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 3.5 18 6v5.4c0 3.7-2.4 6.9-6 8.1-3.6-1.2-6-4.4-6-8.1V6l6-2.5Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="m9.4 12 1.8 1.8 3.5-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (type === 'safety') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 3.5 18 6v5.4c0 3.7-2.4 6.9-6 8.1-3.6-1.2-6-4.4-6-8.1V6l6-2.5Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="m13 2.8-7 11h5l-1 7.4 7-11h-5l1-7.4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CompanyPhilosophySection() {
  return (
    <section
      id="philosophy"
      className="company-section company-philosophy"
      aria-labelledby="company-philosophy-title"
    >
      <div className="company-section__inner">
        <div className="company-philosophy__header">
          <SectionBadge className="company-philosophy__badge">
            MANAGEMENT
          </SectionBadge>

          <h2 id="company-philosophy-title">경영이념</h2>

          <p>
            CoolRoute는 신뢰, 안전, 효율을 기준으로 콜드체인 물류의 품질을
            높이고 지속 가능한 운영 체계를 만들어갑니다.
          </p>
        </div>

        <div className="company-philosophy__cards">
          {philosophyItems.map((item) => (
            <article className="company-philosophy__card" key={item.title}>
              <div className="company-philosophy__icon-box" aria-hidden="true">
                <PhilosophyIcon type={item.icon} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CompanyPhilosophySection
