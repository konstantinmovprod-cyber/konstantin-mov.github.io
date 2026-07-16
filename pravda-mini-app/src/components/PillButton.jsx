/**
 * Pill-shaped button. Variants:
 *  - solid  : lime background, ink text (primary CTA)
 *  - ghost  : transparent with lime outline
 *  - dark   : card-colored, white text (secondary)
 */
export default function PillButton({
  children,
  onClick,
  variant = 'solid',
  size = 'lg',
  full = false,
  icon = null,
  className = '',
  type = 'button',
  disabled = false,
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-pill font-extrabold uppercase tracking-wide transition-transform active:scale-[0.97] disabled:opacity-40 disabled:active:scale-100 select-none'

  const sizes = {
    lg: 'px-8 py-4 text-base',
    md: 'px-6 py-3 text-sm',
    sm: 'px-4 py-2 text-xs',
  }

  const variants = {
    solid: 'bg-lime text-ink shadow-glow',
    ghost: 'bg-transparent text-lime border-2 border-lime',
    dark: 'bg-card text-white border border-white/10',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${sizes[size]} ${variants[variant]} ${full ? 'w-full' : ''} ${className}`}
    >
      {icon}
      {children}
    </button>
  )
}
