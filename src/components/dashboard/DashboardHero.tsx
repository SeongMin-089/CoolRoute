function DashboardHero({ title, description }: { title: string; description: string }) {
  return (
    <section className="dashboard-card dashboard-hero">
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  )
}

export default DashboardHero
