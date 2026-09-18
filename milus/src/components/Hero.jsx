import Wordmark from './Wordmark.jsx'
import Pic from './Pic.jsx'
import Wave from './Wave.jsx'
import Todo from './Todo.jsx'
import Button, { WhatsAppIcon } from './Button.jsx'
import { copy, links, brand } from '../data/site.js'

export default function Hero() {
  const h = copy.hero
  return (
    <section className="relative overflow-hidden bg-orange text-warm">
      {/* scattered yellow dots, decorative */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute left-[8%] top-[12%] size-3 rounded-full bg-sun/90" />
        <span className="absolute right-[12%] top-[8%] size-2 rounded-full bg-sun/80" />
        <span className="absolute bottom-[22%] left-[4%] size-2 rounded-full bg-sun/70" />
        <span className="absolute -right-24 -top-24 size-72 rounded-full bg-orange-deep/40 md:size-96" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-8 px-4 pb-8 pt-8 md:grid-cols-[1.1fr_1fr] md:items-center md:gap-12 md:pb-16 md:pt-16">
        <div className="flex flex-col items-start gap-5">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-cocoa">
            Soft cookies · <Todo>{brand.location}</Todo>
          </p>
          <h1 className="leading-none">
            <Wordmark className="text-[clamp(4.5rem,22vw,8rem)]" />
          </h1>
          <p className="font-display text-3xl font-bold leading-[1.05] text-white md:text-5xl">{h.headline}</p>
          <p className="max-w-md text-lg text-cocoa">{h.sub}</p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button href={links.whatsapp()} target="_blank" rel="noopener" size="lg" className="w-full sm:w-auto">
              <WhatsAppIcon className="size-6" /> {h.primary}
            </Button>
            <Button href="#flavours" variant="light" size="lg" className="w-full sm:w-auto">
              {h.secondary} <span aria-hidden="true">↓</span>
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md md:max-w-none">
          <div className="rotate-[-2.5deg] overflow-hidden rounded-[2.25rem] bg-cocoa/10 shadow-lift motion-safe:transition motion-safe:duration-500 motion-safe:hover:rotate-0">
            <Pic
              name={h.image}
              alt={h.imageAlt}
              priority
              sizes="(min-width: 768px) 45vw, 92vw"
              className="aspect-[10/11] w-full object-cover"
            />
          </div>
          {/* price sticker */}
          <div
            aria-label={`${h.sticker} ${h.stickerSub}`}
            className="absolute -right-2 -top-4 grid size-24 place-items-center rounded-full bg-sun text-center leading-none text-cocoa shadow-lift motion-safe:animate-wiggle md:-right-6 md:-top-6 md:size-28"
          >
            <span>
              <span className="block font-display text-3xl font-bold md:text-4xl">{h.sticker}</span>
              <span className="block font-display text-sm font-semibold">{h.stickerSub}</span>
            </span>
          </div>
        </div>
      </div>

      <Wave fill="fill-maroon" />
    </section>
  )
}
