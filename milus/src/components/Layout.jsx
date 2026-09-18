import { Outlet } from 'react-router-dom'
import Nav from './Nav.jsx'
import Footer from './Footer.jsx'
import StickyBar from './StickyBar.jsx'

export default function Layout() {
  return (
    <div className="flex min-h-dvh flex-col bg-cream pb-24 md:pb-0">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-maroon focus:px-4 focus:py-2 focus:text-warm"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <StickyBar />
    </div>
  )
}
