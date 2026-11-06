/** Amount only, es-AR grouping: 25000 -> "$25.000". */
export function formatPrice(price: number) {
  return `$${price.toLocaleString('es-AR')}`
}
