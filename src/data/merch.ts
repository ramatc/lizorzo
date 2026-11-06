/**
 * Merch: una entrada por producto. La sección se arma sola desde esta lista.
 * No hay carrito ni stock: la venta se coordina por Instagram con el artista.
 *
 * CÓMO SUMAR UN PRODUCTO
 * 1. Guardá las fotos en src/assets/merch/ e importalas abajo.
 * 2. Agregá un objeto a `merch`. `width`/`height` son las medidas reales del archivo.
 * 3. La primera foto es la protagonista; las demás acompañan.
 *
 * `available: false` lo oculta sin borrarlo.
 */

import palabrasInfinitasBack from '../assets/merch/palabras-infinitas-back.webp'
import palabrasInfinitasFront from '../assets/merch/palabras-infinitas-front.webp'

export type MerchImage = {
  src: string
  width: number
  height: number
  alt: string
  /** Short caption, also used by the mobile gallery tabs. */
  label: string
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
    ],
    available: true,
  },
]
