import { ArrowUpRight } from 'lucide-react'
import type { Release, ReleaseLink } from '../data/releases'
import { buttonGhost, buttonPrimary } from './button'
import { ExternalLink } from './ExternalLink'

/** Best single destination for a release (artwork, tiles); undefined when it has no links at all. */
export function releaseUrl(release: Release) {
  return release.spotifyUrl ?? release.youtubeUrl ?? release.otherLinks?.[0]?.url
}

type ReleaseLinksProps = {
  release: Release
  /** Platform label to show first as the primary button. */
  prefer?: string
}

/** Every available platform link for a release; missing links are never rendered. */
export function ReleaseLinks({ release, prefer }: ReleaseLinksProps) {
  const links = [
    release.spotifyUrl && { label: 'Spotify', url: release.spotifyUrl },
    release.youtubeUrl && { label: 'YouTube', url: release.youtubeUrl },
    ...(release.otherLinks ?? []),
  ]
    .filter((link): link is ReleaseLink => Boolean(link))
    .sort((a, b) => Number(b.label === prefer) - Number(a.label === prefer))

  return (
    <div className="flex flex-wrap gap-3">
      {links.map((link, i) => (
        <ExternalLink
          key={link.url}
          href={link.url}
          className={i === 0 ? buttonPrimary : buttonGhost}
          aria-label={`${link.label === 'YouTube' ? 'Ver' : 'Escuchar'} ${release.title} en ${link.label}`}
        >
          {i === 0 ? `${link.label === 'YouTube' ? 'Ver' : 'Escuchar'} en ${link.label}` : link.label}
          <ArrowUpRight size={16} strokeWidth={2.25} aria-hidden="true" />
        </ExternalLink>
      ))}
    </div>
  )
}
