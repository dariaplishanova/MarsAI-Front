import { SubmissionCard } from './SubmissionCard'
import { SubmissionsTable } from './SubmissionsTable'

export function SubmissionsPanel({ submissions, getStatusBadge, t }: any) {
  return (
    <>
      <div className="md:hidden space-y-3">
        {submissions.map((s: any) => (
          <SubmissionCard
            key={s.id}
            submission={s}
            getStatusBadge={getStatusBadge}
            t={t}
          />
        ))}
      </div>

      <div className="hidden md:block">
        <SubmissionsTable
          submissions={submissions}
          getStatusBadge={getStatusBadge}
          t={t}
        />
      </div>
    </>
  )
}
