import Dot from './Dot.jsx'
import { copy } from '../data/site.js'

// Maroon marquee band: "Buy 4 · RM30". Duplicated once for a seamless loop;
// static (and wrapping) under prefers-reduced-motion.
export default function PromoRibbon() {
  const items = copy.ribbon
  const Row = ({ hidden }) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-6 pr-6 motion-reduce:flex-wrap motion-reduce:justify-center">
      {items.map((t, i) => (
        <li key={i} className="flex items-center gap-6 whitespace-nowrap">
          <span>{t}</span>
          <Dot className="size-2.5" />
        </li>
      ))}
    </ul>
  )
  return (
    <div className="overflow-hidden bg-maroon py-3 font-display text-lg font-semibold uppercase tracking-wide text-warm md:text-xl">
      <div className="flex w-max motion-safe:animate-marquee motion-reduce:w-full">
        <Row />
        <Row hidden />
      </div>
    </div>
  )
}
