import type { AnchorHTMLAttributes } from 'react'

/** Anchor that opens in a new tab without leaking the opener. */
export function ExternalLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

export const buttonBase =
  'inline-flex min-h-12 items-center justify-center gap-2 px-4 whitespace-nowrap text-[0.8125rem] sm:px-5 font-bold tracking-[0.12em] uppercase transition-[background-color,color,border-color,transform] duration-200 ease-out active:scale-[0.98]'

export const buttonPrimary = `${buttonBase} bg-accent text-ink hover:bg-bone`

export const buttonGhost = `${buttonBase} border border-bone/40 text-bone hover:border-bone hover:bg-bone hover:text-ink`
