import Button from '../../components/ui/Button.jsx';

export default function Hero() {
  return (
    <section className="container hero">
      <span className="tag">The future of digital products</span>
      <h1>Powerful Digital Products. One Platform.</h1>
      <p className="hero__lead">Discover AI tools, SaaS platforms and ready-to-use web applications designed to help you build, launch and grow.</p>
      <form className="search" role="search" onSubmit={(e) => e.preventDefault()}>
        <input type="search" aria-label="Search products" placeholder="Search AI tools, SaaS, templates..." />
        <Button type="submit">Explore Products →</Button>
      </form>
      <div className="row" style={{ justifyContent: 'center' }}>
        <Button to="/#how-it-works" variant="outline" size="sm">How It Works</Button>
        <span>AI Tools · SaaS · Web Apps · Templates</span>
      </div>
    </section>
  );
}
