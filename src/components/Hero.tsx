import { ArrowDown, ArrowRight } from 'lucide-react'
import { artist } from '../data/artist'
import type { Show } from '../data/shows'
import { formatShowDate } from '../lib/dates'
import { buttonGhost, buttonPrimary } from './ExternalLink'

type HeroProps = { nextShow?: Show }

export function Hero({ nextShow }: HeroProps) {
  const { hero } = artist.photos
  const next = nextShow && formatShowDate(nextShow.date)

  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate bg-ink">
      <div className="relative h-[36svh] min-h-[240px] max-h-[440px] overflow-hidden bg-surface md:h-[clamp(640px,94svh,1000px)] md:max-h-none">
        <img
          src={hero.src}
          srcSet={`${hero.srcSmall} 960w, ${hero.src} 1800w`}
          sizes="100vw"
          width={hero.width}
          height={hero.height}
          alt={hero.alt}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 size-full origin-[58%_52%] scale-[1.3] object-cover object-[62%_46%] md:scale-100 md:object-[50%_84%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/5 to-ink/50 md:from-ink md:via-ink/0 md:via-45%"
        />
        <p className="label absolute bottom-4 left-5 flex items-center gap-3 text-bone/80 md:hidden">
          <span className="text-accent">01</span>
          <span className="h-px w-8 bg-bone/40" aria-hidden="true" />
          {artist.copy.heroLabel}
        </p>
      </div>

      <div className="shell relative md:absolute md:inset-x-0 md:bottom-0">
        <div className="hidden items-end justify-between gap-8 pb-6 md:flex lg:pb-8">
          <div className="max-w-md">
            <p className="label mb-5 flex items-center gap-3 text-bone/80">
              <span className="text-accent">01</span>
              <span className="h-px w-10 bg-bone/40" aria-hidden="true" />
              {artist.copy.heroLabel}
            </p>
            <HeroActions />
          </div>
          <NextShowTeaser show={nextShow} next={next} />
        </div>

        <h1 id="hero-title" className="@container overflow-hidden pt-3 md:pt-0">
          <span className="rise hero-name block font-display leading-[0.8] uppercase">
            {artist.name}
          </span>
        </h1>

        <div className="pt-4 pb-6 md:hidden">
          <HeroActions />
        </div>
      </div>
    </section>
  )
}

function HeroActions() {
  return (
    <div className="grid grid-cols-2 gap-3 md:flex">
      <a href="#fechas" className={buttonPrimary}>
        Ver fechas <ArrowDown size={16} strokeWidth={2.25} aria-hidden="true" />
      </a>
      <a href="#lo-ultimo" className={buttonGhost}>
        Escuchar
      </a>
    </div>
  )
}

function NextShowTeaser({
  show,
  next,
}: {
  show?: Show
  next?: ReturnType<typeof formatShowDate>
}) {
  if (!show || !next) return null
  return (
    <a
      href="#fechas"
      className="group flex min-w-72 flex-col items-end gap-3 bg-ink/85 p-4 text-right"
    >
      <span className="label text-ash">Próxima fecha</span>
      <span className="flex items-center gap-3">
        <span className="font-display text-2xl leading-none md:text-4xl">{next.compact}</span>
        <span className="text-sm font-medium text-bone/90">
          {show.venue}
          <span className="block text-ash">{show.city}</span>
        </span>
        <ArrowRight
          size={18}
          className="text-accent transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </span>
    </a>
  )
}
