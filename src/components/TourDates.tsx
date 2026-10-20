import { ArrowUpRight } from 'lucide-react'
import { artist, instagram } from '../data/artist'
import type { Show } from '../data/shows'
import { buttonGhost } from './button'
import { ExternalLink } from './ExternalLink'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { TourDateRow } from './TourDateRow'

export function TourDates({ shows }: { shows: Show[] }) {
  const count = shows.length
  return (
    <section aria-labelledby="fechas-title" className="pt-4 pb-20 md:pb-32" id="fechas">
      <div className="shell">
        <SectionHeading
          id="fechas-title"
          code="001"
          title="Próximas fechas"
          aside={count > 0 ? `${count} ${count === 1 ? 'fecha' : 'fechas'}` : undefined}
        />

        {count > 0 ? (
          <Reveal as="ol" className="mt-8 border-t border-bone/15 md:mt-14" delay={80}>
            {shows.map((show) => (
              <TourDateRow key={show.id} show={show} />
            ))}
          </Reveal>
        ) : (
          <EmptyState />
        )}
      </div>
    </section>
  )
}

function EmptyState() {
  return (
    <Reveal className="mt-8 border-y border-bone/15 py-12 md:mt-14 md:py-20">
      <p
        className="font-display text-[clamp(2.5rem,8vw,6.5rem)] leading-[0.9] text-transparent uppercase [-webkit-text-stroke:1.5px_var(--color-bone)]"
      >
        {artist.copy.emptyShowsTitle}
      </p>
      <div className="mt-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <p className="max-w-md text-bone/80">{artist.copy.emptyShowsText}</p>
        <ExternalLink href={instagram.url} className={buttonGhost}>
          {instagram.handle} <ArrowUpRight size={16} strokeWidth={2.25} aria-hidden="true" />
        </ExternalLink>
      </div>
    </Reveal>
  )
}
