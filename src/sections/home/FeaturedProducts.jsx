import { useState } from 'react';
import Section, { SectionHeader } from '../../components/ui/Section.jsx';
import ProductCard from '../../components/ProductCard.jsx';
import { PRODUCT_TABS, PRODUCTS } from '../../data/products.js';

export default function FeaturedProducts() {
  const [tab, setTab] = useState(PRODUCT_TABS[0].id);
  const items = PRODUCTS.filter((p) => p.collections.includes(tab));
  return (
    <Section id="featured">
      <SectionHeader eyebrow="Featured" title="Featured products" />
      <div className="row" style={{ marginBottom: 'var(--space-6)' }}>
        {PRODUCT_TABS.map(({ id, label }) => (
          <button key={id} type="button" className="chip" aria-pressed={tab === id} onClick={() => setTab(id)}>{label}</button>
        ))}
      </div>
      <div className="grid grid--4">{items.map((p) => <ProductCard key={p.id} product={p} />)}</div>
    </Section>
  );
}
