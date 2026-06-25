import PageHero from '../components/common/PageHero'
import SectionBlock from '../components/common/SectionBlock'
import SubNav from '../components/navigation/SubNav'
import { subNavItems } from '../data/subNavData'

function Business() {
  return (
    <div className="page page--business">
      <PageHero title="사업분야" />
      <SubNav items={subNavItems.business} />
      {subNavItems.business.map((item) => (
        <SectionBlock key={item.id} id={item.id} title={item.label} />
      ))}
    </div>
  )
}

export default Business
