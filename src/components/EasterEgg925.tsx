import { useEffect, useRef, useState, type CSSProperties } from 'react'

/*
 * Hidden 925 signature: typing 9-2-5 (or triple-tapping the header logo, see Header) fires a short
 * full-screen burst. Purely decorative: the overlay never takes pointer events and is hidden from
 * assistive tech, so the page underneath keeps working while it plays.
 */

const EVENT = 'lizorzo:925'
const SEQUENCE = '925'
/** Keys further apart than this restart the sequence. */
const KEY_WINDOW = 1500
const DURATION = 1350
/** Minimum time between two bursts, measured from the start of the previous one. */
const COOLDOWN = 2500
const SHARDS = 34

/** Fires the burst from anywhere (used by the header logo's triple tap). */
export function trigger925() {
  window.dispatchEvent(new Event(EVENT))
}

function isTyping(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false
  return target.isContentEditable || target.closest('input, textarea, select') !== null
}

export function EasterEgg925() {
  const [run, setRun] = useState(0)
  const lastRun = useRef(-Infinity)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let shakeTimer: number | undefined
    let buffer = ''
    let lastKeyAt = 0

    const shake = () => {
      const main = document.querySelector('main')
      if (!main || reducedMotion.matches) return
      // Restart the animation if it is somehow still applied.
      main.removeAttribute('data-egg-shake')
      void main.offsetWidth
      main.setAttribute('data-egg-shake', '')
      window.clearTimeout(shakeTimer)
      shakeTimer = window.setTimeout(() => main.removeAttribute('data-egg-shake'), 500)
    }

    const play = () => {
      const now = performance.now()
      if (now - lastRun.current < COOLDOWN) return
      lastRun.current = now
      setRun((value) => value + 1)
      shake()
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.repeat || event.ctrlKey || event.metaKey || event.altKey || isTyping(event.target)) return
      const now = performance.now()
      if (now - lastKeyAt > KEY_WINDOW) buffer = ''
      lastKeyAt = now
      buffer = (buffer + event.key).slice(-SEQUENCE.length)
      if (buffer === SEQUENCE) {
        buffer = ''
        play()
      }
    }

    window.addEventListener('keydown', onKey)
    window.addEventListener(EVENT, play)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener(EVENT, play)
      window.clearTimeout(shakeTimer)
      document.querySelector('main')?.removeAttribute('data-egg-shake')
    }
  }, [])

  useEffect(() => {
    if (!run) return
    const timer = window.setTimeout(() => setRun(0), DURATION)
    return () => window.clearTimeout(timer)
  }, [run])

  return run ? <Burst key={run} /> : null
}

type Shard = { dx: string; dy: string; rot: string; dur: string; w: number; h: number; color: string }

function makeShards(): Shard[] {
  return Array.from({ length: SHARDS }, (_, i) => {
    const angle = (i / SHARDS) * Math.PI * 2 + (Math.random() - 0.5) * 0.4
    const distance = 26 + Math.random() * 44
    const roll = Math.random()
    return {
      dx: `${(Math.cos(angle) * distance).toFixed(1)}vmin`,
      dy: `${(Math.sin(angle) * distance).toFixed(1)}vmin`,
      // Shards fly along their own axis, with a little spin on top.
      rot: `${((angle * 180) / Math.PI + 90 + (Math.random() - 0.5) * 120).toFixed(0)}deg`,
      dur: `${Math.round(650 + Math.random() * 450)}ms`,
      w: roll < 0.7 ? 3 + Math.round(Math.random() * 3) : 9 + Math.round(Math.random() * 9),
      h: roll < 0.7 ? 22 + Math.round(Math.random() * 44) : 9 + Math.round(Math.random() * 9),
      color: roll < 0.6 ? 'var(--color-accent)' : roll < 0.9 ? 'var(--color-bone)' : 'var(--color-ink)',
    }
  })
}

function Burst() {
  const [shards] = useState(makeShards)

  return (
    <div aria-hidden="true" className="egg pointer-events-none fixed inset-0 z-[55] grid place-items-center overflow-hidden">
      <div className="egg-veil absolute inset-0 bg-ink" />
      <div className="egg-flash absolute inset-0 bg-accent" />
      <div className="egg-ring absolute top-1/2 left-1/2 size-[42vmin] rounded-full border-2 border-accent" />
      {shards.map((shard, i) => (
        <span
          key={i}
          className="egg-shard absolute top-1/2 left-1/2"
          style={
            {
              width: shard.w,
              height: shard.h,
              background: shard.color,
              '--dx': shard.dx,
              '--dy': shard.dy,
              '--rot': shard.rot,
              '--dur': shard.dur,
            } as CSSProperties
          }
        />
      ))}
      <div className="egg-mark relative flex flex-col items-center">
        <span className="relative font-display text-[min(56vw,64vh)] leading-[0.8] text-bone">
          <span className="egg-ghost absolute inset-0 text-accent">925</span>
          <span className="relative">925</span>
        </span>
        <span className="egg-caption label mt-5 text-bone/75">Archivo 925</span>
      </div>
    </div>
  )
}
