import PageHero from '../components/common/PageHero'
import SectionBlock from '../components/common/SectionBlock'
import SubNav from '../components/navigation/SubNav'
import { subNavItems } from '../data/subNavData'

function Solution() {
  return (
    <div className="page page--solution">
      <PageHero title="물류솔루션" />
      <SubNav items={subNavItems.solution} />
      {subNavItems.solution.map((item) => (
        <SectionBlock key={item.id} id={item.id} title={item.label} />
      ))}
    </div>
  )
}

export default Solution
