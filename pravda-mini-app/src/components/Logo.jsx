/**
 * Lime monogram — twin chevrons forming an "A/V" mark, echoing the Figma
 * Lexi/Pravda brand. `size` controls the rounded box in px.
 */
export default function Logo({ size = 88, glow = true, rounded = true }) {
  return (
    <div
      className={`grid place-items-center bg-lime ${glow ? 'shadow-glow' : ''} ${
        rounded ? 'rounded-[28%]' : 'rounded-2xl'
      }`}
      style={{ width: size, height: size }}
      aria-label="Pravda AI"
      role="img"
    >
      <svg
        width={size * 0.56}
        height={size * 0.56}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Two interlocking chevrons on the ink background color */}
        <path
          d="M4 25 L13 7 L16 13"
          stroke="#0D0D0D"
          strokeWidth="3.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M28 25 L19 7 L11 25"
          stroke="#0D0D0D"
          strokeWidth="3.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
