import { ArrowUpRight, Plus } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { spotifyUrl } from '../data/artist'
import { releaseTypeLabel, type Release } from '../data/releases'
import { parseISODate } from '../lib/dates'
import { button, buttonGhost } from './button'
import { ExternalLink } from './ExternalLink'
import { ReleaseLinks, releaseUrl } from './ReleaseLinks'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

const INITIAL_VISIBLE = 9

/** Discography filters, mirroring Spotify's own split. */
const FILTERS = [
  { id: 'all', label: 'Todos', match: () => true },
  { id: 'albums', label: 'Álbumes', match: (release: Release) => release.type === 'album' },
  { id: 'singles', label: 'Sencillos y EP', match: (release: Release) => release.type === 'single' || release.type === 'ep' },
] as const

type FilterId = (typeof FILTERS)[number]['id']

type MusicGridProps = {
  releases: Release[]
  liveSession?: Release
  /** Whole published discography, including the release featured above. */
  total: number
}

export function MusicGrid({ releases, liveSession, total }: MusicGridProps) {
  const [expanded, setExpanded] = useState(false)
  const [filter, setFilter] = useState<FilterId>('all')
  const filters = FILTERS.map((f) => ({ ...f, count: releases.filter(f.match).length })).filter((f) => f.count > 0)
  const filtered = releases.filter(FILTERS.find((f) => f.id === filter)!.match)
  const visible = expanded ? filtered : filtered.slice(0, INITIAL_VISIBLE)
  const hidden = filtered.length - visible.length

  const selectFilter = (id: FilterId) => {
    setFilter(id)
    setExpanded(false)
  }
  const listRef = useRef<HTMLUListElement>(null)

  // The "Ver más" button unmounts on expand; hand focus to the first newly shown release instead of <body>.
  useEffect(() => {
    if (!expanded) return
    const item = listRef.current?.children[INITIAL_VISIBLE] as HTMLElement | undefined
    if (!item) return
    const link = item.querySelector<HTMLElement>('a')
    if (link) return link.focus()
    item.tabIndex = -1
    item.focus()
  }, [expanded])

  return (
    <section id="musica" aria-labelledby="musica-title" className="pt-4 pb-20 md:pb-32">
      <div className="shell">
        <SectionHeading id="musica-title" code="002" title="Música" aside={`${total} lanzamientos`} />

        {liveSession && <LiveSession release={liveSession} />}

        {filters.length > 2 && (
          <div role="group" aria-label="Filtrar discografía" className="mt-10 flex flex-wrap gap-2 md:mt-16">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={filter === f.id}
                aria-controls="discografia"
                className={button(filter === f.id ? 'primary' : 'ghost', 'sm')}
                onClick={() => selectFilter(f.id)}
              >
                {f.label}
                <span className="font-semibold opacity-60">{f.count}</span>
              </button>
            ))}
          </div>
        )}

        {releases.length > 0 && (
          <ul
            ref={listRef}
            id="discografia"
            className={`${filters.length > 2 ? 'mt-8' : 'mt-10 md:mt-16'} grid grid-cols-2 gap-x-4 gap-y-9 md:grid-cols-3 md:gap-x-8 md:gap-y-14`}
          >
            {visible.map((release, i) => (
              <Reveal as="li" key={release.id} delay={(i % 3) * 70}>
                <ReleaseTile release={release} />
              </Reveal>
            ))}
          </ul>
        )}

        <div className="mt-12 flex flex-col gap-3 border-t border-bone/15 pt-6 sm:flex-row sm:items-center sm:justify-between md:mt-16">
          {hidden > 0 ? (
            <button
              type="button"
              className={buttonGhost}
              aria-expanded={expanded}
              aria-controls="discografia"
              onClick={() => setExpanded(true)}
            >
              <Plus size={16} strokeWidth={2.25} aria-hidden="true" /> Ver {hidden} más
            </button>
          ) : (
            <span />
          )}
          <ExternalLink
            href={spotifyUrl}
            className="label inline-flex min-h-12 items-center gap-2 text-bone/85 transition-colors hover:text-accent"
          >
            Discografía completa en Spotify <ArrowUpRight size={14} aria-hidden="true" />
          </ExternalLink>
        </div>
      </div>
    </section>
  )
}

function ReleaseTile({ release }: { release: Release }) {
  const href = releaseUrl(release)
  const year = parseISODate(release.releaseDate).year

  const content = (
    <>
      <div className="overflow-hidden bg-surface">
        <img
          src={release.artwork}
          alt=""
          width={640}
          height={640}
          loading="lazy"
          decoding="async"
          className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-3 flex items-start justify-between gap-3 border-t border-bone/15 pt-3">
        <div className="min-w-0">
          <h3 className="font-display text-xl leading-[1.05] uppercase transition-colors group-hover:text-accent md:text-[1.75rem]">
            {release.title}
          </h3>
          <p className="label mt-1.5 text-ash">
            {releaseTypeLabel[release.type]} · {year}
          </p>
        </div>
        {href && (
          <ArrowUpRight
            size={18}
            aria-hidden="true"
            className="mt-0.5 shrink-0 text-ash transition-[color,transform] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
          />
        )}
      </div>
    </>
  )

  // Without any platform link the tile is plain content: no hover, no arrow, nothing to press.
  if (!href) return <div>{content}</div>

  return (
    <ExternalLink href={href} className="group block" aria-label={`${release.title}, ${releaseTypeLabel[release.type]} ${year}. Escuchar`}>
      {content}
    </ExternalLink>
  )
}

function LiveSession({ release }: { release: Release }) {
  return (
    <Reveal className="mt-10 grid gap-6 border border-bone/15 p-4 md:mt-16 md:grid-cols-12 md:items-center md:gap-10 md:p-6">
      <img
        src={release.artwork}
        alt={`Portada de ${release.title}`}
        width={640}
        height={640}
        loading="lazy"
        decoding="async"
        className="aspect-square w-full object-cover md:col-span-4"
      />
      <div className="md:col-span-8">
        <p className="label flex items-center gap-2 text-accent">
          <span className="size-2 rounded-full bg-accent" aria-hidden="true" /> En vivo · Sesión
        </p>
        <h3 className="mt-3 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] uppercase">{release.title}</h3>
        <p className="mt-3 text-bone/80">
          {release.tracks} temas grabados en vivo · {parseISODate(release.releaseDate).year}
        </p>
        <div className="mt-6">
          <ReleaseLinks release={release} prefer="YouTube" />
        </div>
      </div>
    </Reveal>
  )
}
