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

  // TODO: replace with the real WhatsApp number (digits only, incl. country code)
  whatsapp: '60000000000',

  // Socials
  instagram: 'https://instagram.com/bambar.miri',
  instagramHandle: '@bambar.miri',
  tiktok: '', // TODO: paste TikTok URL, or leave '' to hide

  // TODO: paste your Formspree form ID to enable email reservations
  formspreeId: '',

  // Address — update the exact street line + Google Maps link when confirmed
  address: 'Corner shoplot, Miri, Sarawak, Malaysia',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=BAM+Bar+Miri',
  mapsEmbed: 'https://www.google.com/maps?q=BAM%20Bar%20Miri%20Sarawak&output=embed',

  // Opening hours — edit freely
  hours: [
    { days: 'Mon – Thu', time: '6:00 PM – 1:00 AM' },
    { days: 'Fri – Sat', time: '6:00 PM – 2:00 AM' },
    { days: 'Sunday', time: '6:00 PM – 1:00 AM' },
  ],
}

// Pre-filled WhatsApp booking link
export function whatsappBookingUrl() {
  const msg = encodeURIComponent(
    "Hi BÀM! I'd like to book a table.\n\nName:\nDate:\nTime:\nGuests:"
  )
  return `https://wa.me/${config.whatsapp}?text=${msg}`
}
