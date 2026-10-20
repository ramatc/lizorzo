import { ArrowUpRight, MapPin } from 'lucide-react'
import type { Show } from '../data/shows'
import { formatShowDate } from '../lib/dates'
import { button, buttonGhost, buttonPrimary } from './button'
import { CountryFlag } from './CountryFlag'
import { ExternalLink } from './ExternalLink'

export function TourDateRow({ show }: { show: Show }) {
  const date = formatShowDate(show.date)

  return (
    <li className="group relative -mx-5 px-5 transition-colors hover:bg-surface md:-mx-6 md:px-6">
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-accent transition-transform group-hover:scale-y-100"
      />
      <article
        aria-label={`${date.long}, ${show.venue}, ${show.city}`}
        className="grid grid-cols-[4.75rem_1fr] border-b border-bone/15 gap-x-4 gap-y-3 py-5 md:grid-cols-12 md:items-center md:gap-x-6 md:py-8"
      >
        <time
          dateTime={show.time ? `${show.date}T${show.time}` : show.date}
          className="row-span-2 flex flex-col md:col-span-2 md:row-span-1 md:flex-row md:items-end md:gap-3"
        >
          <span className="font-display text-[3.5rem] leading-[0.85] md:text-[5.5rem]">{date.day}</span>
          <span className="label mt-1.5 flex gap-1.5 md:mb-1.5 md:flex-col md:gap-1">
            <span className="text-bone">{date.month}</span>
            <span className="text-ash">{date.year}</span>
          </span>
        </time>

        <div className="min-w-0 md:col-span-5">
          <h3 className="font-display text-[1.75rem] leading-none uppercase md:text-[2.5rem]">
            {show.city}
          </h3>
          <p className="mt-1.5 text-[0.9375rem] text-bone/90">
            {show.venue}
            <span className="text-ash">
              {' · '}
              <CountryFlag code={show.countryCode} /> {show.country}
            </span>
          </p>
          {show.title && <p className="mt-1 text-sm text-ash">{show.title}</p>}
        </div>

        <div className="label hidden gap-2 text-ash md:col-span-2 md:flex md:flex-col">
          <p>
            {date.weekday}
            {show.time && <span className="text-bone"> · {show.time} HS</span>}
          </p>
          {show.locationUrl && (
            <p>
              <ExternalLink
                href={show.locationUrl}
                className="inline-flex items-center gap-1 transition-colors hover:text-accent"
                aria-label={`Cómo llegar a ${show.venue} (abre Google Maps)`}
              >
                <MapPin size={12} aria-hidden="true" /> Cómo llegar
              </ExternalLink>
            </p>
          )}
        </div>

        <div className="col-start-2 flex flex-wrap items-center gap-x-4 gap-y-2 md:col-span-3 md:col-start-auto md:flex-col md:items-end md:text-right">
          <p className="label text-ash md:hidden">
            {date.weekday}
            {show.time && <span className="text-bone"> · {show.time} HS</span>}
          </p>
          <TicketAction show={show} />
          {show.locationUrl && (
            <ExternalLink
              href={show.locationUrl}
              className="label inline-flex min-h-11 items-center gap-1 text-ash transition-colors hover:text-accent md:hidden"
              aria-label={`Cómo llegar a ${show.venue} (abre Google Maps)`}
            >
              <MapPin size={12} aria-hidden="true" /> Cómo llegar
            </ExternalLink>
          )}
        </div>
      </article>
    </li>
  )
}

/*
 * Non-interactive ticket status: plain text with a status dot (same pattern as the live session tag),
 * never a bordered box, so it can't be mistaken for a button.
 */
function StatusTag({ dot, className = '', children }: { dot: string; className?: string; children: string }) {
  return (
    <span className={`label inline-flex items-center gap-2 ${className}`}>
      <span className={`size-2 shrink-0 rounded-full ${dot}`} aria-hidden="true" />
      {children}
    </span>
  )
}

function TicketAction({ show }: { show: Show }) {
  const venueLabel = `${show.venue}, ${show.city}`

  if (show.status === 'sold_out') {
    return (
      <StatusTag dot="bg-ash" className="text-ash line-through decoration-accent decoration-2">
        Agotado
      </StatusTag>
    )
  }

  if (show.status === 'coming_soon') {
    return (
      <StatusTag dot="bg-bone/60" className="text-bone/80">
        Entradas próximamente
      </StatusTag>
    )
  }

  if (show.status === 'free') {
    return show.ticketUrl ? (
      <ExternalLink
        href={show.ticketUrl}
        className={button('accent')}
        aria-label={`Gratis: reservar lugar para ${venueLabel}`}
      >
        Gratis · Reservar <ArrowUpRight size={16} strokeWidth={2.25} aria-hidden="true" />
      </ExternalLink>
    ) : (
      <StatusTag dot="bg-accent" className="text-accent">
        Gratis
      </StatusTag>
    )
  }

  if (show.ticketUrl) {
    return (
      <ExternalLink
        href={show.ticketUrl}
        className={buttonPrimary}
        aria-label={`Comprar entradas para ${venueLabel}`}
      >
        Entradas <ArrowUpRight size={16} strokeWidth={2.25} aria-hidden="true" />
      </ExternalLink>
    )
  }

  return (
    <>
      {show.ticketInfo && <p className="max-w-64 text-sm leading-snug text-bone/85">{show.ticketInfo}</p>}
      {show.infoUrl && (
        <ExternalLink
          href={show.infoUrl}
          className={buttonGhost}
          aria-label={`Más info sobre entradas para ${venueLabel}`}
        >
          Más info <ArrowUpRight size={16} strokeWidth={2.25} aria-hidden="true" />
        </ExternalLink>
      )}
    </>
  )
}
