import { ArrowUpRight } from 'lucide-react'
import { useRef, useState } from 'react'
import { instagram } from '../data/artist'
import { merchCopy, type MerchImage, type MerchProduct } from '../data/merch'
import { formatPrice } from '../lib/merch'
import { buttonPrimary } from './button'
import { ExternalLink } from './ExternalLink'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

/** Photos shown beside the product info from `md`; the rest run in a full-width strip below it. */
const LEAD_COUNT = 2

export function Merch({ products }: { products: MerchProduct[] }) {
  if (products.length === 0) return null

  return (
    <section id="merch" aria-labelledby="merch-title" className="relative overflow-hidden bg-surface pt-4 pb-20 md:pb-32">
      <div className="shell">
        <SectionHeading id="merch-title" title="Merch" aside={merchCopy.label} />

        <div className="mt-8 space-y-16 md:mt-14 md:space-y-24">
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Product({ product }: { product: MerchProduct }) {
  const lead = product.images.slice(0, LEAD_COUNT)
  const strip = product.images.slice(LEAD_COUNT)

  return (
    <article className="grid gap-8 lg:grid-cols-12 lg:gap-12">
      <Reveal className="min-w-0 lg:col-span-7 xl:col-span-8">
        <MobileGallery images={product.images} />
        <div className="hidden md:block">
          <PhotoRow images={lead} />
        </div>
      </Reveal>

      <Reveal className="min-w-0 lg:col-span-5 xl:col-span-4" delay={120}>
        <h3 className="font-display text-display-md text-balance uppercase">{product.title ?? product.name}</h3>
        {product.description && <p className="mt-4 text-body text-bone/85">{product.description}</p>}

        <div className="mt-6 border-t border-bone/15 pt-4">
          <p className="label text-ash">{product.name}</p>
          <p className="mt-3 flex items-baseline gap-2.5 font-display text-[clamp(2.5rem,4vw,3.25rem)] leading-none tabular-nums">
            {formatPrice(product.price)} <span className="label text-ash">{product.currency}</span>
          </p>
        </div>

        <div className="mt-6 border-t border-bone/15 pt-4">
          <p id={`${product.id}-sizes`} className="label text-ash">Talles</p>
          <ul aria-labelledby={`${product.id}-sizes`} className="mt-3 flex flex-wrap gap-2">
            {product.sizes.map((option) => (
              <li key={option} className="inline-flex min-h-12 min-w-14 items-center justify-center border border-bone/40 px-4 text-[0.8125rem] font-bold tracking-[0.08em]">
                {option}
              </li>
            ))}
          </ul>
        </div>

        <ExternalLink
          href={product.instagramUrl ?? instagram.url}
          aria-label={`${merchCopy.cta}: ${merchCopy.note}`}
          className={`${buttonPrimary} mt-8 w-full`}
        >
          {merchCopy.cta} <ArrowUpRight size={16} strokeWidth={2.25} aria-hidden="true" />
        </ExternalLink>

        <p className="mt-4 text-sm text-bone/70">{merchCopy.note}</p>
      </Reveal>

      {strip.length > 0 && (
        <Reveal className="hidden min-w-0 md:block lg:col-span-12" delay={80}>
          <PhotoRow images={strip} />
        </Reveal>
      )}
    </article>
  )
}

function Photo({ image, className = '' }: { image: MerchImage; className?: string }) {
  return (
    <div className="overflow-hidden bg-ink">
      <img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading="lazy"
        decoding="async"
        style={{ objectPosition: image.position }}
        className={`w-full object-bottom transition-transform duration-500 motion-safe:group-hover:scale-[1.03] ${className}`}
      />
    </div>
  )
}

/** Justified row: every photo keeps its full frame at one shared height, so no print gets cropped. */
function PhotoRow({ images }: { images: MerchImage[] }) {
  return (
    <div className="flex gap-6">
      {images.map((image) => (
        <figure key={image.src} className="group min-w-0" style={{ flex: `${image.width / image.height} 1 0` }}>
          <Photo image={image} className="h-auto" />
          <figcaption className="label mt-3 text-ash">{image.label}</figcaption>
        </figure>
      ))}
    </div>
  )
}

/** Phones only: every photo in one swipeable strip, driven by touch or by the segments below it. */
function MobileGallery({ images }: { images: MerchImage[] }) {
  const scroller = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const last = images.length - 1

  /* Distance between two consecutive slides. */
  const slideStep = (node: HTMLDivElement) => {
    const [first, second] = node.children as HTMLCollectionOf<HTMLElement>
    return second.offsetLeft - first.offsetLeft
  }

  const onScroll = () => {
    const node = scroller.current
    if (!node || last === 0) return
    // The last slide cannot reach the start edge, so the end of the track counts as that slide.
    const atEnd = node.scrollLeft >= node.scrollWidth - node.clientWidth - 1
    setActive(atEnd ? last : Math.round(node.scrollLeft / slideStep(node)))
  }

  const goTo = (index: number) => {
    const node = scroller.current
    if (!node || last === 0) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    node.scrollTo({ left: slideStep(node) * index, behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <div className="md:hidden">
      <div
        ref={scroller}
        onScroll={onScroll}
        className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto overscroll-x-contain px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((image) => (
          <figure key={image.src} className="w-[84%] shrink-0 snap-start last:snap-end">
            <Photo image={image} className="aspect-[5/6] object-cover" />
          </figure>
        ))}
      </div>

      {last > 0 && (
        <div className="mt-1 flex items-center gap-4">
          <div role="group" aria-label="Elegir foto" className="flex flex-1 gap-1.5">
            {images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                aria-label={`Foto ${index + 1} de ${images.length}: ${image.label}`}
                aria-pressed={active === index}
                className="flex min-h-11 flex-1 items-center"
                onClick={() => goTo(index)}
              >
                <span className={`h-0.5 w-full transition-colors ${active === index ? 'bg-accent' : 'bg-bone/25'}`} />
              </button>
            ))}
          </div>
          <p className="label text-ash">
            <span className="text-bone">{active + 1}</span> / {images.length}
          </p>
        </div>
      )}
    </div>
  )
}
