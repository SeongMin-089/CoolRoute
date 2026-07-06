import type { DashboardTone } from '../../data/dashboardData'

interface DashboardCardProps {
  label: string
  value: string
  meta: string
  trend: string
  tone?: DashboardTone
}

function DashboardCard({
  label,
  value,
  meta,
  trend,
  tone = 'info',
}: DashboardCardProps) {
  return (
    <article className={`dashboard-card dashboard-card--${tone}`}>
      <div className="dashboard-card__topline">
        <span className="dashboard-card__label">{label}</span>
        <span className="dashboard-card__trend">{trend}</span>
      </div>
      <strong className="dashboard-card__value">{value}</strong>
      <p className="dashboard-card__meta">{meta}</p>
    </article>
  );
}

export default DashboardCard;
