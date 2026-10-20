import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { artist } from '../data/artist'
import { button } from './button'

const NAV = [
  { href: '#fechas', label: 'Fechas' },
  { href: '#musica', label: 'Música' },
  { href: '#sobre-mi', label: 'Sobre mí' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      toggleRef.current?.focus()
    }
    const onResize = () => window.innerWidth >= 768 && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    // The open menu covers the whole viewport, so the page behind must not scroll.
    const root = document.documentElement
    const previousOverflow = root.style.overflow
    root.style.overflow = 'hidden'
    // ...and keyboard/screen-reader focus must stay inside the menu.
    const behind = document.querySelectorAll<HTMLElement>('[data-behind-menu]')
    behind.forEach((node) => (node.inert = true))
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
      root.style.overflow = previousOverflow
      behind.forEach((node) => (node.inert = false))
    }
  }, [open])

  const skin = open
    ? 'flex h-dvh flex-col border-b border-transparent bg-ink'
    : scrolled
      ? 'border-b border-bone/10 bg-ink/90 backdrop-blur-[6px]'
      : 'border-b border-transparent bg-gradient-to-b from-ink/70 to-transparent'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${skin}`}
    >
      <div className="shell flex h-16 shrink-0 items-center justify-between">
        <a
          href="#top"
          className="font-display text-[1.625rem] leading-none tracking-[0.02em] uppercase"
          onClick={() => setOpen(false)}
        >
          {artist.name}
        </a>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="label relative py-2 text-bone/85 transition-colors hover:text-bone after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform hover:after:scale-x-100"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contacto"
                className={button('accent', 'sm')}
              >
                Contacto
              </a>
            </li>
          </ul>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="-mr-2 inline-flex size-12 items-center justify-center md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={26} strokeWidth={1.75} /> : <Menu size={26} strokeWidth={1.75} />}
        </button>
      </div>

      <nav
        id="mobile-menu"
        aria-label="Principal"
        hidden={!open}
        className="flex-1 overflow-y-auto overscroll-contain border-t border-bone/10 md:hidden"
      >
        <ul className="shell py-8 text-center">
          {[...NAV, { href: '#contacto', label: 'Contacto' }].map((item) => (
            <li key={item.href} className="border-b border-bone/10 last:border-b-0">
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-5 font-display text-[2.75rem] leading-none uppercase transition-colors hover:text-accent"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
