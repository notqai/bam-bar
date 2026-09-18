import { useState } from 'react'
import { Link } from 'react-router-dom'
import Wordmark from './Wordmark.jsx'
import Button, { WhatsAppIcon } from './Button.jsx'
import { nav, links, copy } from '../data/site.js'

export default function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40 bg-orange text-warm shadow-[0_2px_0_rgb(42_15_15/0.08)]">
      <nav aria-label="Primary" className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2.5 md:py-3">
        <Link to="/" className="rounded-xl" aria-label="Milus Cookies home" onClick={() => setOpen(false)}>
          <Wordmark className="text-3xl md:text-4xl" />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="rounded-full px-4 py-2 font-display text-lg font-semibold text-cocoa motion-safe:transition hover:bg-cocoa/10"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="ml-2">
            <Button href={links.whatsapp()} target="_blank" rel="noopener" size="sm">
              <WhatsAppIcon /> {copy.hero.primary}
            </Button>
          </li>
        </ul>

        <button
          type="button"
          className="grid size-12 place-items-center rounded-full bg-cocoa/10 text-cocoa md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-cocoa/10 bg-orange px-4 pb-4 pt-2 md:hidden">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 font-display text-xl font-semibold text-cocoa hover:bg-cocoa/10"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
