import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { artist } from '../data/artist'
import { Brand925 } from './Brand925'
import { button } from './button'
import { Reveal } from './Reveal'
import { ExternalLink } from './ExternalLink'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer data-behind-menu className="bg-accent text-ink">
      <div className="shell pt-12 md:pt-16">
        <div className="grid gap-10 md:grid-cols-12">
          <nav aria-label="Redes sociales" className="md:col-span-7">
            <p className="label mb-4 text-ink">Redes</p>
            <ul className="border-t border-ink/25">
              {artist.socials.map((social) => (
                <li key={social.label} className="border-b border-ink/25">
                  <ExternalLink
                    href={social.url}
                    className="group flex items-center justify-between py-3 font-display text-[clamp(2rem,5vw,3.5rem)] leading-none uppercase"
                  >
                    <span className="transition-transform group-hover:translate-x-2">
                      {social.label}
                    </span>
                    <ArrowUpRight
                      className="size-7 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 md:size-9"
                      aria-hidden="true"
                    />
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col justify-between gap-8 md:col-span-4 md:col-start-9">
            <div>
              <p className="label mb-4 text-ink">Contacto</p>
              <a
                href={`mailto:${artist.email}`}
                className="text-lg font-semibold break-all underline decoration-2 underline-offset-4 hover:no-underline"
              >
                {artist.email}
              </a>
              <p className="mt-3 text-sm">
                Management{' '}
                <ExternalLink href={artist.management.url} className="font-semibold underline underline-offset-4">
                  {artist.management.handle}
                </ExternalLink>
              </p>
            </div>
            <a
              href="#top"
              className={`${button('inverse', 'sm')} self-start`}
            >
              <ArrowUp size={14} strokeWidth={2.25} aria-hidden="true" /> Volver arriba
            </a>
          </div>
        </div>

        {/* The artist's signature: the 925 hallmark set against the wordmark it belongs to. */}
        <Reveal className="mt-12 flex justify-end md:mt-16">
          <Brand925 size="lg" className="text-ink" />
        </Reveal>

        <div className="@container mt-3 overflow-hidden md:mt-4" aria-hidden="true">
          <p className="hero-name -mb-[0.04em] select-none font-display leading-[0.8] uppercase">{artist.name}</p>
        </div>
      </div>
      <div className="border-t border-ink/25">
        <div className="shell flex flex-col gap-1 py-4 text-xs sm:flex-row sm:justify-between">
          <p>
            © {year} {artist.name}. Todos los derechos reservados.
          </p>
          <p>
            Sitio oficial · Desarrollado por{' '}
            <ExternalLink
              href="https://ramatc.vercel.app/"
              className="font-semibold underline underline-offset-4 hover:no-underline"
            >
              ramatc
            </ExternalLink>
          </p>
        </div>
      </div>
    </footer>
  )
}
