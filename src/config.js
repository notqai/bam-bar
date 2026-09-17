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
}

// Pre-filled WhatsApp booking link
export function whatsappBookingUrl() {
  const msg = encodeURIComponent(
    "Hi BÀM! I'd like to book a table.\n\nName:\nDate:\nTime:\nGuests:"
  )
  return `https://wa.me/${config.whatsapp}?text=${msg}`
}
