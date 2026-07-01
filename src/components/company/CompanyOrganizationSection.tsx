import SectionBadge from '../common/SectionBadge'

const organizationItems = [
  {
    code: 'TEAM 01',
    title: '물류운영팀',
    description: '콜드체인 전 과정의 운영을 총괄합니다.',
  },
  {
    code: 'TEAM 02',
    title: '배송관리팀',
    description: '정온 배송 일정과 배송 상태를 관리합니다.',
  },
  {
    code: 'TEAM 03',
    title: '재고관리팀',
    description: '현재고·안전재고와 입출고를 관리합니다.',
  },
  {
    code: 'TEAM 04',
    title: '고객지원팀',
    description: '점주·기사·센터의 문의를 지원합니다.',
  },
]

function CompanyOrganizationSection() {
  return (
    <section
      id="organization"
      className="company-section company-organization"
      aria-labelledby="company-organization-title"
    >
      <div className="company-section__inner">
        <div className="company-organization__header">
          <SectionBadge className="company-organization__badge">
            ORGANIZATION
          </SectionBadge>

          <h2 id="company-organization-title">조직안내</h2>

          <p>
            현장 운영과 데이터 관제를 연결해 안정적인 콜드체인 물류 서비스를
            제공하는 조직 체계입니다.
          </p>
        </div>

        <div className="company-organization__grid">
          {organizationItems.map((item) => (
            <article className="company-organization__card" key={item.title}>
              <span className="company-organization__code">{item.code}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CompanyOrganizationSection
