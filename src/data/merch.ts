/**
 * Merch: una entrada por producto. La sección se arma sola desde esta lista.
 * No hay carrito ni stock: la venta se coordina por Instagram con el artista.
 *
 * CÓMO SUMAR UN PRODUCTO
 * 1. Guardá las fotos en src/assets/merch/ e importalas abajo.
 * 2. Agregá un objeto a `merch`. `width`/`height` son las medidas reales del archivo.
 * 3. Las dos primeras fotos van junto a la info, a la misma altura; el resto va en la tira de abajo.
 *
 * `available: false` lo oculta sin borrarlo.
 */

import palabrasInfinitasBack from '../assets/merch/palabras-infinitas-back.webp'
import palabrasInfinitasFront from '../assets/merch/palabras-infinitas-front.webp'
import palabrasInfinitasMockBack from '../assets/merch/palabras-infinitas-mock-back.webp'
import palabrasInfinitasWornBack from '../assets/merch/palabras-infinitas-worn-back.webp'
import palabrasInfinitasWornProfile from '../assets/merch/palabras-infinitas-worn-profile.webp'
import palabrasInfinitasWornStreet from '../assets/merch/palabras-infinitas-worn-street.webp'

export type MerchImage = {
  src: string
  width: number
  height: number
  alt: string
  /** Short caption, also announced by the mobile gallery controls. */
  label: string
  /** What stays in frame when the phone gallery trims the photo. Default: bottom. */
  position?: string
}

export type MerchProduct = {
  id: string
  name: string
  /** Display headline; falls back to `name`. */
  title?: string
  price: number
  currency: string
  sizes: string[]
  images: MerchImage[]
  description?: string
  available: boolean
  /** Overrides the artist's Instagram profile for this product. */
  instagramUrl?: string
}

/** Editable section copy. */
export const merchCopy = {
  label: 'Lizorzo / Merch 001',
  cta: 'Conseguí la tuya',
  note: 'Coordinamos la compra por Instagram.',
}

export const merch: MerchProduct[] = [
  {
    id: 'remera-palabras-infinitas',
    name: 'Remera Palabras Infinitas',
    title: 'Palabras Infinitas',
    price: 25000,
    currency: 'ARS',
    sizes: ['M', 'L', 'XL'],
    images: [
      {
        src: palabrasInfinitasFront,
        width: 1024,
        height: 1024,
        alt: 'Remera negra vista de frente, con la inscripción blanca Palabras Infinitas en el pecho.',
        label: 'Frente',
      },
      {
        src: palabrasInfinitasBack,
        width: 800,
        height: 1000,
        alt: 'Persona de espaldas con la remera puesta: LIZORZO y el tracklist estampados en blanco.',
        label: 'Espalda',
      },
      {
        src: palabrasInfinitasWornProfile,
        width: 900,
        height: 1200,
        alt: 'Persona con gorra, de perfil en la calle, con la remera puesta y la inscripción Palabras Infinitas en el pecho.',
        label: 'Frente',
        position: '50% 0%',
      },
      {
        src: palabrasInfinitasWornBack,
        width: 900,
        height: 1200,
        alt: 'Primer plano de la espalda de la remera puesta, con LIZORZO y el tracklist numerado del uno al cinco.',
        label: 'Espalda',
        position: '50% 40%',
      },
      {
        src: palabrasInfinitasWornStreet,
        width: 900,
        height: 1200,
        alt: 'Persona de pie en una calle arbolada con la remera puesta, mirando hacia abajo.',
        label: 'Frente',
      },
      {
        src: palabrasInfinitasMockBack,
        width: 1024,
        height: 1024,
        alt: 'Remera negra vista de espalda, con LIZORZO y el tracklist estampados en blanco.',
        label: 'Espalda',
      },
    ],
    available: true,
  },
]
