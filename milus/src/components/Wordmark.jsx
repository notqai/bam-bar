import { brand } from '../data/site.js'

// The MiLUs wordmark rebuilt as live text: heavy rounded sans, white, with
// the yellow dot on the "i". `className` sets the size (font-size drives
// everything, the endorsement line scales with it).
export default function Wordmark({ className = 'text-5xl', endorsement = true, tone = 'light' }) {
  const color = tone === 'light' ? 'text-white' : 'text-maroon'
  return (
    <span className={`inline-flex flex-col items-end leading-none ${className}`}>
      <span className="sr-only">{brand.wordmark}</span>
      <span aria-hidden="true" className={`font-display font-bold tracking-[-0.035em] ${color}`}>
        M
        <span className="relative inline-block">
          ı
          <span className="absolute left-1/2 top-[0.06em] size-[0.2em] -translate-x-1/2 rounded-full bg-sun motion-safe:animate-pop" />
        </span>
        LUs
      </span>
      {endorsement && (
        <span
          aria-label={brand.endorsement}
          className={`mt-[0.12em] font-display font-medium tracking-tight ${color}`}
          style={{ fontSize: 'max(0.19em, 9px)' }}
        >
          {brand.endorsement}
        </span>
      )}
    </span>
  )
}
