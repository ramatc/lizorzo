/*
 * 925: the artist's signature mark, used sparingly as an archive-style hallmark.
 * Always decorative (aria-hidden): it identifies, it never carries information a reader needs.
 * Color comes from `currentColor`, so it reads correctly on ink and on the accent footer alike.
 */

type StampProps = {
  size?: 'sm' | 'lg'
  /** Archive code shown as "925 / 001" in editorial labels; replaces the stamp. */
  index?: undefined
  className?: string
}

type IndexProps = {
  index: string
  size?: undefined
  className?: string
}

/* sm: inline next to text (header). lg: the footer signature. */
const stampSizes = {
  sm: 'border px-[0.3em] pt-[0.22em] pb-[0.12em] text-[0.8125rem]',
  lg: 'border-2 px-[0.24em] pt-[0.16em] pb-[0.06em] text-[clamp(2.25rem,4.5vw,3.75rem)]',
}

export function Brand925({ size = 'sm', index, className = '' }: StampProps | IndexProps) {
  if (index !== undefined) {
    return (
      <span aria-hidden="true" className={`label ${className}`}>
        925 <span className="text-accent">/</span> {index}
      </span>
    )
  }

  return (
    <span
      aria-hidden="true"
      className={`inline-block border-current font-display leading-none tracking-[0.04em] select-none ${stampSizes[size]} ${className}`}
    >
      925
    </span>
  )
}
