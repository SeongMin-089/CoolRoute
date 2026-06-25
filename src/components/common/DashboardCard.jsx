function DashboardCard({ title, text = 'Dashboard card placeholder' }) {
  return (
    <article className="dashboard-card">
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  )
}

export default DashboardCard
