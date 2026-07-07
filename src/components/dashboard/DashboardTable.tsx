import DashboardBadge, { type DashboardTone } from './DashboardBadge'

export interface DashboardTableRow {
  id: string
  cells: string[]
  status?: {
    text: string
    tone?: DashboardTone
  }
}

function DashboardTable({
  columns,
  rows,
}: {
  columns: string[]
  rows: DashboardTableRow[]
}) {
  return (
    <div className="dashboard-table-wrap">
      <table className="dashboard-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {row.cells.map((cell, index) => (
                <td key={`${row.id}-${columns[index]}`}>{cell}</td>
              ))}
              {row.status && (
                <td>
                  <DashboardBadge tone={row.status.tone}>{row.status.text}</DashboardBadge>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DashboardTable
