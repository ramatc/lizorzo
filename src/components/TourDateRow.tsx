import { ArrowUpRight, MapPin } from 'lucide-react'
import type { Show } from '../data/shows'
import { formatShowDate } from '../lib/dates'
import { ExternalLink } from './ExternalLink'

export function TourDateRow({ show }: { show: Show }) {
  const date = formatShowDate(show.date)

  return (
    <li className="group relative -mx-5 px-5 transition-colors duration-300 hover:bg-surface md:-mx-6 md:px-6">
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-y-100"
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
          <p className="mt-1.5 text-[0.9375rem] font-medium text-bone/90">
            {show.venue}
            <span className="text-ash"> · {show.country}</span>
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
              className="label inline-flex items-center gap-1 text-ash transition-colors hover:text-accent md:hidden"
              aria-label={`Cómo llegar a ${show.venue} (abre Google Maps)`}
            >
              <MapPin size={12} aria-hidden="true" /> Mapa
            </ExternalLink>
          )}
        </div>
      </article>
    </li>
  )
}

const statusTag = 'label inline-flex min-h-11 items-center px-4 border'

function TicketAction({ show }: { show: Show }) {
  const venueLabel = `${show.venue}, ${show.city}`

  if (show.status === 'sold_out') {
    return (
      <span className={`${statusTag} border-bone/20 text-ash line-through decoration-accent decoration-2`}>
        Agotado
      </span>
    )
  }

  if (show.status === 'coming_soon') {
    return <span className={`${statusTag} border-bone/25 text-bone/80`}>Entradas próximamente</span>
  }

  if (show.status === 'free') {
    return show.ticketUrl ? (
      <ExternalLink
        href={show.ticketUrl}
        className={`${statusTag} gap-2 border-accent text-accent transition-colors hover:bg-accent hover:text-ink`}
        aria-label={`Gratis: reservar lugar para ${venueLabel}`}
      >
        Gratis · Reservar <ArrowUpRight size={14} aria-hidden="true" />
      </ExternalLink>
    ) : (
      <span className={`${statusTag} border-accent text-accent`}>Gratis</span>
    )
  }

  if (show.ticketUrl) {
    return (
      <ExternalLink
        href={show.ticketUrl}
        className="inline-flex min-h-11 items-center gap-2 bg-accent px-5 text-[0.8125rem] font-bold tracking-[0.12em] text-ink uppercase transition-colors duration-200 hover:bg-bone active:scale-[0.98]"
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
          className={`${statusTag} gap-2 border-bone/40 text-bone transition-colors hover:border-bone hover:bg-bone hover:text-ink`}
          aria-label={`Más info sobre entradas para ${venueLabel}`}
        >
          Más info <ArrowUpRight size={14} aria-hidden="true" />
        </ExternalLink>
      )}
    </>
  )
}
