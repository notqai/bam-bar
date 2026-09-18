// Visible placeholder for an unknown fact. Searchable as "TODO:" in src/data.
export default function Todo({ children }) {
  return (
    <span
      title="Placeholder: replace in src/data/site.js"
      className="rounded-md border border-dashed border-maroon/60 bg-cream px-1.5 py-0.5 font-mono text-[0.8em] text-maroon"
    >
      {children}
    </span>
  )
}
