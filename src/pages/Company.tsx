import CompanyOrganizationSection from '../components/company/CompanyOrganizationSection'
import CompanyOverviewSection from '../components/company/CompanyOverviewSection'
import CompanyPhilosophySection from '../components/company/CompanyPhilosophySection'
import PageHero from '../components/common/PageHero'
import SubNav from '../components/navigation/SubNav'
import { subNavItems } from '../data/subNavData'

function Company() {
  return (
    <div className="page page--company">
      <PageHero
        eyebrow="홈 › 회사소개"
        title="회사소개"
        description={`편의점 콜드체인 물류에 특화된 전문 기업, CoolRoute를 소개합니다.
신뢰·안전·효율을 기준으로 냉장·냉동 상품의 물류 전 과정을 운영합니다.`}
        backgroundImage="/company-hero-bg.jpg"
      />
      <SubNav items={subNavItems.company} />
      <CompanyOverviewSection />
      <CompanyPhilosophySection />
      <CompanyOrganizationSection />
    </div>
  )
}

export default Company
