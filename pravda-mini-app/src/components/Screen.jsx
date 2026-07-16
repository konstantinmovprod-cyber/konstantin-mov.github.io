/**
 * Screen wrapper — constrains content to a mobile viewport width, centers it,
 * and applies consistent padding + a fade-in transition on route change.
 */
export default function Screen({ children, className = '', padded = true }) {
  return (
    <div className="min-h-full w-full">
      <div
        className={`mx-auto flex min-h-full w-full max-w-app flex-col ${
          padded ? 'px-5' : ''
        } ${className}`}
      >
        {children}
      </div>
    </div>
  )
}
