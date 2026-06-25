import DashboardCard from '../../components/common/DashboardCard'
import { dashboardCards } from '../../data/dashboardData'

function DriverDashboard() {
  return (
    <section className="dashboard-page">
      <h1>배송기사 대시보드</h1>
      <div className="dashboard-page__grid">
        {dashboardCards.driver.map((card) => (
          <DashboardCard key={card.title} title={card.title} />
        ))}
      </div>
    </section>
  )
}

export default DriverDashboard
