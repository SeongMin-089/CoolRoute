export interface DashboardProfileDetail {
  label: string
  value: string
}

function DashboardProfileCard({
  avatar,
  title,
  description,
  details,
}: {
  avatar: string
  title: string
  description: string
  details: DashboardProfileDetail[]
}) {
  return (
    <section className="dashboard-card dashboard-profile">
      <div className="dashboard-profile__top">
        <div className="dashboard-profile__avatar">{avatar}</div>
        <div>
          <strong>{title}</strong>
          <p>{description}</p>
        </div>
      </div>

      <dl>
        {details.map((detail) => (
          <div key={detail.label}>
            <dt>{detail.label}</dt>
            <dd>{detail.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export default DashboardProfileCard
