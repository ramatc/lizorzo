import type { Release } from '../data/releases'
import type { Show } from '../data/shows'

// All dates are handled as plain YYYY-MM-DD calendar strings. Nothing is parsed
// through `new Date('YYYY-MM-DD')`, which is UTC and can shift the day.

const MONTHS_SHORT = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC']
const MONTHS_LONG = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
]
const WEEKDAYS_SHORT = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB']
const WEEKDAYS_LONG = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']

const pad = (n: number) => String(n).padStart(2, '0')

/** Today's date in the visitor's local calendar, as YYYY-MM-DD. */
export function todayISO(now: Date = new Date()): string {
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
}

export function parseISODate(iso: string) {
  const [year, month, day] = iso.split('-').map(Number)
  // Weekday of a pure calendar date: computed in UTC so no offset applies.
  const weekday = new Date(Date.UTC(year, month - 1, day)).getUTCDay()
  return { year, month, day, weekday }
}

export function formatShowDate(iso: string) {
  const { year, month, day, weekday } = parseISODate(iso)
  return {
    day: pad(day),
    month: MONTHS_SHORT[month - 1],
    year: String(year),
    weekday: WEEKDAYS_SHORT[weekday],
    /** Full spoken date for screen readers, e.g. "sábado 31 de octubre de 2026". */
    long: `${WEEKDAYS_LONG[weekday]} ${day} de ${MONTHS_LONG[month - 1]} de ${year}`,
    /** Compact "31.10" form. */
    compact: `${pad(day)}.${pad(month)}`,
  }
}

export function formatReleaseDate(iso: string) {
  const { year, month, day } = parseISODate(iso)
  return `${day} ${MONTHS_SHORT[month - 1]} ${year}`
}

/** Shows from today onwards, soonest first. */
export function getUpcomingShows(shows: Show[], today: string = todayISO()): Show[] {
  return shows
    .filter((show) => show.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date) || (a.time ?? '').localeCompare(b.time ?? ''))
}

/** Published releases (release date today or earlier), newest first. */
export function getPublishedReleases(releases: Release[], today: string = todayISO()): Release[] {
  return releases
    .filter((release) => release.releaseDate <= today)
    .sort((a, b) => b.releaseDate.localeCompare(a.releaseDate))
}

export function getLatestRelease(releases: Release[], today?: string): Release | undefined {
  return getPublishedReleases(releases, today)[0]
}
