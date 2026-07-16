import { STATUS } from '../data/mock'

/**
 * Colored status badge. `variant`:
 *  - 'chip' : filled emoji + label chip (default)
 *  - 'dot'  : small colored dot only
 */
export default function StatusBadge({ status, variant = 'chip', showEmoji = true }) {
  const s = STATUS[status] || STATUS.safe

  if (variant === 'dot') {
    return (
      <span
        className="inline-block h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: s.color }}
        aria-label={s.label}
      />
    )
  }

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide"
      style={{ backgroundColor: `${s.color}1f`, color: s.color }}
    >
      {showEmoji && <span aria-hidden="true">{s.emoji}</span>}
      {s.label}
    </span>
  )
}
