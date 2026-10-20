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
                    className="group flex items-center justify-between py-3 font-display text-display-link uppercase"
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

          <div className="flex flex-col items-end gap-5 md:col-span-4 md:col-start-9 md:self-end">
            {/* The artist's signature: the 925 hallmark. */}
            <Reveal>
              <Brand925 size="lg" className="text-ink" />
            </Reveal>
            <a
              href="#top"
              className={button('inverse', 'sm')}
            >
              <ArrowUp size={14} strokeWidth={2.25} aria-hidden="true" /> Volver arriba
            </a>
          </div>
        </div>

        <div className="@container mt-12 overflow-hidden md:mt-16" aria-hidden="true">
          <p className="hero-name -mb-[0.04em] select-none font-display leading-[0.8] uppercase">{artist.name}</p>
        </div>
      </div>
      <div className="border-t border-ink/25">
        <div className="shell flex flex-col gap-1 py-4 text-xs leading-relaxed sm:flex-row sm:justify-between">
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
