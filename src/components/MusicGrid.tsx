import { ArrowUpRight, Plus } from 'lucide-react'
import { useState } from 'react'
import { spotifyUrl } from '../data/artist'
import { releaseTypeLabel, type Release } from '../data/releases'
import { parseISODate } from '../lib/dates'
import { ExternalLink, buttonGhost } from './ExternalLink'
import { ReleaseLinks } from './LatestRelease'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

const INITIAL_VISIBLE = 9

type MusicGridProps = {
  releases: Release[]
  liveSession?: Release
}

export function MusicGrid({ releases, liveSession }: MusicGridProps) {
  const [expanded, setExpanded] = useState(false)
  const visible = expanded ? releases : releases.slice(0, INITIAL_VISIBLE)
  const hidden = releases.length - visible.length

  return (
    <section id="musica" aria-labelledby="musica-title" className="scroll-mt-16 pt-4 pb-20 md:pb-32">
      <div className="shell">
        <SectionHeading
          id="musica-title"
          index="04"
          title="Música"
          aside={`${releases.length + (liveSession ? 1 : 0)} lanzamientos`}
        />

        {liveSession && <LiveSession release={liveSession} />}

        {releases.length > 0 && (
          <ul id="discografia" className="mt-10 grid grid-cols-2 gap-x-4 gap-y-9 md:mt-16 md:grid-cols-3 md:gap-x-8 md:gap-y-14">
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
              <Plus size={16} aria-hidden="true" /> Ver {hidden} más
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
  const href = release.spotifyUrl ?? release.youtubeUrl
  const year = parseISODate(release.releaseDate).year

  return (
    <ExternalLink href={href} className="group block" aria-label={`${release.title}, ${releaseTypeLabel[release.type]} ${year}. Escuchar`}>
      <div className="overflow-hidden bg-surface">
        <img
          src={release.artwork}
          alt=""
          width={640}
          height={640}
          loading="lazy"
          decoding="async"
          className="aspect-square w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
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
        <ArrowUpRight
          size={18}
          aria-hidden="true"
          className="mt-0.5 shrink-0 text-ash transition-[color,transform] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
        />
      </div>
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
