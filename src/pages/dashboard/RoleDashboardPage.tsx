import type { DashboardTone } from '../../components/dashboard/DashboardBadge'
import DashboardAlert from '../../components/dashboard/DashboardAlert'
import DashboardBadge from '../../components/dashboard/DashboardBadge'
import DashboardLayout, { type DashboardRole } from '../../components/dashboard/DashboardLayout'
import DashboardProfileCard, { type DashboardProfileDetail } from '../../components/dashboard/DashboardProfileCard'
import DashboardSectionTitle from '../../components/dashboard/DashboardSectionTitle'
import DashboardSideCard, { type DashboardSideItem } from '../../components/dashboard/DashboardSideCard'
import DashboardStats, { type DashboardStatItem } from '../../components/dashboard/DashboardStats'
import DashboardTable, { type DashboardTableRow } from '../../components/dashboard/DashboardTable'
import { dashboardConfigs } from './dashboardConfigs'

export interface DashboardBoardItem {
  title: string
  desc: string
  tags: string[]
  status: string
  tone: DashboardTone
  actions?: string[]
}

export interface DashboardSideSection {
  title: string
  description: string
  items: DashboardSideItem[]
}

interface RoleDashboardPageProps {
  role: DashboardRole
  heroTitle: string
  heroDescription: string
  pointTitle?: string
  pointDescription?: string
  stats: DashboardStatItem[]
  alertTitle: string
  alertDescription: string
  boardTitle: string
  boardDescription: string
  boardAction?: string
  boardItems: DashboardBoardItem[]
  tableTitle: string
  tableDescription: string
  tableColumns: string[]
  tableRows: DashboardTableRow[]
  profile: {
    avatar: string
    title: string
    description: string
    details: DashboardProfileDetail[]
  }
  sideSections: DashboardSideSection[]
}

function RoleDashboardPage({
  role,
  heroTitle,
  heroDescription,
  pointTitle,
  pointDescription,
  stats,
  alertTitle,
  alertDescription,
  boardTitle,
  boardDescription,
  boardAction,
  boardItems,
  tableTitle,
  tableDescription,
  tableColumns,
  tableRows,
  profile,
  sideSections,
}: RoleDashboardPageProps) {
  const config = dashboardConfigs[role]

  return (
    <DashboardLayout
      {...config}
      pointTitle={pointTitle ?? config.pointTitle}
      pointDescription={pointDescription ?? config.pointDescription}
      heroTitle={heroTitle}
      heroDescription={heroDescription}
      side={
        <>
          <DashboardProfileCard {...profile} />
          {sideSections.map((section) => (
            <DashboardSideCard
              key={section.title}
              title={section.title}
              description={section.description}
              items={section.items}
            />
          ))}
        </>
      }
    >
      <DashboardStats items={stats} />
      <DashboardAlert title={alertTitle}>{alertDescription}</DashboardAlert>

      <section className="dashboard-card dashboard-board dashboard-full">
        <DashboardSectionTitle
          title={boardTitle}
          description={boardDescription}
          action={boardAction ? <button type="button">{boardAction}</button> : undefined}
        />
        <div className="dashboard-board__items">
          {boardItems.map((item) => (
            <article className="dashboard-work-card" key={item.title}>
              <div className="dashboard-work-card__head">
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
                <DashboardBadge tone={item.tone}>{item.status}</DashboardBadge>
              </div>
              <div className="dashboard-work-card__tags">
                {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              {item.actions && (
                <div className="dashboard-work-card__actions">
                  {item.actions.map((action) => <button key={action} type="button">{action}</button>)}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="dashboard-card dashboard-table-card">
        <DashboardSectionTitle title={tableTitle} description={tableDescription} />
        <DashboardTable columns={tableColumns} rows={tableRows} />
      </section>
    </DashboardLayout>
  )
}

export default RoleDashboardPage
