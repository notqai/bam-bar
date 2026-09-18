import Dot from './Dot.jsx'

// Eyebrow + serif heading + sub. tone: 'light' (cream bg) | 'dark' (maroon) | 'orange'
export default function SectionHead({ eyebrow, heading, sub, tone = 'light', align = 'left', className = '' }) {
  const eyebrowColor = { light: 'text-orange-deep', dark: 'text-sun', orange: 'text-cocoa' }[tone]
  const headingColor = { light: 'text-maroon', dark: 'text-warm', orange: 'text-warm' }[tone]
  const subColor = { light: 'text-cocoa/75', dark: 'text-warm/80', orange: 'text-cocoa' }[tone]
  const alignCls = align === 'center' ? 'text-center items-center' : 'items-start'
  return (
    <div className={`flex flex-col gap-2 ${alignCls} ${className}`}>
      {eyebrow && (
        <p className={`inline-flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-[0.18em] ${eyebrowColor}`}>
          <Dot className="size-2.5" /> {eyebrow}
        </p>
      )}
      <h2 className={`font-serif-display text-3xl leading-[1.05] md:text-5xl ${headingColor}`}>{heading}</h2>
      {sub && <p className={`max-w-prose text-base md:text-lg ${subColor}`}>{sub}</p>}
    </div>
  )
}
