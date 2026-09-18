// ---------------------------------------------------------------------------
// MENU. menu-graphic.jpg is the source of truth for names, prices and copy.
// Photos are keys from src/data/images.generated.json (run `npm run images`).
// ---------------------------------------------------------------------------

export const currency = 'RM'

export const flavours = [
  {
    id: 'smores',
    name: "Campfire S'mores",
    price: 8,
    description: "Graham cracker base, topped with toasted marshmallow and a piece of Hershey's.",
    featured: true, // sparkle marks on the menu graphic
    image: 'smores-card', // cropped from display-case.jpg
    imageAlt: "Campfire S'mores cookies with toasted marshmallow and Hershey's squares, in a wicker basket",
    allergens: ['TODO'],
  },
  {
    id: 'brown-butter',
    name: 'Brown Butter Sea Salt Chocolate Chip',
    shortName: 'Brown Butter Sea Salt',
    price: 8,
    description: 'Classic chocolate chip cookie using brown butter and a sprinkle of sea salt.',
    featured: false,
    // TODO(assets): brownbutter-flatlay.jpg not received; using a display-case crop meanwhile.
    image: 'brownbutter-fallback',
    imageAlt: 'Brown Butter Sea Salt Chocolate Chip cookies with big chocolate chunks in a wicker basket',
    allergens: ['TODO'],
  },
  {
    id: 'hazelnut',
    name: 'Hazelnut Bliss',
    price: 8,
    description: 'Nutella filling mixed with hazelnuts.',
    featured: false,
    // TODO(assets): basket-hazelnut-blackout.jpg not received; using a four-flavours-rack crop meanwhile.
    image: 'hazelnut-fallback',
    imageAlt: 'Hazelnut Bliss cookie with chocolate chips and a whole hazelnut on a cooling rack',
    allergens: ['hazelnuts', 'TODO: confirm full list'], // visibly contains hazelnuts
  },
  {
    id: 'blackout',
    name: 'Blackout Sea Salt Chocolate Chip',
    shortName: 'Blackout Sea Salt',
    price: 8,
    description: 'Mixed with 2 types of chocolate and topped off with sea salt.',
    featured: true, // sparkle marks on the menu graphic
    // TODO(assets): blackout-rack.jpg not received; using a four-flavours-rack crop meanwhile.
    image: 'blackout-fallback',
    imageAlt: 'Blackout Sea Salt Chocolate Chip cookie, deep dark chocolate with flaky sea salt, on a cooling rack',
    allergens: ['TODO'],
  },
]

export const bundle = {
  label: 'Buy 4',
  size: 4,
  price: 30,
  unitPrice: 8,
  anyMix: true, // TODO: confirm any-mix rule with Milus
}

// total = floor(n / 4) * 30 + (n % 4) * 8
export const priceFor = (n) => Math.floor(n / bundle.size) * bundle.price + (n % bundle.size) * bundle.unitPrice

// Seen in photos / on the display sign but not on the menu graphic.
export const alsoInStore = [
  {
    id: 'red-velvet',
    name: 'Red Velvet',
    price: null, // TODO: price unknown
    description: null, // TODO: description unknown; do not invent
    image: 'red-velvet', // TODO(assets): red-velvet.jpg not received
    imageAlt: 'Red Velvet cookies, deep red with pale chips, in a wicker basket',
  },
  {
    id: 'crookie',
    name: 'Crookie',
    price: 10, // display-case sign reads "Crookie RM10". TODO: confirm.
    description: 'Croissant topped with a chocolate chip cookie.',
    image: 'crookie',
    imageAlt: 'Crookies: croissants topped with a chocolate chip cookie',
  },
  {
    id: 'minis',
    name: 'Mini cookies',
    price: null, // TODO: price unknown
    description: null, // TODO: description unknown; do not invent
    image: 'oven-baked-minis', // TODO(assets): oven-baked-minis.jpg not received
    imageAlt: 'A tray of bite-size mini cookies',
  },
]

export const notes = {
  // The display sign reads "Soft Cookie RM7 - RM8"; the menu graphic says RM8 flat. Using RM8.
  priceDiscrepancy: 'TODO: display sign says RM7–RM8, menu graphic says RM8. Confirm.',
  allergen: 'TODO: allergen note (Hazelnut Bliss contains hazelnuts; confirm the rest).',
  halal: 'TODO: halal status.',
}
