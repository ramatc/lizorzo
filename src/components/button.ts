/* Single source for every pressable action: one height scale, one type style, one press feedback. */
const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold tracking-[0.12em] uppercase transition-[background-color,color,border-color,transform] active:scale-[0.98]'

const sizes = {
  md: 'min-h-12 px-4 text-[0.8125rem] sm:px-5',
  sm: 'min-h-10 px-4 text-[0.75rem]',
}

const variants = {
  /** Main action: filled accent. */
  primary: 'bg-accent text-ink hover:bg-bone',
  /** Secondary action: stays outlined on hover so it never mimics the primary. */
  ghost: 'border border-bone/40 text-bone hover:border-bone hover:bg-bone/10',
  /** Highlighted secondary action (contact, free entry). */
  accent: 'border border-accent text-accent hover:bg-accent hover:text-ink',
  /** Outlined action on an accent background. */
  inverse: 'border border-ink text-ink hover:bg-ink hover:text-accent',
}

export function button(variant: keyof typeof variants, size: keyof typeof sizes = 'md') {
  return `${base} ${sizes[size]} ${variants[variant]}`
}

export const buttonPrimary = button('primary')
export const buttonGhost = button('ghost')
