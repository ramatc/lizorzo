/**
 * Lanzamientos / discografía.
 *
 * CÓMO SUMAR UN LANZAMIENTO
 * 1. Guardá la portada cuadrada (idealmente 640×640, .webp o .jpg) en
 *    src/assets/releases/ e importala abajo.
 * 2. Agregá un objeto al array `releases` con su `releaseDate` (AAAA-MM-DD).
 * 3. Listo: el más reciente que ya haya salido se muestra solo en "LO ÚLTIMO".
 *    Un lanzamiento con fecha futura NO aparece hasta que llegue su día.
 *
 * Datos verificados en open.spotify.com/artist/1GslhHWyB0ut5egxkQpnRI.
 */

import alamo from '../assets/releases/alamo.webp'
import cientoTres from '../assets/releases/ciento-tres.webp'
import contandoPasos from '../assets/releases/contando-pasos.webp'
import deATres from '../assets/releases/de-a-tres.webp'
import drumlessDeVerano from '../assets/releases/drumless-de-verano.webp'
import enEsa from '../assets/releases/en-esa.webp'
import gmail from '../assets/releases/gmail.webp'
import instrumentalesVol2 from '../assets/releases/instrumentales-vol-2.webp'
import onceMil from '../assets/releases/once-458.webp'
import paiSaje from '../assets/releases/pai-saje.webp'
import palabrasInfinitas from '../assets/releases/palabras-infinitas.webp'
import provecho from '../assets/releases/provecho.webp'
import quePinta from '../assets/releases/que-pinta.webp'
import sinopsis from '../assets/releases/sinopsis.webp'
import sinopsisDeluxe from '../assets/releases/sinopsis-deluxe.webp'
import tardeDeSession from '../assets/releases/tarde-de-session.webp'
import worldwide from '../assets/releases/worldwide.webp'

export type ReleaseType = 'album' | 'ep' | 'single' | 'live_session'

export const releaseTypeLabel: Record<ReleaseType, string> = {
  album: 'Álbum',
  ep: 'EP',
  single: 'Single',
  live_session: 'Sesión en vivo',
}

export type ReleaseLink = { label: string; url: string }

export type Release = {
  id: string
  title: string
  type: ReleaseType
  /** YYYY-MM-DD */
  releaseDate: string
  artwork: string
  tracks?: number
  spotifyUrl?: string
  youtubeUrl?: string
  otherLinks?: ReleaseLink[]
}

const spotifyAlbum = (id: string) => `https://open.spotify.com/album/${id}`

export const releases: Release[] = [
  {
    id: 'palabras-infinitas',
    title: 'Palabras Infinitas',
    type: 'ep',
    releaseDate: '2026-09-25',
    artwork: palabrasInfinitas,
    tracks: 5,
    spotifyUrl: spotifyAlbum('3u8i8KkPQY7hmXrWHncdLZ'),
  },
  {
    id: 'alamo',
    title: 'Álamo',
    type: 'single',
    releaseDate: '2026-09-14',
    artwork: alamo,
    spotifyUrl: spotifyAlbum('4ImvzHkU7PnmwvzhMFLP7w'),
  },
  {
    id: 'que-pinta',
    title: '¿Qué Pinta? (Freestyle)',
    type: 'single',
    releaseDate: '2026-07-17',
    artwork: quePinta,
    spotifyUrl: spotifyAlbum('3gAjK6EA1Zms2D9HdYxDU5'),
  },
  {
    id: 'provecho',
    title: 'Provecho',
    type: 'single',
    releaseDate: '2026-07-17',
    artwork: provecho,
    spotifyUrl: spotifyAlbum('7xPSu6qi2nAr0XCG6myzvw'),
  },
  {
    id: 'de-a-tres',
    title: 'De a Tres',
    type: 'single',
    releaseDate: '2026-06-19',
    artwork: deATres,
    spotifyUrl: spotifyAlbum('3SAz6IVYV22mmXmqH7ViLA'),
  },
  {
    id: 'gmail',
    title: 'Gmail',
    type: 'single',
    releaseDate: '2026-05-15',
    artwork: gmail,
    spotifyUrl: spotifyAlbum('4zKJfZImn5T9lFy3OwsFR5'),
  },
  {
    id: 'pai-saje',
    title: 'Pai-Saje',
    type: 'single',
    releaseDate: '2026-04-17',
    artwork: paiSaje,
    spotifyUrl: spotifyAlbum('4LwU7GonjPwRpYXfD4IfwX'),
  },
  {
    id: 'tarde-de-session',
    title: 'Tarde de Session',
    type: 'live_session',
    releaseDate: '2026-03-27',
    artwork: tardeDeSession,
    tracks: 3,
    spotifyUrl: spotifyAlbum('6cJxbIA0gM3NV7YTPbPN7I'),
    youtubeUrl: 'https://www.youtube.com/watch?v=dOEp-0yUP8A',
  },
  {
    id: 'en-esa',
    title: 'En Esa (Complete Edition)',
    type: 'album',
    releaseDate: '2025-12-12',
    artwork: enEsa,
    tracks: 13,
    spotifyUrl: spotifyAlbum('0As6k2D5x8bGQ0GJwQp66P'),
  },
  {
    id: '11458',
    title: '11.458',
    type: 'single',
    releaseDate: '2025-03-21',
    artwork: onceMil,
    tracks: 3,
    spotifyUrl: spotifyAlbum('5JhmIXdEAdSpHJAu3wafMt'),
  },
  {
    id: 'instrumentales-vol-2',
    title: 'Instrumentales Vol. 2',
    type: 'album',
    releaseDate: '2024-12-30',
    artwork: instrumentalesVol2,
    tracks: 14,
    spotifyUrl: spotifyAlbum('48VuU8C5EJKUP6Ypzfpaz9'),
  },
  {
    id: 'drumless-de-verano',
    title: 'Drumless de Verano',
    type: 'ep',
    releaseDate: '2024-12-20',
    artwork: drumlessDeVerano,
    tracks: 5,
    spotifyUrl: spotifyAlbum('4IPe8XWv5hcobNCkfiZ2Oh'),
  },
  {
    id: 'sinopsis-deluxe',
    title: 'Sinopsis (Deluxe)',
    type: 'album',
    releaseDate: '2024-10-04',
    artwork: sinopsisDeluxe,
    tracks: 11,
    spotifyUrl: spotifyAlbum('74zohVh1UDy4zqWJmgYb1Z'),
  },
  {
    id: 'sinopsis',
    title: 'Sinopsis',
    type: 'album',
    releaseDate: '2024-05-04',
    artwork: sinopsis,
    tracks: 9,
    spotifyUrl: spotifyAlbum('2cYcUSKZD0J1ZHj8cP9DsY'),
  },
  {
    id: '103',
    title: '103',
    type: 'single',
    releaseDate: '2023-11-01',
    artwork: cientoTres,
    spotifyUrl: spotifyAlbum('5ocjhVDOVoxUen3nPZIYGd'),
  },
  {
    id: 'contando-pasos',
    title: 'Contando Pasos',
    type: 'single',
    releaseDate: '2023-09-14',
    artwork: contandoPasos,
    spotifyUrl: spotifyAlbum('08VeQfmolbzS4FgycvPpGe'),
  },
  {
    id: 'worldwide',
    title: 'Worldwide',
    type: 'album',
    releaseDate: '2022-09-16',
    artwork: worldwide,
    tracks: 8,
    spotifyUrl: spotifyAlbum('4p5YLYy1BC1CgZP18ODh3c'),
  },
]
