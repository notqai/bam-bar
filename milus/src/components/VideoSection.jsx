import { useEffect, useRef, useState } from 'react'
import SectionHead from './SectionHead.jsx'
import { Placeholder } from './Pic.jsx'
import video from '../data/video.generated.json'
import { copy } from '../data/site.js'

// Silent looping pan of the display case. Autoplay is skipped on data-saver
// and prefers-reduced-motion; a play button takes over instead.
export default function VideoSection() {
  const c = copy.video
  return (
    <section aria-labelledby="video-heading" className="bg-cream py-14 md:py-24">
      <div className="mx-auto max-w-4xl px-4">
        <SectionHead eyebrow={c.eyebrow} heading={c.heading} sub={c.sub} align="center" />
        <div className="mt-8 overflow-hidden rounded-[2rem] shadow-lift md:mt-12">
          {video.available ? <CasePan /> : (
            <Placeholder
              name="display-case-pan"
              aspect="16 / 9"
              className="rounded-[2rem]"
              label={
                <>
                  TODO(assets): display-case-pan.mp4 not received.
                  <br />
                  Drop it in assets-source/ and run `npm run video`.
                </>
              }
            />
          )}
        </div>
      </div>
    </section>
  )
}

function CasePan() {
  const ref = useRef(null)
  const [auto, setAuto] = useState(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const saveData = navigator.connection?.saveData === true
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setAuto(!saveData && !reduced)
  }, [])

  useEffect(() => {
    if (auto && ref.current) ref.current.play().then(() => setPlaying(true)).catch(() => {})
  }, [auto])

  const toggle = () => {
    const v = ref.current
    if (!v) return
    if (v.paused) v.play().then(() => setPlaying(true)).catch(() => {})
    else { v.pause(); setPlaying(false) }
  }

  return (
    <div className="relative bg-cocoa">
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="metadata"
        poster={video.poster}
        width={video.width}
        height={video.height}
        className="aspect-video w-full object-cover"
        aria-label="Slow pan across the Milus display case"
      >
        <source src={video.webm} type="video/webm" />
        <source src={video.mp4} type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={toggle}
        className="absolute bottom-3 right-3 grid size-12 place-items-center rounded-full bg-cream text-maroon shadow-lift"
        aria-pressed={playing}
      >
        <span className="sr-only">{playing ? 'Pause video' : 'Play video'}</span>
        <span aria-hidden="true" className="font-display text-xl">{playing ? '❚❚' : '▶'}</span>
      </button>
    </div>
  )
}
