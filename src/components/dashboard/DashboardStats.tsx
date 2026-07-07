import type { DashboardTone } from './DashboardBadge'

export interface DashboardStatItem {
  title: string
  value: string
  desc: string
  tone: DashboardTone
}

function DashboardStats({ items }: { items: DashboardStatItem[] }) {
  return (
    <section className="dashboard-stats">
      {items.map((item) => (
        <article className={`dashboard-card dashboard-stat dashboard-stat--${item.tone}`} key={item.title}>
          <span>{item.title}</span>
          <strong>{item.value}</strong>
          <p>{item.desc}</p>
        </article>
      ))}
    </section>
  )
}

export default DashboardStats
