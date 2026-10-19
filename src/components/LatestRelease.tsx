import { ArrowUpRight } from 'lucide-react'
import { releaseTypeLabel, type Release, type ReleaseLink } from '../data/releases'
import { formatReleaseDate } from '../lib/dates'
import { ExternalLink, buttonGhost, buttonPrimary } from './ExternalLink'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

type ReleaseLinksProps = {
  release: Release
  /** Platform label to show first as the primary button. */
  prefer?: string
}

/** Every available platform link for a release; missing links are never rendered. */
export function ReleaseLinks({ release, prefer }: ReleaseLinksProps) {
  const links = [
    release.spotifyUrl && { label: 'Spotify', url: release.spotifyUrl },
    release.youtubeUrl && { label: 'YouTube', url: release.youtubeUrl },
    ...(release.otherLinks ?? []),
  ]
    .filter((link): link is ReleaseLink => Boolean(link))
    .sort((a, b) => Number(b.label === prefer) - Number(a.label === prefer))

  return (
    <div className="flex flex-wrap gap-3">
      {links.map((link, i) => (
        <ExternalLink
          key={link.url}
          href={link.url}
          className={i === 0 ? buttonPrimary : buttonGhost}
          aria-label={`${link.label === 'YouTube' ? 'Ver' : 'Escuchar'} ${release.title} en ${link.label}`}
        >
          {i === 0 ? `${link.label === 'YouTube' ? 'Ver' : 'Escuchar'} en ${link.label}` : link.label}
          <ArrowUpRight size={16} strokeWidth={2.25} aria-hidden="true" />
        </ExternalLink>
      ))}
    </div>
  )
}

export function LatestRelease({ release }: { release?: Release }) {
  if (!release) return null

  const meta = [
    releaseTypeLabel[release.type],
    release.tracks && `${release.tracks} ${release.tracks === 1 ? 'tema' : 'temas'}`,
  ].filter(Boolean)

  return (
    <section
      id="lo-ultimo"
      aria-labelledby="lo-ultimo-title"
      className="relative scroll-mt-16 overflow-hidden bg-surface py-4 pb-20 md:pb-28"
    >
      <div className="shell">
        <SectionHeading id="lo-ultimo-title" index="03" title="Lo último" aside="Nuevo lanzamiento" />

        <div className="mt-8 grid gap-8 md:mt-14 md:grid-cols-12 md:items-end md:gap-12">
          <Reveal className="md:col-span-7">
            <ExternalLink
              href={release.spotifyUrl ?? release.youtubeUrl}
              className="group block overflow-hidden bg-ink"
              aria-label={`Abrir ${release.title}`}
            >
              <img
                src={release.artwork}
                alt={`Portada de ${release.title}`}
                width={640}
                height={640}
                loading="lazy"
                decoding="async"
                className="aspect-square w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
              />
            </ExternalLink>
          </Reveal>

          <Reveal className="md:col-span-5 md:pb-2" delay={120}>
            <p className="label flex flex-wrap items-center gap-x-3 gap-y-1 text-ash">
              {meta.map((item) => (
                <span key={item as string} className="after:ml-3 after:text-accent after:content-['/'] last:after:content-none">
                  {item}
                </span>
              ))}
            </p>
            <h3 className="mt-4 font-display text-[clamp(3rem,8.5vw,7rem)] leading-[0.86] uppercase">
              {release.title}
            </h3>
            <p className="mt-6 flex items-baseline gap-3 border-t border-bone/15 pt-4">
              <span className="label text-ash">Salió el</span>
              <time dateTime={release.releaseDate} className="font-display text-2xl leading-none uppercase">
                {formatReleaseDate(release.releaseDate)}
              </time>
            </p>
            <div className="mt-8">
              <ReleaseLinks release={release} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
