import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type SectionHeadingProps = {
  id: string
  title: string
  aside?: ReactNode
}

export function SectionHeading({ id, title, aside }: SectionHeadingProps) {
  return (
    <Reveal className="border-t border-bone/20 pt-4 md:pt-5">
      {aside && <p className="label mb-6 text-right text-ash md:mb-10">{aside}</p>}
      <h2
        id={id}
        className="font-display text-[clamp(3.25rem,11vw,9rem)] leading-[0.9] tracking-[-0.01em] uppercase"
      >
        {title}
      </h2>
    </Reveal>
  )
}
