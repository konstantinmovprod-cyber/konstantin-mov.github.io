import { STATUS } from '../data/mock'
import StatusBadge from './StatusBadge'

/**
 * A single contract clause on the Result screen.
 * Left color rail + section tag + title + short plain-language explanation.
 */
export default function ClauseItem({ clause }) {
  const s = STATUS[clause.status] || STATUS.safe

  return (
    <div className="relative overflow-hidden rounded-3xl bg-card border border-white/[0.06] p-4 pl-5">
      {/* Colored left rail */}
      <span
        className="absolute left-0 top-0 h-full w-1.5"
        style={{ backgroundColor: s.color }}
        aria-hidden="true"
      />

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[11px] font-bold uppercase tracking-widest text-muted">
            {clause.section}
          </div>
          <h3 className="mt-1 text-[15px] font-extrabold leading-snug text-white">
            {clause.title}
          </h3>
        </div>
        <StatusBadge status={clause.status} showEmoji={false} />
      </div>

      <p className="mt-2 text-[13px] leading-relaxed text-muted">{clause.note}</p>
    </div>
  )
}
