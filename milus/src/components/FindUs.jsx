import Pic from './Pic.jsx'
import Todo from './Todo.jsx'
import SectionHead from './SectionHead.jsx'
import Wave from './Wave.jsx'
import Button, { WhatsAppIcon, InstagramIcon } from './Button.jsx'
import { copy, links, contact } from '../data/site.js'

export default function FindUs() {
  const c = copy.findUs
  return (
    <section id="find-us" className="scroll-mt-20 bg-cream pt-4">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 md:grid-cols-2 md:gap-12 md:py-20">
        <div className="flex flex-col items-start gap-5">
          <SectionHead eyebrow={c.eyebrow} heading={c.heading} sub={c.sub} />
          <dl className="grid w-full gap-4 rounded-[1.75rem] bg-white p-5 shadow-lift">
            <div>
              <dt className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-orange-deep">Where</dt>
              <dd className="mt-1 text-cocoa"><Todo>{contact.address}</Todo></dd>
            </div>
            <div>
              <dt className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-orange-deep">When</dt>
              <dd className="mt-1">
                <ul className="flex flex-col gap-1 text-cocoa">
                  {contact.hours.map((h) => (
                    <li key={h.days} className="flex justify-between gap-4">
                      <span>{h.days}</span>
                      <span><Todo>{h.time}</Todo></span>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button href={links.whatsapp()} target="_blank" rel="noopener" className="w-full sm:w-auto">
              <WhatsAppIcon /> {c.ctaWhatsapp}
            </Button>
            <Button href={links.instagram()} target="_blank" rel="noopener" variant="outline" className="w-full shadow-none sm:w-auto">
              <InstagramIcon /> {c.ctaInstagram}
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="overflow-hidden rounded-[2.25rem] shadow-lift">
            <Pic
              name={c.image}
              alt={c.imageAlt}
              sizes="(min-width: 768px) 45vw, 92vw"
              className="aspect-[5/4] w-full object-cover"
            />
          </div>
          {contact.mapEmbedUrl ? (
            <iframe
              title="Map to Milus Cookies"
              src={contact.mapEmbedUrl}
              loading="lazy"
              className="aspect-[5/3] w-full rounded-[1.75rem] border-0 shadow-lift"
            />
          ) : (
            <div className="grid aspect-[5/2] place-items-center rounded-[1.75rem] border-2 border-dashed border-maroon/40 bg-kraft-paper text-center">
              <span className="font-mono text-xs text-maroon">TODO: Google Maps embed (contact.mapEmbedUrl in src/data/site.js)</span>
            </div>
          )}
        </div>
      </div>
      <Wave fill="fill-maroon" />
    </section>
  )
}
