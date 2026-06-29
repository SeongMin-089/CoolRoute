import PageHero from '../components/common/PageHero'
import SectionBlock from '../components/common/SectionBlock'
import SubNav from '../components/navigation/SubNav'
import { subNavItems } from '../data/subNavData'

function LogisticsInfo() {
  return (
    <div className="page page--logistics-info">
      <PageHero title="물류정보" />
      <SubNav items={subNavItems.logisticsInfo} />
      {subNavItems.logisticsInfo.map((item) => (
        <SectionBlock key={item.id} id={item.id} title={item.label} />
      ))}
    </div>
  )
}

export default LogisticsInfo
