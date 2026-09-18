import Pic from './Pic.jsx'
import Dot from './Dot.jsx'
import SectionHead from './SectionHead.jsx'
import { CornerBlob } from './Wave.jsx'
import { flavours, currency } from '../data/menu.js'
import { copy } from '../data/site.js'

export default function Flavours() {
  const c = copy.flavours
  return (
    <section id="flavours" className="relative scroll-mt-20 overflow-hidden bg-cream py-14 md:py-24">
      <CornerBlob position="top-right" className="opacity-90" />
      <CornerBlob position="bottom-left" className="hidden opacity-90 md:block" />

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="flex items-end justify-between gap-4">
          <SectionHead eyebrow={c.eyebrow} heading={c.heading} sub={c.sub} />
          <p aria-hidden="true" className="shrink-0 pb-1 font-display text-sm font-semibold text-orange-deep md:hidden">
            {c.swipeHint}
          </p>
        </div>

        <ul
          className="no-scrollbar -mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 lg:grid-cols-4"
          aria-label="Cookie flavours"
        >
          {flavours.map((f, i) => (
            <li key={f.id} className="w-[76vw] max-w-[320px] shrink-0 snap-center md:w-auto md:max-w-none">
              <FlavourCard flavour={f} index={i} featuredLabel={c.featuredLabel} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function FlavourCard({ flavour: f, index, featuredLabel }) {
  const tilt = ['-rotate-1', 'rotate-1', '-rotate-1', 'rotate-1'][index % 4]
  return (
    <article className={`group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-lift motion-safe:transition motion-safe:duration-300 motion-safe:hover:-translate-y-1.5 md:${tilt} md:hover:rotate-0`}>
      <div className="relative overflow-hidden">
        <Pic
          name={f.image}
          alt={f.imageAlt}
          sizes="(min-width: 1024px) 22vw, (min-width: 768px) 45vw, 76vw"
          className="aspect-[4/3] w-full object-cover motion-safe:transition motion-safe:duration-500 group-hover:scale-105"
        />
        {f.featured && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-sun px-3 py-1 font-display text-sm font-bold text-cocoa shadow-sm">
            <span aria-hidden="true">✦</span> {featuredLabel}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif-display text-xl leading-tight text-maroon">{f.name}</h3>
          <span className="shrink-0 rounded-full bg-orange px-3 py-1 font-display text-base font-bold text-cocoa">
            {currency}
            {f.price}
          </span>
        </div>
        <p className="text-[15px] leading-snug text-cocoa/80">{f.description}</p>
        {f.allergens?.includes('hazelnuts') && (
          <p className="mt-auto inline-flex items-center gap-1.5 pt-2 text-xs font-semibold text-maroon">
            <Dot className="size-1.5" /> Contains hazelnuts
          </p>
        )}
      </div>
    </article>
  )
}
