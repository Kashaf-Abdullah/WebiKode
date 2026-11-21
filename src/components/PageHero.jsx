export default function PageHero({ title, text }) {
  return (
    <div className="container page-hero">
      <h1>{title}</h1>
      {text && <p>{text}</p>}
    </div>
  );
}
