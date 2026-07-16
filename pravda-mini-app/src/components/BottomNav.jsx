/**
 * Fixed bottom navigation for the two primary tabs (Home / Premium).
 * Uses inline SVG icons to stay dependency-free.
 */
const ICONS = {
  home: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
      <path
        d="M3.5 10.5 12 4l8.5 6.5M5.5 9.5V19a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V9.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  premium: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
      <path
        d="M3 8l4.5 3L12 5l4.5 6L21 8l-1.7 10.2a1 1 0 0 1-1 .8H5.7a1 1 0 0 1-1-.8L3 8Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
}

function Tab({ active, icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-1 flex-col items-center gap-1 py-2 text-[11px] font-bold uppercase tracking-wide transition-colors ${
        active ? 'text-lime' : 'text-muted'
      }`}
    >
      {ICONS[icon]}
      {label}
    </button>
  )
}

export default function BottomNav({ current, onNavigate }) {
  return (
    <nav className="sticky bottom-0 z-20 border-t border-white/[0.06] bg-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-app items-stretch px-6 pb-[max(env(safe-area-inset-bottom),8px)] pt-1">
        <Tab
          active={current === 'home'}
          icon="home"
          label="Главная"
          onClick={() => onNavigate('home')}
        />
        <Tab
          active={current === 'premium'}
          icon="premium"
          label="Premium"
          onClick={() => onNavigate('premium')}
        />
      </div>
    </nav>
  )
}
