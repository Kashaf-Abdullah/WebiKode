export function Card({ className = '', children }) {
  return <div className={`card ${className}`.trim()}>{children}</div>;
}

// tone: 1 | 2 | 3 -> maps to --tile-1/2/3 tokens
export function Tile({ tone = 1, icon = false }) {
  return <div className={`tile${tone > 1 ? ` tile--${tone}` : ''}${icon ? ' tile--icon' : ''}`} aria-hidden="true" />;
}
