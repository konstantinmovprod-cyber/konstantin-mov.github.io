/**
 * A single recent conversation row on the Home screen.
 */
export default function ThreadItem({ thread, onOpen }) {
  return (
    <button
      onClick={() => onOpen?.(thread)}
      className="flex w-full items-center gap-3 rounded-3xl bg-card border border-white/[0.06] p-4 text-left transition-transform active:scale-[0.98]"
    >
      {/* Chat glyph */}
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-lime/15 text-lime">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
          <path
            d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9A1.5 1.5 0 0 1 18.5 16H9l-4 4v-4H5.5A1.5 1.5 0 0 1 4 14.5v-9Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="truncate text-[15px] font-bold text-white">{thread.title}</span>
          {thread.unread && <span className="h-2 w-2 shrink-0 rounded-full bg-lime" />}
        </span>
        <span className="mt-0.5 block truncate text-xs text-muted">{thread.preview}</span>
      </span>

      <span className="shrink-0 self-start text-[11px] font-semibold text-muted">{thread.time}</span>
    </button>
  )
}
