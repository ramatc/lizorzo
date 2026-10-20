import { ArrowUpRight, Mail } from 'lucide-react'
import { artist } from '../data/artist'
import type { Release } from '../data/releases'
import { parseISODate } from '../lib/dates'
import { buttonPrimary } from './button'
import { ExternalLink } from './ExternalLink'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function About({ releases }: { releases: Release[] }) {
  const { portrait } = artist.photos
  const first = releases.at(-1)

  const facts = [
    { label: 'Desde', value: artist.origin },
    first && {
      label: 'Primer lanzamiento',
      value: `${first.title}, ${parseISODate(first.releaseDate).year}`,
    },
    releases.length > 0 && { label: 'Discografía', value: `${releases.length} lanzamientos` },
  ].filter((fact): fact is { label: string; value: string } => Boolean(fact))

  return (
    <section id="sobre-mi" aria-labelledby="sobre-mi-title" className="pt-4 pb-20 md:pb-32">
      <div className="shell">
        <SectionHeading id="sobre-mi-title" title="Sobre mí" />

        <div className="mt-8 grid gap-10 md:mt-14 md:grid-cols-12 md:gap-12">
          <Reveal className="md:col-span-5">
            <figure>
              <img
                src={portrait.src}
                alt={portrait.alt}
                width={portrait.width}
                height={portrait.height}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full object-cover object-[40%_50%] contrast-[1.08]"
              />
              <figcaption className="label mt-3 flex justify-between text-ash">
                <span>Archivo</span>
                <span>B/N</span>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal className="flex flex-col md:col-span-7" delay={120}>
            <figure>
              <blockquote className="font-display text-[clamp(2rem,4.2vw,3.75rem)] leading-[0.98] uppercase">
                <span className="text-accent" aria-hidden="true">“</span>
                {artist.quote}
                <span className="text-accent" aria-hidden="true">”</span>
              </blockquote>
              <figcaption className="label mt-4 text-ash">— {artist.name}</figcaption>
            </figure>

            {artist.bio.length > 0 ? (
              <div className="mt-8 max-w-xl space-y-4 text-[1.0625rem] leading-relaxed text-bone/85">
                {artist.bio.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            ) : (
              import.meta.env.DEV && (
                <p className="mt-8 max-w-xl border border-dashed border-accent/60 p-4 text-sm text-accent">
                  [Placeholder] Biografía oficial pendiente. Editá <code>bio</code> en src/data/artist.ts.
                  Este aviso solo se ve en desarrollo.
                </p>
              )
            )}

            <dl className="mt-10 grid grid-cols-2 border-t border-bone/15 md:grid-cols-3">
              {facts.map((fact) => (
                <div key={fact.label} className="border-b border-bone/15 py-4 pr-4">
                  <dt className="label text-ash">{fact.label}</dt>
                  <dd className="mt-1.5 font-semibold">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <div id="contacto" className="mt-auto pt-10">
              <h3 className="label text-ash">{artist.copy.contactTitle}</h3>
              <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
                {/* An address is data, not a label: keep its real casing and spacing. */}
                <a href={`mailto:${artist.email}`} className={`${buttonPrimary} self-start tracking-normal normal-case`}>
                  <Mail size={16} strokeWidth={2.25} aria-hidden="true" /> {artist.email}
                </a>
                <p className="text-sm text-bone/80">
                  Management{' '}
                  <ExternalLink
                    href={artist.management.url}
                    className="inline-flex items-center gap-0.5 font-semibold text-bone underline decoration-accent decoration-2 underline-offset-4 hover:text-accent"
                  >
                    {artist.management.handle}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </ExternalLink>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
