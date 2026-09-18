import manifest from '../data/images.generated.json'

// Responsive image from the generated manifest (run `npm run images`).
// If the key is missing (asset not received yet) it renders a clearly
// labelled placeholder so the layout can still be reviewed.
export default function Pic({ name, alt, sizes = '100vw', className = '', priority = false, aspect, style }) {
  const img = manifest[name]
  if (!img) return <Placeholder name={name} className={className} aspect={aspect} style={style} />
  return (
    <img
      src={img.src}
      srcSet={img.srcset}
      sizes={sizes}
      width={img.width}
      height={img.height}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      className={className}
      style={style}
    />
  )
}

export function Placeholder({ name, className = '', aspect = '4 / 3', style, label }) {
  return (
    <div
      role="img"
      aria-label={`Photo placeholder: ${name}`}
      className={`grid place-items-center rounded-2xl border-2 border-dashed border-maroon/40 bg-kraft-paper p-3 text-center ${className}`}
      style={{ aspectRatio: aspect, ...style }}
    >
      <span className="font-mono text-[11px] leading-snug text-maroon">
        {label ?? (
          <>
            TODO(assets): <br />
            {name}.jpg
          </>
        )}
      </span>
    </div>
  )
}
