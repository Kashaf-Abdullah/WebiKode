export default function Section({ id, band = false, children }) {
  return (
    <section id={id} className={`section${band ? ' section--band' : ''}`}>
      <div className="container">{children}</div>
    </section>
  );
}

export function SectionHeader({ eyebrow, title, text, center = false }) {
  return (
    <div className={`section-header${center ? ' section-header--center' : ''}`}>
      {eyebrow && <span className="tag">{eyebrow}</span>}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}
