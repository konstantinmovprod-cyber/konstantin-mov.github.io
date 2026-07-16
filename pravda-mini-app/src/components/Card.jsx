/**
 * Base surface card. `as` lets it render as a button when clickable.
 */
export default function Card({ children, className = '', onClick, as = 'div' }) {
  const Tag = as
  const interactive = onClick
    ? 'w-full text-left transition-transform active:scale-[0.98]'
    : ''
  return (
    <Tag
      onClick={onClick}
      className={`rounded-3xl bg-card border border-white/[0.06] p-4 ${interactive} ${className}`}
    >
      {children}
    </Tag>
  )
}
