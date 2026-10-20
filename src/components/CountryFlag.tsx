import AR from 'country-flag-icons/react/3x2/AR'
import MX from 'country-flag-icons/react/3x2/MX'

/*
 * SVG flags, not emoji: Windows renders flag emoji as plain letters ("AR").
 * Imported one by one so only the flags in use reach the bundle; add a country here when a show needs it.
 */
const FLAGS = { AR, MX }

/** Decorative flag for an ISO 3166-1 alpha-2 code; renders nothing for unknown codes. */
export function CountryFlag({ code }: { code?: string }) {
  const Flag = code ? FLAGS[code.toUpperCase() as keyof typeof FLAGS] : undefined
  if (!Flag) return null
  return <Flag aria-hidden="true" className="inline-block h-[0.7em] w-auto align-[-0.02em] rounded-[1px]" />
}
