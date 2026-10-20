/**
 * Shows / fechas.
 *
 * CÓMO AGREGAR UNA FECHA
 * 1. Copiá un objeto del array `shows` y pegalo al final.
 * 2. Cambiá el `id` por uno único (sugerencia: AAAA-MM-DD-lugar).
 * 3. `date` va en formato AAAA-MM-DD con la fecha LOCAL del show
 *    (no se convierte a UTC, el día que escribas es el día que se muestra).
 * 4. Elegí el `status`:
 *    - 'available'   → entradas a la venta (si hay `ticketUrl` se muestra el botón ENTRADAS)
 *    - 'sold_out'    → agotado
 *    - 'coming_soon' → entradas próximamente
 *    - 'free'        → entrada libre y gratuita
 *    Si las entradas no se venden online, usá `ticketInfo` (precio / modo de pago)
 *    y `infoUrl` (por ejemplo el posteo del flyer): se muestra un botón MÁS INFO.
 * 5. Los campos opcionales que no completes simplemente no se muestran.
 *
 * No hace falta ordenar ni borrar fechas viejas: la web muestra solo las de
 * hoy en adelante y las ordena sola.
 */

export type ShowStatus = 'available' | 'sold_out' | 'coming_soon' | 'free'

export type Show = {
  id: string
  /** Local date of the show, YYYY-MM-DD. */
  date: string
  city: string
  country: string
  /** ISO 3166-1 alpha-2 (e.g. 'AR'); shows a flag next to the country when it exists in CountryFlag. */
  countryCode?: string
  venue: string
  title?: string
  /** Local time, HH:MM (24h). */
  time?: string
  ticketUrl?: string
  /** Short ticket note shown when there is no purchase link (prices, method). */
  ticketInfo?: string
  /** Where to read more when tickets are not sold online (e.g. the flyer post). */
  infoUrl?: string
  locationUrl?: string
  status: ShowStatus
}

const mapsSearch = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`

export const shows: Show[] = [
  {
    // Fuente: linktr.ee/Lizorzo → otrahistoria.com.ar (ya pasó, queda como archivo).
    id: '2026-09-18-otra-historia',
    date: '2026-09-18',
    city: 'Buenos Aires',
    country: 'Argentina',
    countryCode: 'AR',
    venue: 'Club Cultural Otra Historia',
    title: 'Festival Smooth',
    time: '20:00',
    ticketUrl: 'https://otrahistoria.com.ar/evento/festival-smooth-lizorzo/',
    locationUrl: mapsSearch('Estomba 851, CABA, Argentina'),
    status: 'available',
  },
  {
    // Fuente: bio de Instagram + flyer "Halloween Night".
    id: '2026-10-31-mala-vida',
    date: '2026-10-31',
    city: 'San Telmo, CABA',
    country: 'Argentina',
    countryCode: 'AR',
    venue: 'Mala Vida',
    title: 'Halloween Night',
    time: '23:00',
    ticketInfo: 'Entradas a $8.000 por transferencia',
    infoUrl: 'https://www.instagram.com/p/DedGuWCEfz5/',
    locationUrl: mapsSearch('Mala Vida, Piedras 78, San Telmo, CABA'),
    status: 'available',
  },
  {
    // Fuente: bio de Instagram + flyer de Nómada ("SAB 30 ENE").
    // El año no figura en el flyer: 2027 es el próximo 30/01 que cae sábado. Confirmar.
    id: '2027-01-30-depto-mx',
    date: '2027-01-30',
    city: 'Cd. Nezahualcóyotl, Edomex',
    country: 'México',
    countryCode: 'MX',
    venue: 'Depto MX',
    title: 'Pacifiko K · Lizorzo invitado especial',
    time: '20:00',
    ticketInfo: 'General $200 · M&G $400 MXN · Boletos en Boletia',
    infoUrl: 'https://www.instagram.com/p/DeiOCpjHZmv/',
    locationUrl: mapsSearch('Depto MX, Ciudad Nezahualcóyotl, Estado de México'),
    status: 'available',
  },
]
