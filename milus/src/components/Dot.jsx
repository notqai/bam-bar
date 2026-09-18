// The yellow dot motif from the logo, reused as a tiny accent.
export default function Dot({ className = 'size-2' }) {
  return <span aria-hidden="true" className={`inline-block shrink-0 rounded-full bg-sun ${className}`} />
}
