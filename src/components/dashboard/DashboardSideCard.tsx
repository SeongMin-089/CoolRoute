export interface DashboardSideItem {
  title: string
  desc: string
  action?: string
}

function DashboardSideCard({
  title,
  description,
  items,
}: {
  title: string
  description: string
  items: DashboardSideItem[]
}) {
  return (
    <section className="dashboard-card dashboard-side-card">
      <h2>{title}</h2>
      <p>{description}</p>

      <div className="dashboard-side-card__list">
        {items.map((item) => (
          <div className="dashboard-mini-item" key={`${title}-${item.title}`}>
            <div>
              <strong>{item.title}</strong>
              <span>{item.desc}</span>
            </div>
            {item.action && <button type="button">{item.action}</button>}
          </div>
        ))}
      </div>
    </section>
  )
}

export default DashboardSideCard
