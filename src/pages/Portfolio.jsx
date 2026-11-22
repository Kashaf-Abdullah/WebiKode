import { useState } from 'react';
import PageHero from '../components/PageHero.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { PORTFOLIO_FILTERS, PORTFOLIO_ITEMS } from '../data/products.js';

export default function Portfolio() {
  const [filter, setFilter] = useState('All');
  const items = PORTFOLIO_ITEMS.filter((i) => filter === 'All' || i.category === filter);
  return (
    <>
      <PageHero title="Apps built and sold on our platform." text="A look at recent work from our sellers." />
      <div className="container" style={{ paddingBottom: 'var(--section-y)' }}>
        <div className="row" style={{ marginBottom: 'var(--space-6)' }}>
          {PORTFOLIO_FILTERS.map((f) => <button key={f} type="button" className="chip" aria-pressed={filter === f} onClick={() => setFilter(f)}>{f}</button>)}
        </div>
        <div className="grid grid--3">
          {items.map((i) => <ProductCard key={i.slug} product={i} />)}
        </div>
      </div>
    </>
  );
}
