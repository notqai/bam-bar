import Pic from './Pic.jsx'
import Todo from './Todo.jsx'
import SectionHead from './SectionHead.jsx'
import Wave from './Wave.jsx'
import Button from './Button.jsx'
import { copy, links } from '../data/site.js'

export default function CrookieFeature() {
  const c = copy.crookie
  return (
    <section id="crookie" className="relative scroll-mt-20 bg-maroon pt-6 text-warm md:pt-10">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-8 md:grid-cols-2 md:gap-12 md:py-16">
        <div className="relative">
          <div className="rotate-[1.5deg] overflow-hidden rounded-[2.25rem] shadow-lift motion-safe:transition motion-safe:duration-500 motion-safe:hover:rotate-0">
            <Pic
              name={c.image}
              alt={c.imageAlt}
              sizes="(min-width: 768px) 45vw, 92vw"
              className="aspect-square w-full object-cover"
            />
          </div>
          <span className="absolute -left-2 -top-3 rounded-full bg-sun px-4 py-2 font-display text-2xl font-bold text-cocoa shadow-lift md:-left-5 md:-top-5 md:text-3xl">
            {c.price}
          </span>
        </div>
        <div className="flex flex-col items-start gap-5">
          <SectionHead eyebrow={c.eyebrow} heading={c.heading} sub={c.sub} tone="dark" />
          <p className="text-sm text-warm/70">
            <Todo>{c.priceNote}</Todo>
          </p>
          <Button href={links.whatsapp(`Hi Milus! Is the Crookie (${c.price}) available today?`)} target="_blank" rel="noopener" variant="light">
            {c.cta}
          </Button>
        </div>
      </div>
      <Wave fill="fill-cream" />
    </section>
  )
}
