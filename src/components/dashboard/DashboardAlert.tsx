function DashboardAlert({ title, children }: { title: string; children: string }) {
  return (
    <section className="dashboard-card dashboard-alert">
      <strong>{title}</strong>
      <p>{children}</p>
    </section>
  )
}

export default DashboardAlert
