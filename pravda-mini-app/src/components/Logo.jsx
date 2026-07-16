/**
 * Lime monogram logo — a stylized "P" (Pravda) inside a rounded square.
 * `size` controls the box in px.
 */
export default function Logo({ size = 88, glow = true }) {
  return (
    <div
      className={`grid place-items-center rounded-[28%] bg-lime ${glow ? 'shadow-glow' : ''}`}
      style={{ width: size, height: size }}
      aria-label="Pravda"
      role="img"
    >
      <svg
        width={size * 0.56}
        height={size * 0.56}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Monogram "P" drawn with thick strokes on the ink background color */}
        <path
          d="M6 3.5h7.5a5 5 0 0 1 0 10H9.5V20.5"
          stroke="#0D0D0D"
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Check-mark accent — the "verified / truth" cue */}
        <path
          d="M15.2 15.8l2 2 3.3-3.6"
          stroke="#0D0D0D"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  )
}
