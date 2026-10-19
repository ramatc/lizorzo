/**
 * Datos del artista: textos, fotos, redes y contacto.
 * Todo lo editable vive acá; los componentes no tienen URLs ni textos sueltos.
 *
 * CÓMO CAMBIAR UNA FOTO
 * Reemplazá el archivo en src/assets/photos/ (mismo nombre) o importá uno nuevo
 * abajo y actualizá `width`/`height` con sus medidas reales (evita saltos de layout).
 */

import heroLarge from '../assets/photos/live-01-1800.webp'
import heroSmall from '../assets/photos/live-01-960.webp'
import portrait from '../assets/photos/portrait-bw-960.webp'

export type SocialLink = { label: string; handle?: string; url: string }

export const artist = {
  name: 'Lizorzo',

  /** Own words, from the official Spotify bio ("Publicado por Lizorzo"). */
  quote: 'Letras, sentimientos y energías diferentes son lo que aportan mis barras a tu auricular.',

  origin: 'Villa Luro, Buenos Aires',

  /**
   * Biografía oficial (perfil verificado de Spotify, publicada por el artista).
   * Si queda vacío, la sección muestra solo la cita y los datos verificados.
   */
  bio: [
    'Conectando con su público desde la autenticidad, Lizorzo fusiona introspección, fuerza y sensibilidad en cada tema.',
    '“En Esa” presenta un concepto único que transporta al oyente a una atmósfera distinta. Discos anteriores como Sinopsis (Deluxe), 103, Contando Pasos, Entre Tanto Ruido, 11.458 y Drumless de Verano consolidaron su identidad, con canciones como “103” alcanzando millones de reproducciones.',
    'En vivo, Lizorzo lleva su música a otro nivel, reinterpretando sus instrumentales en formatos jazz, blues y distintos géneros, generando sensaciones únicas e inolvidables.',
  ] as string[],

  email: 'ldegraziatopa@gmail.com',

  management: {
    handle: '@lunidgt',
    url: 'https://www.instagram.com/lunidgt/',
  },

  photos: {
    hero: {
      src: heroLarge,
      srcSmall: heroSmall,
      width: 1800,
      height: 1800,
      alt: 'Lizorzo en vivo, micrófono en mano, señalando al público bajo una luz roja.',
    },
    portrait: {
      src: portrait,
      width: 960,
      height: 960,
      alt: 'Lizorzo cantando de perfil en un escenario, en blanco y negro.',
    },
  },

  socials: [
    { label: 'Instagram', handle: '@lizorzo', url: 'https://www.instagram.com/lizorzo/' },
    {
      label: 'Spotify',
      url: 'https://open.spotify.com/artist/1GslhHWyB0ut5egxkQpnRI',
    },
    {
      label: 'YouTube',
      url: 'https://www.youtube.com/channel/UCYzC0oPz9MWdyX4ZN9hbTWA',
    },
    // TikTok: el ícono existe en Linktree pero sin enlace. Sumalo cuando esté confirmado:
    // { label: 'TikTok', handle: '@…', url: 'https://www.tiktok.com/@…' },
  ] satisfies SocialLink[],

  /** Editable UI copy. */
  copy: {
    heroLabel: 'Archivo en vivo',
    emptyShowsTitle: 'Nuevas fechas próximamente',
    emptyShowsText: 'Seguí a Lizorzo en Instagram para enterarte de los próximos shows.',
    contactTitle: 'Contrataciones y prensa',
  },
}

export const spotifyUrl = artist.socials.find((s) => s.label === 'Spotify')!.url
export const instagram = artist.socials.find((s) => s.label === 'Instagram')!
