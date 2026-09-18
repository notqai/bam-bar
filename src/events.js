// ============================================================================
//  BÀM BAR — WEEKLY EVENTS
//  ---------------------------------------------------------------------------
//  This is the ONLY file you need to touch to change the weekly line-up.
//  Cards appear in the order listed. Each event is:
//    day      — 'Monday' … 'Sunday' (also used to tag the booking-form date hint)
//    name     — headline, e.g. 'DJ Samuel'
//    desc     — one or two punchy sentences
//    image    — background photo, e.g. './img/booth-lounge.jpg'
//    poster   — (optional) full poster; the card becomes tap-to-enlarge
//    tag      — (optional) small pill, e.g. 'Live DJ'
//    hint     — (optional) short label shown under the booking date, e.g. 'DJ night 🎧'
//    feature  — (optional) true = red highlight border
//
//  To swap a DJ: change `name`, `desc` and drop the new poster in public/img/,
//  then update `poster` + `image` to the new filename. Run ./deploy.sh.
//  To drop a night: delete its block. To add one: copy a block.
// ============================================================================

export const events = [
  {
    day: 'Wednesday',
    name: 'Ladies Night',
    desc: 'The midweek reset. Special pours for the ladies all night — bring the crew.',
    image: './img/booth-lounge.jpg',
    hint: 'Ladies Night 🍸',
  },
  {
    day: 'Friday',
    name: 'DJ Samuel',
    desc: 'Resident heat on the decks. Red lights up, room loud — booth bookings recommended.',
    image: './img/dj-sam-friday.jpg',
    poster: './img/dj-sam-friday.jpg',
    tag: 'Live DJ',
    hint: 'DJ night 🎧',
    feature: true,
  },
  {
    day: 'Saturday',
    name: 'DJ Samuel',
    desc: 'Peak weekend energy. DJ Sam runs it till 2:30 — full send.',
    image: './img/dj-sam-saturday.jpg',
    poster: './img/dj-sam-saturday.jpg',
    tag: 'Live DJ',
    hint: 'DJ night 🎧',
  },
]
