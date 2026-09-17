// ============================================================================
//  BÀM BAR — SITE CONFIG
//  Edit your contact details, links and hours here. Everything else reads
//  from this file, so you never have to hunt through the HTML.
//  ---------------------------------------------------------------------------
//  ⚠️  PLACEHOLDERS TO REPLACE (marked TODO):
//    • whatsapp  — the venue's WhatsApp number in international format,
//                  digits only, no "+" or spaces. e.g. Malaysia: 60128889999
//    • tiktok    — full TikTok profile URL (or leave '' to hide the link)
//    • formspreeId — create a free form at https://formspree.io and paste the
//                  form ID here to make the reservation form actually send email.
// ============================================================================

export const config = {
  name: 'BÀM Bar',
  tagline: 'Miri’s loudest little corner.',
  estd: 'ESTD 2026',
  city: 'Miri, Sarawak',

  // WhatsApp number — digits only, incl. country code (+60 17-521 5551)
  whatsapp: '60175215551',

  // Socials
  instagram: 'https://instagram.com/bambar.miri',
  instagramHandle: '@bambar.miri',
  tiktok: '', // no TikTok — leave '' to hide the link

  // TODO: paste your Formspree form ID to enable email reservations
  formspreeId: '',

  // Address + Google Maps (listing: "BÀM Bar Miri")
  address: 'Lot 2292, Ground Floor, Marina Square Phase 2 (below Level Up Gym), Miri, Sarawak',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=B%C3%80M%20Bar%20Marina%20Square%20Phase%202%20Miri',
  mapsEmbed: 'https://www.google.com/maps?q=B%C3%80M%20Bar%20Marina%20Square%20Phase%202%20Miri%20Sarawak&output=embed',

  // Opening hours — edit freely
  hours: [
    { days: 'Mon – Thu', time: '4:00 PM – 1:00 AM' },
    { days: 'Fri – Sat', time: '4:00 PM – 2:30 AM' },
    { days: 'Sunday', time: '4:00 PM – 1:00 AM' },
  ],

  // Google review link. For a true one-tap link, open your Google Business
  // Profile → "Ask for reviews" → copy the g.page/r/…/review link and paste here.
  reviewUrl: 'https://www.google.com/maps/search/?api=1&query=B%C3%80M%20Bar%20Marina%20Square%20Phase%202%20Miri',

  // Full printed-menu images, shown via the "View full menu" button.
  // Drop the files in public/img/ and list them here. Leave [] to hide the button.
  fullMenuImages: [
    // { src: './img/menu-full-1.jpg', alt: 'BÀM full menu — drinks & liquor' },
    // { src: './img/menu-full-2.jpg', alt: 'BÀM full menu — cocktails & food' },
  ],
}

// Pre-filled WhatsApp booking link
export function whatsappBookingUrl() {
  const msg = encodeURIComponent(
    "Hi BÀM! I'd like to book a table.\n\nName:\nDate:\nTime:\nGuests:"
  )
  return `https://wa.me/${config.whatsapp}?text=${msg}`
}

// Pre-filled WhatsApp feedback link (private feedback channel)
export function whatsappFeedbackUrl() {
  const msg = encodeURIComponent('Hi BÀM! Some feedback from your website:\n\n')
  return `https://wa.me/${config.whatsapp}?text=${msg}`
}
