import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type SectionHeadingProps = {
  id: string
  index: string
  title: string
  aside?: ReactNode
}

export function SectionHeading({ id, index, title, aside }: SectionHeadingProps) {
  return (
    <Reveal className="border-t border-bone/20 pt-4 md:pt-5">
      <div className="mb-6 flex items-center justify-between gap-4 md:mb-10">
        <span className="label text-ash" aria-hidden="true">
          {index} <span className="text-accent">/</span> Lizorzo
        </span>
        {aside && <span className="label text-ash">{aside}</span>}
      </div>
      <h2
        id={id}
        className="font-display text-[clamp(3.25rem,11vw,9rem)] leading-[0.9] tracking-[-0.01em] uppercase"
      >
        {title}
      </h2>
    </Reveal>
  )
}
