// ============================================================================
//  BÀM BAR — main.js
//  Wires up: styles, config-driven links, nav behaviour, menu tabs,
//  scroll reveal, and the reservation form.
//  You normally won't need to edit this — content lives in config.js & menu.js.
// ============================================================================

import './styles.css'
import { config, whatsappBookingUrl, whatsappFeedbackUrl } from './config.js'
import { menu, special } from './menu.js'

// ---------------------------------------------------------------------------
//  Helpers
// ---------------------------------------------------------------------------
const $ = (sel, root = document) => root.querySelector(sel)
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)]

// Dev-only: `?shot` in the URL reveals everything at once for full-page
// screenshots (see styles.css `.shot`). Harmless in production.
if (location.search.includes('shot')) document.documentElement.classList.add('shot')

// ---------------------------------------------------------------------------
//  1. Config-driven links (WhatsApp, maps, year)
// ---------------------------------------------------------------------------
const waUrl = whatsappBookingUrl()
$('#wa-book')?.setAttribute('href', waUrl)
$('#wa-float')?.setAttribute('href', waUrl)
$$('[data-book]').forEach((el) => (el.getAttribute('href') === '#book') || el.setAttribute('href', waUrl))

$('#maps-link')?.setAttribute('href', config.mapsUrl)
$('#maps-embed')?.setAttribute('src', config.mapsEmbed)
$('#review-link')?.setAttribute('href', config.reviewUrl)
$('#feedback-link')?.setAttribute('href', whatsappFeedbackUrl())
$('#visit-addr') && ($('#visit-addr').textContent = config.address)
$('#year') && ($('#year').textContent = new Date().getFullYear())

// Opening hours
const hoursList = $('#hours-list')
if (hoursList) {
  hoursList.innerHTML = config.hours
    .map((h) => `<li><span class="days">${h.days}</span><span class="time">${h.time}</span></li>`)
    .join('')
}

// Footer socials
const social = $('#footer-social')
if (social) {
  const links = [
    { href: config.instagram, label: 'Instagram', svg: icon('instagram') },
    config.tiktok ? { href: config.tiktok, label: 'TikTok', svg: icon('tiktok') } : null,
    { href: waUrl, label: 'WhatsApp', svg: icon('whatsapp') },
  ].filter(Boolean)
  social.innerHTML = links
    .map((l) => `<a href="${l.href}" target="_blank" rel="noopener" aria-label="${l.label}">${l.svg}</a>`)
    .join('')
}

// ---------------------------------------------------------------------------
//  1b. Marquee — build two identical groups wide enough to overflow any screen
//      so the loop is seamless (no mid-screen reset).
// ---------------------------------------------------------------------------
const marqueeTrack = $('#marquee-track')
if (marqueeTrack) {
  const phrases = ['BÀM MIRI', 'ESTD 2026', 'COCKTAILS · SHOTS · LATE NIGHTS']
  const set = phrases
    .map((p) => `<span>${p}</span><span class="marquee__star">✺</span>`)
    .join('')
  const group = set.repeat(4) // repeat enough to exceed wide viewports
  marqueeTrack.innerHTML =
    `<div class="marquee__group">${group}</div>` +
    `<div class="marquee__group">${group}</div>`
}

// ---------------------------------------------------------------------------
//  2. Nav — scroll state + mobile toggle
// ---------------------------------------------------------------------------
const nav = $('#nav')
const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 30)
onScroll()
window.addEventListener('scroll', onScroll, { passive: true })

const toggle = $('#nav-toggle')
toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open')
  toggle.setAttribute('aria-expanded', String(open))
})
// close mobile menu after tapping a link
$$('#nav-links a').forEach((a) =>
  a.addEventListener('click', () => {
    nav.classList.remove('is-open')
    toggle?.setAttribute('aria-expanded', 'false')
  })
)

// ---------------------------------------------------------------------------
//  3. Menu — special headliner + tabs + panels (built from menu.js)
// ---------------------------------------------------------------------------
const specialEl = $('#menu-special')
if (specialEl && special) {
  specialEl.innerHTML = `
    <span class="flame">🔥</span>
    <b>${special.name}</b>
    <span>${special.desc}</span>
    <span class="price">RM${special.price}</span>`
}

const tabsEl = $('#menu-tabs')
const panelsEl = $('#menu-panels')
if (tabsEl && panelsEl) {
  tabsEl.innerHTML = menu
    .map(
      (cat, i) => `
      <button class="menu__tab ${i === 0 ? 'is-active' : ''}" role="tab"
        aria-selected="${i === 0}" aria-controls="panel-${cat.key}" id="tab-${cat.key}">
        ${cat.label}
      </button>`
    )
    .join('')

  panelsEl.innerHTML = menu
    .map(
      (cat, i) => `
      <div class="menu__panel ${i === 0 ? 'is-active' : ''}" role="tabpanel"
        id="panel-${cat.key}" aria-labelledby="tab-${cat.key}" ${i === 0 ? '' : 'hidden'}>
        ${cat.note ? `<p class="menu__note">${cat.note}</p>` : ''}
        <div class="menu__items">
          ${cat.items.map(renderItem).join('')}
        </div>
      </div>`
    )
    .join('')

  const tabs = $$('.menu__tab', tabsEl)
  const panels = $$('.menu__panel', panelsEl)
  tabs.forEach((tab, i) =>
    tab.addEventListener('click', () => {
      tabs.forEach((t) => { t.classList.remove('is-active'); t.setAttribute('aria-selected', 'false') })
      panels.forEach((p) => { p.classList.remove('is-active'); p.setAttribute('hidden', '') })
      tab.classList.add('is-active'); tab.setAttribute('aria-selected', 'true')
      panels[i].classList.add('is-active'); panels[i].removeAttribute('hidden')
    })
  )
}

function renderItem(item) {
  // Prices that aren't a plain number (e.g. "—") skip the "RM" prefix.
  const bare = !/^[0-9]/.test(item.price) ? '1' : '0'
  return `
    <div class="menu__item">
      <span class="menu__item-name">${item.name}
        ${item.desc ? `<span class="menu__item-desc">${item.desc}</span>` : ''}
      </span>
      <span class="menu__item-price" data-bare="${bare}">${item.price}</span>
    </div>`
}

// ---------------------------------------------------------------------------
//  3b. Lightbox — reused by the gallery and the full-menu button
// ---------------------------------------------------------------------------
const lightbox = (() => {
  let images = []
  let index = 0
  let el

  function build() {
    el = document.createElement('div')
    el.className = 'lightbox'
    el.setAttribute('role', 'dialog')
    el.setAttribute('aria-modal', 'true')
    el.setAttribute('aria-label', 'Image viewer')
    el.innerHTML = `
      <button class="lightbox__btn lightbox__close" aria-label="Close">✕</button>
      <button class="lightbox__btn lightbox__prev" aria-label="Previous">‹</button>
      <img class="lightbox__img" alt="" />
      <button class="lightbox__btn lightbox__next" aria-label="Next">›</button>
      <p class="lightbox__count"></p>`
    document.body.appendChild(el)
    el.querySelector('.lightbox__close').addEventListener('click', close)
    el.querySelector('.lightbox__prev').addEventListener('click', () => step(-1))
    el.querySelector('.lightbox__next').addEventListener('click', () => step(1))
    el.addEventListener('click', (e) => { if (e.target === el) close() })
  }
  function render() {
    const img = el.querySelector('.lightbox__img')
    img.src = images[index].src
    img.alt = images[index].alt || ''
    el.querySelector('.lightbox__count').textContent = `${index + 1} / ${images.length}`
    el.setAttribute('data-single', images.length <= 1 ? '1' : '0')
  }
  function step(d) { index = (index + d + images.length) % images.length; render() }
  function close() { el.classList.remove('is-open'); document.body.style.overflow = '' }
  function open(imgs, start = 0) {
    if (!el) build()
    images = imgs; index = start; render()
    el.classList.add('is-open')
    document.body.style.overflow = 'hidden'
  }
  document.addEventListener('keydown', (e) => {
    if (!el || !el.classList.contains('is-open')) return
    if (e.key === 'Escape') close()
    else if (e.key === 'ArrowLeft') step(-1)
    else if (e.key === 'ArrowRight') step(1)
  })
  return { open }
})()

// Gallery photos → lightbox
const galleryImgs = $$('.gallery__item img')
const galleryData = galleryImgs.map((img) => ({ src: img.src, alt: img.alt }))
galleryImgs.forEach((img, i) => {
  const fig = img.closest('.gallery__item')
  fig.setAttribute('role', 'button')
  fig.setAttribute('tabindex', '0')
  fig.setAttribute('aria-label', 'Enlarge photo')
  const openIt = () => lightbox.open(galleryData, i)
  fig.addEventListener('click', openIt)
  fig.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openIt() }
  })
})

// DJ event cards → tap to view the full uncropped poster in the lightbox
const djCards = $$('.event--dj')
const djPosters = djCards.map((c) => ({
  src: c.dataset.poster,
  alt: c.querySelector('.event__media')?.alt || 'Event poster',
}))
djCards.forEach((card, i) => {
  card.setAttribute('role', 'button')
  card.setAttribute('tabindex', '0')
  card.setAttribute('aria-label', djPosters[i].alt)
  const openIt = () => lightbox.open(djPosters, i)
  card.addEventListener('click', openIt)
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openIt() }
  })
})

// Full-menu images → lightbox (button stays hidden until images are configured)
const viewFull = $('#menu-viewfull')
if (viewFull && Array.isArray(config.fullMenuImages) && config.fullMenuImages.length) {
  viewFull.hidden = false
  viewFull.addEventListener('click', () => lightbox.open(config.fullMenuImages, 0))
}

// ---------------------------------------------------------------------------
//  4. Scroll reveal
// ---------------------------------------------------------------------------
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target) }
    })
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
)
$$('.reveal').forEach((el) => io.observe(el))

// ---------------------------------------------------------------------------
//  5. Reservation form
//     • With a Formspree ID set in config → sends email.
//     • Without one → falls back to opening a pre-filled WhatsApp message.
// ---------------------------------------------------------------------------
const form = $('#book-form')
const status = $('#book-status')
form?.addEventListener('submit', async (e) => {
  e.preventDefault()
  if (!form.reportValidity()) return
  const data = Object.fromEntries(new FormData(form).entries())
  status.className = 'book__status'
  status.textContent = 'Sending…'

  // No email backend configured yet → hand off to WhatsApp so it still works.
  if (!config.formspreeId) {
    const msg = encodeURIComponent(
      `Hi BÀM! Table request:\n\nName: ${data.name}\nDate: ${data.date}\nGuests: ${data.guests}\nContact: ${data.contact}\n${data.note ? 'Note: ' + data.note : ''}`
    )
    window.open(`https://wa.me/${config.whatsapp}?text=${msg}`, '_blank', 'noopener')
    status.classList.add('is-ok')
    status.textContent = 'Opening WhatsApp to confirm your booking…'
    return
  }

  try {
    const res = await fetch(`https://formspree.io/f/${config.formspreeId}`, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(form),
    })
    if (res.ok) {
      form.reset()
      status.classList.add('is-ok')
      status.textContent = 'Got it — we’ll confirm your booth shortly. 🖤'
    } else {
      throw new Error('bad response')
    }
  } catch {
    status.classList.add('is-err')
    status.textContent = 'Something went wrong — please WhatsApp us instead.'
  }
})

// ---------------------------------------------------------------------------
//  Inline social icons
// ---------------------------------------------------------------------------
function icon(name) {
  const paths = {
    instagram:
      '<path fill="currentColor" d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 01-1.38-.9 3.7 3.7 0 01-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.13 1.38A5.9 5.9 0 00.63 4.14c-.3.76-.5 1.64-.56 2.9C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.13.67.66 1.34 1.08 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 002.13-1.38 5.9 5.9 0 001.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 00-1.38-2.13A5.9 5.9 0 0019.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 105.84 12 6.16 6.16 0 0012 5.84zm0 10.16A4 4 0 118 12a4 4 0 014 4zm6.4-10.4a1.44 1.44 0 11-1.44-1.44 1.44 1.44 0 011.44 1.44z"/>',
    tiktok:
      '<path fill="currentColor" d="M16.6 5.82a4.28 4.28 0 01-1.06-2.82h-3.3v13.3a2.42 2.42 0 01-2.42 2.4 2.42 2.42 0 010-4.84c.14 0 .28.02.42.05v-3.37a5.8 5.8 0 00-.42-.02 5.72 5.72 0 105.72 5.72V8.9a7.55 7.55 0 004.42 1.42V6.99a4.3 4.3 0 01-3.36-1.17z"/>',
    whatsapp:
      '<path fill="currentColor" d="M.06 24l1.68-6.13A11.86 11.86 0 010 6.31 11.9 11.9 0 0112.05.42a11.87 11.87 0 018.4 3.5 11.82 11.82 0 013.48 8.41c0 6.55-5.35 11.88-11.9 11.88a11.9 11.9 0 01-5.68-1.45L.06 24zm6.6-3.8l.36.22a9.87 9.87 0 005.03 1.38 9.9 9.9 0 100-19.76 9.9 9.9 0 00-9.9 9.88c0 1.9.55 3.76 1.6 5.36l.24.37-.99 3.63 3.64-.95z"/>',
  }
  return `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">${paths[name] || ''}</svg>`
}
