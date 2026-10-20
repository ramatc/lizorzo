import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { About } from './components/About'
import { EasterEgg925 } from './components/EasterEgg925'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { LatestRelease } from './components/LatestRelease'
import { MusicGrid } from './components/MusicGrid'
import { TourDates } from './components/TourDates'
import { releases } from './data/releases'
import { shows } from './data/shows'
import { getPublishedReleases, getUpcomingShows, todayISO } from './lib/dates'

export default function App() {
  const today = todayISO()
  const upcoming = getUpcomingShows(shows, today)
  const published = getPublishedReleases(releases, today)
  const [latest, ...rest] = published
  const liveSession = rest.find((release) => release.type === 'live_session')
  const catalog = rest.filter((release) => release !== liveSession)

  return (
    <div className="grain">
      {/* data-behind-menu: made inert while the full-screen mobile menu is open (see Header). */}
      <a
        data-behind-menu
        href="#fechas"
        className="ui-label fixed top-2 left-2 z-[70] -translate-y-20 bg-accent px-4 py-3 text-ink focus:translate-y-0"
      >
        Saltar a las fechas
      </a>
      <Header />
      <main data-behind-menu>
        <Hero nextShow={upcoming[0]} />
        <TourDates shows={upcoming} />
        <LatestRelease release={latest} />
        <MusicGrid releases={catalog} liveSession={liveSession} total={published.length} />
        <About releases={published} />
      </main>
      <Footer />
      <EasterEgg925 />
      <Analytics />
      <SpeedInsights />
    </div>
  )
}
