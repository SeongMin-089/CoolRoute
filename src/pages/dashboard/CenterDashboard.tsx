import DashboardCard from '../../components/common/DashboardCard'
import { dashboardCards } from '../../data/dashboardData'

function CenterDashboard() {
  return (
    <section className="dashboard-page">
      <h1>물류센터 대시보드</h1>
      <div className="dashboard-page__grid">
        {dashboardCards.center.map((card) => (
          <DashboardCard key={card.title} title={card.title} />
        ))}
      </div>
    </section>
  )
}

export default CenterDashboard
