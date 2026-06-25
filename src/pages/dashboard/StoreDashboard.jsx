import DashboardCard from '../../components/common/DashboardCard'
import { dashboardCards } from '../../data/dashboardData'

function StoreDashboard() {
  return (
    <section className="dashboard-page">
      <h1>점주 대시보드</h1>
      <div className="dashboard-page__grid">
        {dashboardCards.store.map((card) => (
          <DashboardCard key={card.title} title={card.title} />
        ))}
      </div>
    </section>
  )
}

export default StoreDashboard
