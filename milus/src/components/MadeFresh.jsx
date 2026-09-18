import Pic from './Pic.jsx'
import SectionHead from './SectionHead.jsx'
import Wave from './Wave.jsx'
import { copy } from '../data/site.js'

// raw -> baked -> gooey strip on kraft paper.
export default function MadeFresh() {
  const c = copy.madeFresh
  return (
    <section aria-labelledby="fresh-heading" className="bg-kraft-paper pt-14 md:pt-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead eyebrow={c.eyebrow} heading={c.heading} sub={c.sub} align="center" />
        <ol className="mt-8 grid grid-cols-3 gap-2 md:mt-12 md:gap-8">
          {c.steps.map((s, i) => (
            <li key={s.label} className="relative flex flex-col items-center gap-2 text-center">
              <div className="w-full overflow-hidden rounded-2xl bg-white shadow-lift md:rounded-[1.75rem]">
                <Pic
                  name={s.image}
                  alt={s.alt}
                  aspect="1 / 1"
                  sizes="(min-width: 768px) 30vw, 31vw"
                  className="aspect-square w-full object-cover"
                />
              </div>
              <p className="mt-1 font-serif-display text-lg text-maroon md:text-2xl">{s.label}</p>
              <p className="text-xs text-cocoa/70 md:text-base">{s.caption}</p>
              {i < c.steps.length - 1 && (
                <span aria-hidden="true" className="absolute -right-3 top-[28%] font-display text-2xl font-bold text-orange md:-right-6 md:text-4xl">
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
      <Wave fill="fill-maroon" className="mt-10 md:mt-16" />
    </section>
  )
}
