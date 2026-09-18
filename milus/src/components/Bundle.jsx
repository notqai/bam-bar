import Pic from './Pic.jsx'
import Todo from './Todo.jsx'
import Button, { WhatsAppIcon } from './Button.jsx'
import { bundle, currency } from '../data/menu.js'
import { copy, links } from '../data/site.js'

// "Buy 4 – RM30" promo block. Phase 2 swaps the CTA for the order builder.
export default function Bundle() {
  const c = copy.bundle
  return (
    <section aria-labelledby="bundle-heading" className="bg-cream px-4 pb-14 md:pb-24">
      <div className="relative mx-auto grid max-w-6xl items-center gap-6 overflow-hidden rounded-[2.25rem] bg-orange p-6 text-warm shadow-lift md:grid-cols-[1fr_1.1fr] md:gap-10 md:p-10">
        <span aria-hidden="true" className="absolute -left-10 -top-10 size-40 rounded-full bg-sun/90 md:size-56" />
        <div className="relative rotate-[2deg] overflow-hidden rounded-[1.75rem] shadow-lift md:rotate-[3deg]">
          <Pic
            name={c.image}
            alt={c.imageAlt}
            sizes="(min-width: 768px) 40vw, 90vw"
            className="aspect-square w-full object-cover"
          />
        </div>
        <div className="relative flex flex-col items-start gap-4">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-cocoa">{c.eyebrow}</p>
          <h2 id="bundle-heading" className="font-display text-5xl font-bold leading-none text-white md:text-7xl">
            {bundle.label}, pay {currency}
            {bundle.price}
          </h2>
          <p className="text-lg text-cocoa">{c.sub}</p>
          <p className="text-sm text-cocoa">
            {currency}
            {bundle.unitPrice} each otherwise. <Todo>{c.note}</Todo>
          </p>
          <Button href={links.whatsapp()} target="_blank" rel="noopener" size="lg">
            <WhatsAppIcon className="size-6" /> {c.cta}
          </Button>
        </div>
      </div>
    </section>
  )
}
