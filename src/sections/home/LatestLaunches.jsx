import Section, { SectionHeader } from '../../components/ui/Section.jsx';
import ProductCard from '../../components/ProductCard.jsx';
import { LAUNCHES } from '../../data/products.js';

export default function LatestLaunches() {
  return (
    <Section id="latest">
      <SectionHeader eyebrow="New" title="Latest launches" text="Recently released products, new features and updates." />
      <div className="grid grid--3">{LAUNCHES.map((p) => <ProductCard key={p.id} product={p} />)}</div>
    </Section>
  );
}
