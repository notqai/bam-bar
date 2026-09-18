// Organic wavy divider, echoing the menu graphic. Sits at the bottom of a
// section and paints the NEXT section's colour, so the section above ends in
// a wave. `fill` is a Tailwind fill-* class.
export default function Wave({ fill = 'fill-cream', className = '', flip = false }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className={`block h-10 w-full md:h-16 ${flip ? 'rotate-180' : ''} ${className}`}
    >
      <path
        className={fill}
        d="M0 46 C 160 96 320 -6 500 40 C 660 82 800 90 980 38 C 1140 -8 1300 8 1440 44 V 80 H 0 Z"
      />
    </svg>
  )
}

// Wavy corner shape (maroon on cream, as on the menu graphic). Decorative.
export function CornerBlob({ position = 'top-left', className = '' }) {
  const flip = {
    'top-left': '',
    'top-right': '-scale-x-100',
    'bottom-left': '-scale-y-100',
    'bottom-right': '-scale-100',
  }[position]
  const place = {
    'top-left': 'left-0 top-0',
    'top-right': 'right-0 top-0',
    'bottom-left': 'bottom-0 left-0',
    'bottom-right': 'bottom-0 right-0',
  }[position]
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 240 240"
      className={`pointer-events-none absolute ${place} h-28 w-28 md:h-44 md:w-44 ${flip} ${className}`}
    >
      <path
        className="fill-maroon"
        d="M0 0 H 236 C 210 30 176 26 154 58 C 132 92 150 118 112 136 C 74 154 68 128 44 160 C 24 188 26 216 0 240 Z"
      />
    </svg>
  )
}
