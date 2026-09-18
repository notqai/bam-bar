import Wordmark from './Wordmark.jsx'
import Todo from './Todo.jsx'
import { InstagramIcon, WhatsAppIcon } from './Button.jsx'
import { nav, links, copy, contact } from '../data/site.js'

export default function Footer() {
  return (
    <footer className="bg-maroon text-warm">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3 md:py-16">
        <div>
          <Wordmark className="text-4xl" />
          <p className="mt-4 max-w-xs text-warm/80">{copy.footer.blurb}</p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-col gap-2 font-display text-lg font-semibold">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="rounded hover:text-sun">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-col gap-3">
          <a href={links.whatsapp()} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded hover:text-sun">
            <WhatsAppIcon /> WhatsApp{contact.whatsappNumber ? '' : ' '}
            {!contact.whatsappNumber && <Todo>TODO: number</Todo>}
          </a>
          <a href={links.instagram()} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded hover:text-sun">
            <InstagramIcon /> @{contact.instagramHandle}
          </a>
          <p className="text-sm text-warm/70">
            <Todo>{copy.footer.halalNote}</Todo>
          </p>
        </div>
      </div>
      <div className="bg-wicker-weave h-2" aria-hidden="true" />
      <p className="px-4 py-4 text-center text-sm text-warm/70">{copy.footer.credit}</p>
    </footer>
  )
}
