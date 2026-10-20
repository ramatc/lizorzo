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

import adrenalina from '../assets/releases/adrenalina.webp'
import ahiVamos from '../assets/releases/ahi-vamos.webp'
import alamo from '../assets/releases/alamo.webp'
import allIn from '../assets/releases/all-in.webp'
import bajoBarras from '../assets/releases/bajo-barras.webp'
import barrasYFiesta from '../assets/releases/barras-y-fiesta.webp'
import blessed from '../assets/releases/blessed.webp'
import cientoTres from '../assets/releases/ciento-tres.webp'
import clasico from '../assets/releases/clasico.webp'
import contandoPasos from '../assets/releases/contando-pasos.webp'
import deATres from '../assets/releases/de-a-tres.webp'
import drumlessDeVerano from '../assets/releases/drumless-de-verano.webp'
import enEsa30 from '../assets/releases/en-esa-30.webp'
import enEsa from '../assets/releases/en-esa.webp'
import entreTantoRuido from '../assets/releases/entre-tanto-ruido.webp'
import exotico from '../assets/releases/exotico.webp'
import freddieGibbs from '../assets/releases/freddie-gibbs.webp'
import freestyle23 from '../assets/releases/freestyle-23.webp'
import fresco from '../assets/releases/fresco.webp'
import gmail from '../assets/releases/gmail.webp'
import instrumentalesVol2 from '../assets/releases/instrumentales-vol-2.webp'
import laVedera from '../assets/releases/la-vedera.webp'
import lagrimasDeOro from '../assets/releases/lagrimas-de-oro.webp'
import limites from '../assets/releases/limites.webp'
import noSe from '../assets/releases/no-se.webp'
import onceMil from '../assets/releases/once-458.webp'
import paganini from '../assets/releases/paganini.webp'
import paiSaje from '../assets/releases/pai-saje.webp'
import palabrasInfinitas from '../assets/releases/palabras-infinitas.webp'
import presente from '../assets/releases/presente.webp'
import principiosDeUnPrincipe from '../assets/releases/principios-de-un-principe.webp'
import provecho from '../assets/releases/provecho.webp'
import quePinta from '../assets/releases/que-pinta.webp'
import razon from '../assets/releases/razon.webp'
import roma from '../assets/releases/roma.webp'
import sinopsisDeluxe from '../assets/releases/sinopsis-deluxe.webp'
import sinopsis from '../assets/releases/sinopsis.webp'
import sydneySweeney from '../assets/releases/sydney-sweeney.webp'
import tardeDeSession from '../assets/releases/tarde-de-session.webp'
import unaVezMas from '../assets/releases/una-vez-mas.webp'
import viajes from '../assets/releases/viajes.webp'
import worldwide from '../assets/releases/worldwide.webp'
import zondaYHuayra from '../assets/releases/zonda-y-huayra.webp'

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
    id: 'limites',
    title: 'Límites',
    type: 'single',
    releaseDate: '2026-03-13',
    artwork: limites,
    spotifyUrl: spotifyAlbum('4eg8uSwMaNfxzkTFEvcQlr'),
  },
  {
    id: 'zonda-y-huayra',
    title: 'Zonda & Huayra',
    type: 'ep',
    releaseDate: '2026-02-20',
    artwork: zondaYHuayra,
    tracks: 6,
    spotifyUrl: spotifyAlbum('5mPuOKyiOOMq38PrM1V49J'),
  },
  {
    id: 'lagrimas-de-oro',
    title: 'Lágrimas de Oro',
    type: 'single',
    releaseDate: '2026-01-30',
    artwork: lagrimasDeOro,
    spotifyUrl: spotifyAlbum('37ovB6UYprgmZ1ApK3MyuA'),
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
    id: 'sydney-sweeney',
    title: 'Sydney Sweeney',
    type: 'single',
    releaseDate: '2025-11-28',
    artwork: sydneySweeney,
    spotifyUrl: spotifyAlbum('2XaX6ETOI5ckA00pvuGcNT'),
  },
  {
    id: 'roma',
    title: 'ROMA',
    type: 'single',
    releaseDate: '2025-10-18',
    artwork: roma,
    spotifyUrl: spotifyAlbum('0wS07feQYUwZSnnlLbDO5C'),
  },
  {
    id: 'en-esa-30',
    title: 'En Esa (30%)',
    type: 'ep',
    releaseDate: '2025-09-26',
    artwork: enEsa30,
    tracks: 5,
    spotifyUrl: spotifyAlbum('2K5fMfjthuLxwCNb8vEvKZ'),
  },
  {
    id: 'freddie-gibbs',
    title: 'Freddie Gibbs',
    type: 'single',
    releaseDate: '2025-08-22',
    artwork: freddieGibbs,
    spotifyUrl: spotifyAlbum('2eUBulHO4wdfwBmhAGMMCh'),
  },
  {
    id: 'principios-de-un-principe',
    title: 'Principios de un Príncipe',
    type: 'single',
    releaseDate: '2025-07-19',
    artwork: principiosDeUnPrincipe,
    spotifyUrl: spotifyAlbum('24X82PbV6HqFd8bSxesXOa'),
  },
  {
    id: 'exotico',
    title: 'Exótico',
    type: 'single',
    releaseDate: '2025-05-30',
    artwork: exotico,
    spotifyUrl: spotifyAlbum('41CLNsE2nPCZmfiL5nCoJY'),
  },
  {
    id: 'no-se',
    title: 'No Sé',
    type: 'single',
    releaseDate: '2025-05-09',
    artwork: noSe,
    spotifyUrl: spotifyAlbum('7MYjcxN2yrvMqDilzJMR6X'),
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
    id: 'razon',
    title: 'Razón',
    type: 'single',
    releaseDate: '2025-01-31',
    artwork: razon,
    spotifyUrl: spotifyAlbum('5uvmm27dBUDcG8QwQi1shl'),
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
    id: 'ahi-vamos',
    title: 'AHÍ VAMOS',
    type: 'single',
    releaseDate: '2024-10-17',
    artwork: ahiVamos,
    spotifyUrl: spotifyAlbum('1naChwjZtA5Zg8DQU43o6m'),
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
    id: 'paganini',
    title: 'Paganini',
    type: 'single',
    releaseDate: '2024-07-16',
    artwork: paganini,
    spotifyUrl: spotifyAlbum('4HQn3wZUze4BhDyMAcaK22'),
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
    id: 'freestyle-23',
    title: 'Freestyle 23',
    type: 'single',
    releaseDate: '2024-01-27',
    artwork: freestyle23,
    spotifyUrl: spotifyAlbum('0E9YkFMydec0bJFKqw9YbV'),
  },
  {
    id: 'la-vedera',
    title: 'La Vedera',
    type: 'single',
    releaseDate: '2024-01-18',
    artwork: laVedera,
    spotifyUrl: spotifyAlbum('68UzoqWhfo6qF79tn5hBAY'),
  },
  {
    id: 'entre-tanto-ruido',
    title: 'Entre Tanto Ruido',
    type: 'single',
    releaseDate: '2023-11-30',
    artwork: entreTantoRuido,
    spotifyUrl: spotifyAlbum('1KBRo7cpqwHgW5asfjNLHd'),
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
    id: 'all-in',
    title: 'All In',
    type: 'single',
    releaseDate: '2023-10-14',
    artwork: allIn,
    spotifyUrl: spotifyAlbum('7qdXbW38ywzNSJ6oJa6G5e'),
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
    id: 'una-vez-mas',
    title: 'Una Vez Más',
    type: 'single',
    releaseDate: '2023-08-23',
    artwork: unaVezMas,
    spotifyUrl: spotifyAlbum('3TeHzefLBVJ68SHxj9kTwh'),
  },
  {
    id: 'bajo-barras',
    title: 'Bajo Barras',
    type: 'single',
    releaseDate: '2023-08-10',
    artwork: bajoBarras,
    spotifyUrl: spotifyAlbum('3i0radMfJu0OgTxBp80NY1'),
  },
  {
    id: 'presente',
    title: 'Presente',
    type: 'single',
    releaseDate: '2023-07-23',
    artwork: presente,
    spotifyUrl: spotifyAlbum('2G8meloTYCTuAUkmKlZB8v'),
  },
  {
    id: 'viajes',
    title: 'Viajes',
    type: 'ep',
    releaseDate: '2023-05-25',
    artwork: viajes,
    tracks: 4,
    spotifyUrl: spotifyAlbum('2zkkSGlb5IVWfGaXxyRj4t'),
  },
  {
    id: 'fresco',
    title: 'Fresco',
    type: 'single',
    releaseDate: '2023-03-19',
    artwork: fresco,
    spotifyUrl: spotifyAlbum('78c2nMjYiabinypsIsrsZR'),
  },
  {
    id: 'adrenalina',
    title: 'Adrenalina',
    type: 'single',
    releaseDate: '2023-02-09',
    artwork: adrenalina,
    spotifyUrl: spotifyAlbum('2pWIulPuofonHvicyUqVan'),
  },
  {
    id: 'barras-y-fiesta',
    title: 'Barras y Fiesta',
    type: 'single',
    releaseDate: '2023-01-12',
    artwork: barrasYFiesta,
    spotifyUrl: spotifyAlbum('5AgVNj7vMjrNbyyfylYNmk'),
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
  {
    id: 'clasico',
    title: 'Clásico',
    type: 'single',
    releaseDate: '2022-07-17',
    artwork: clasico,
    spotifyUrl: spotifyAlbum('0FH8yR2IO9jLxtCEjbtyz3'),
  },
  {
    id: 'blessed',
    title: 'Blessed',
    type: 'single',
    releaseDate: '2019-04-19',
    artwork: blessed,
    spotifyUrl: spotifyAlbum('6mAaSzHfq5eZmhFYYTKftD'),
  },
]
