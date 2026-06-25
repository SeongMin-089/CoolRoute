import PageHero from '../components/common/PageHero'
import SectionBlock from '../components/common/SectionBlock'
import SubNav from '../components/navigation/SubNav'
import { subNavItems } from '../data/subNavData'

function Company() {
  return (
    <div className="page page--company">
      <PageHero title="회사소개" />
      <SubNav items={subNavItems.company} />
      {subNavItems.company.map((item) => (
        <SectionBlock key={item.id} id={item.id} title={item.label} />
      ))}
    </div>
  )
}

export default Company
