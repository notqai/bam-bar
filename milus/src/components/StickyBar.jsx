import Button, { WhatsAppIcon } from './Button.jsx'
import { links, copy } from '../data/site.js'

// Thumb-reach order bar, mobile only.
export default function StickyBar() {
  return (
    <div className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-maroon/10 bg-cream/95 p-3 backdrop-blur md:hidden">
      <Button href={links.whatsapp()} target="_blank" rel="noopener" className="w-full" size="lg">
        <WhatsAppIcon className="size-6" /> {copy.stickyBar.label}
      </Button>
    </div>
  )
}
