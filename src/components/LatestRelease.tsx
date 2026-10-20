import { releaseTypeLabel, type Release } from '../data/releases'
import { formatReleaseDate } from '../lib/dates'
import { ExternalLink } from './ExternalLink'
import { ReleaseLinks, releaseUrl } from './ReleaseLinks'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function LatestRelease({ release }: { release?: Release }) {
  if (!release) return null

  const href = releaseUrl(release)
  const artwork = (
    <img
      src={release.artwork}
      alt={`Portada de ${release.title}`}
      width={640}
      height={640}
      loading="lazy"
      decoding="async"
      className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
    />
  )

  const meta = [
    releaseTypeLabel[release.type],
    release.tracks && `${release.tracks} ${release.tracks === 1 ? 'tema' : 'temas'}`,
  ].filter(Boolean)

  return (
    <section
      id="lo-ultimo"
      aria-labelledby="lo-ultimo-title"
      className="relative overflow-hidden bg-surface pt-4 pb-20 md:pb-32"
    >
      <div className="shell">
        <SectionHeading id="lo-ultimo-title" title="Lo último" aside="Nuevo lanzamiento" />

        <div className="mt-8 grid gap-8 md:mt-14 md:grid-cols-12 md:items-end md:gap-12">
          <Reveal className="md:col-span-7">
            {href ? (
              <ExternalLink href={href} className="group block overflow-hidden bg-ink" aria-label={`Abrir ${release.title}`}>
                {artwork}
              </ExternalLink>
            ) : (
              <div className="overflow-hidden bg-ink">{artwork}</div>
            )}
          </Reveal>

          <Reveal className="md:col-span-5 md:pb-2" delay={120}>
            <p className="label flex flex-wrap items-center gap-x-3 gap-y-1 text-ash">
              {meta.map((item) => (
                <span key={item as string} className="after:ml-3 after:text-accent after:content-['/'] last:after:content-none">
                  {item}
                </span>
              ))}
            </p>
            <h3 className="mt-4 font-display text-display-lg text-balance uppercase">
              {release.title}
            </h3>
            <p className="mt-6 flex items-baseline gap-3 border-t border-bone/15 pt-4">
              <span className="label text-ash">Salió el</span>
              <time dateTime={release.releaseDate} className="font-mono text-base font-medium tracking-[0.04em] text-bone uppercase tabular-nums">
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
