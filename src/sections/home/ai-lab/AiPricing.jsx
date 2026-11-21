import { Card } from '../../../components/ui/Card.jsx';
import { AI_PRICING } from '../../../data/home.js';

export default function AiPricing() {
  return (
    <div id="pricing">
      <h3 className="subhead">How AI pricing works</h3>
      <div className="grid grid--3">{AI_PRICING.map(([t, d]) => <Card key={t}><h3>{t}</h3><p>{d}</p></Card>)}</div>
      <p className="muted" style={{ marginTop: 'var(--space-4)' }}>Third-party AI API costs are shown separately from the integration fee.</p>
    </div>
  );
}
