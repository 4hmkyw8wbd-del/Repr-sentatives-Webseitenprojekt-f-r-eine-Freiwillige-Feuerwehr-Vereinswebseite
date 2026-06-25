import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { FictionBanner } from './components/layout/FictionBadge'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { MobileCtaBar } from './components/layout/MobileCtaBar'
import { Home } from './pages/Home'
import { ImpressumPage, DatenschutzPage } from './pages/RechtlichesPage'

/** Beim Routenwechsel nach oben scrollen (außer bei Anchor-Sprüngen). */
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <a
        href="#start"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-fire-500 focus:px-4 focus:py-2 focus:text-white"
      >
        Zum Inhalt springen
      </a>
      <FictionBanner />
      <Navbar />
      <div className="pb-24 lg:pb-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/impressum" element={<ImpressumPage />} />
          <Route path="/datenschutz" element={<DatenschutzPage />} />
        </Routes>
      </div>
      <Footer />
      <MobileCtaBar />
    </>
  )
}
