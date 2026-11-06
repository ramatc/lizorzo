import { ArrowUpRight } from 'lucide-react'
import { useRef, useState } from 'react'
import { instagram } from '../data/artist'
import { merchCopy, type MerchImage, type MerchProduct } from '../data/merch'
import { formatPrice } from '../lib/merch'
import { buttonPrimary } from './button'
import { ExternalLink } from './ExternalLink'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

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
  return (
    <article className="grid gap-8 lg:grid-cols-12 lg:gap-12">
      <Reveal className="min-w-0 lg:col-span-7 xl:col-span-8">
        <Gallery images={product.images} />
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
    </article>
  )
}

/** Swipeable strip on phones; from `md` the same figures become a fixed editorial composition. */
function Gallery({ images }: { images: MerchImage[] }) {
  const scroller = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const onScroll = () => {
    const node = scroller.current
    if (!node) return
    const max = node.scrollWidth - node.clientWidth
    if (max > 0) setActive(Math.round((node.scrollLeft / max) * (images.length - 1)))
  }

  const goTo = (index: number) => {
    const node = scroller.current
    if (!node) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const max = node.scrollWidth - node.clientWidth
    node.scrollTo({ left: (max * index) / (images.length - 1), behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <>
      <div
        ref={scroller}
        onScroll={onScroll}
        className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto overscroll-x-contain px-5 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-8 md:items-end md:gap-6 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {images.map((image, index) => (
          <figure
            key={image.src}
            className={`group w-[84%] shrink-0 snap-start last:snap-end md:w-auto ${index === 0 ? 'md:col-span-5' : 'md:col-span-3'}`}
          >
            <div className="overflow-hidden bg-ink">
              {/* The bottom anchor keeps the back print in frame when the phone ratio trims the photo. */}
              <img
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                loading="lazy"
                decoding="async"
                className="aspect-[5/6] w-full object-cover object-bottom transition-transform duration-500 motion-safe:group-hover:scale-[1.03] md:aspect-auto md:h-auto"
              />
            </div>
            <figcaption className="label mt-3 hidden text-ash md:block">{image.label}</figcaption>
          </figure>
        ))}
      </div>

      {images.length > 1 && (
        <div role="group" aria-label="Elegir foto" className="mt-1 flex gap-6 md:hidden">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              aria-pressed={active === index}
              className={`label min-h-11 border-b-2 transition-colors ${active === index ? 'border-accent text-bone' : 'border-transparent text-ash'}`}
              onClick={() => goTo(index)}
            >
              {image.label}
            </button>
          ))}
        </div>
      )}
    </>
  )
}
