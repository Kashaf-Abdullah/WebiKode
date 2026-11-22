import Section, { SectionHeader } from '../../components/ui/Section.jsx';
import ProductCard from '../../components/ProductCard.jsx';
import { PORTFOLIO_ITEMS } from '../../data/products.js';

export default function FeaturedProducts() {
  return (
    <Section id="featured">
      <SectionHeader eyebrow="Featured" title="Featured projects" text="Explore a selection of web applications built for learning, communication, productivity and personal finance." />
      <div className="grid grid--3">{PORTFOLIO_ITEMS.map((project) => <ProductCard key={project.slug} product={project} />)}</div>
    </Section>
  );
}
