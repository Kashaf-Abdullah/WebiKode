import { useState } from 'react';
import { Card } from '../../../components/ui/Card.jsx';
import { AI_INTEGRATIONS } from '../../../data/home.js';

export default function AiIntegrations() {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const shown = AI_INTEGRATIONS.filter((i) => `${i.name} ${i.description}`.toLowerCase().includes(q));
  return (
    <>
      <div className="search" style={{ marginBottom: 'var(--space-6)' }}>
        <input type="search" aria-label="Search AI integrations" placeholder="Search AI integrations..." value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>
      <h3 className="subhead" style={{ marginTop: 0 }}>Available AI integrations</h3>
      {shown.length === 0 ? <p>No integrations match “{query}”. Try a different word or request a custom one below.</p> : (
        <div className="grid grid--3">
          {shown.map((i) => <Card key={i.name}><h3>{i.name}</h3><p>{i.description}</p><span className="tag">Available</span></Card>)}
        </div>
      )}
      <p className="muted" style={{ marginTop: 'var(--space-4)' }}>Illustrative feature catalogue. Actual availability depends on integration compatibility.</p>
    </>
  );
}
