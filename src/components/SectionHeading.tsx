import type { ReactNode } from 'react'
import { Brand925 } from './Brand925'
import { Reveal } from './Reveal'

type SectionHeadingProps = {
  id: string
  title: string
  aside?: ReactNode
  /** Archive code rendered as "925 / {code}"; only some sections carry one. */
  code?: string
}

export function SectionHeading({ id, title, aside, code }: SectionHeadingProps) {
  return (
    <Reveal className="border-t border-bone/20 pt-4 md:pt-5">
      {(code || aside) && (
        <div className="mb-6 flex items-center justify-between gap-4 md:mb-10">
          {code && <Brand925 index={code} className="text-ash" />}
          {aside && <p className="label ml-auto text-right text-ash">{aside}</p>}
        </div>
      )}
      <h2
        id={id}
        className="font-display text-[clamp(3.25rem,11vw,9rem)] leading-[0.9] tracking-[-0.01em] uppercase"
      >
        {title}
      </h2>
    </Reveal>
  )
}
