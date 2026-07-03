import PageHero from '../components/common/PageHero'
import SubNav from '../components/navigation/SubNav'
import Button from '../components/common/Button'
import IntegratedSystem from '../components/solution/IntegratedSystem'
import RoleSystem from '../components/solution/RoleSystem'
import TemperatureMonitoring from '../components/solution/TemperatureMonitoring'
import { subNavItems } from '../data/subNavData'

function Solution() {
  return (
    <div className="page page--solution">
      <PageHero
        title="물류솔루션"
        description="발주·배송·재고·입출고·폐기를 한 화면에서 관리하는 통합 물류 솔루션입니다. 실제 업무 처리는 로그인 후 역할별 대시보드에서 진행됩니다."
        image="/images/control-room.png"
      />

      <SubNav items={subNavItems.solution} />

      <IntegratedSystem />
      <TemperatureMonitoring />
      <RoleSystem />

      <section className="solution-section solution-section--cta">
        <div className="solution-section__inner solution-cta">
          <h2>역할에 맞는 물류 관리 시스템을 이용하세요</h2>

          <p>
            점주, 배송기사, 물류센터 담당자는 로그인 후 각 역할에 맞는 대시보드를
            확인할 수 있습니다.
          </p>

          <Button to="/login" arrow>
            로그인하기
          </Button>
        </div>
      </section>
    </div>
  )
}

export default Solution
