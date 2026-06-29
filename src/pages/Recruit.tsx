import PageHero from '../components/common/PageHero'
import SectionBlock from '../components/common/SectionBlock'
import SubNav from '../components/navigation/SubNav'
import { subNavItems } from '../data/subNavData'

function Recruit() {
  return (
    <div className="page page--recruit">
      <PageHero title="인재채용" />
      <SubNav items={subNavItems.recruit} />
      {subNavItems.recruit.map((item) => (
        <SectionBlock key={item.id} id={item.id} title={item.label} />
      ))}
    </div>
  )
}

export default Recruit
