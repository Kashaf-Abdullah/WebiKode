import { useState } from 'react';
import { Card } from '../../../components/ui/Card.jsx';
import Field from '../../../components/ui/Field.jsx';
import Button from '../../../components/ui/Button.jsx';
import { AI_PRODUCTS, AI_FEATURES } from '../../../data/home.js';

export default function AiConfigurator() {
  const [product, setProduct] = useState(AI_PRODUCTS[0]);
  const [features, setFeatures] = useState(['AI Chatbot', 'AI Automation']);
  const [notes, setNotes] = useState('');
  const [sent, setSent] = useState(false);
  const toggle = (f) => setFeatures((cur) => (cur.includes(f) ? cur.filter((x) => x !== f) : [...cur, f]));
  const send = () => setSent(true); // TODO: POST { product, features, notes } to your backend

  return (
    <>
      <h3 className="subhead">Configure Your AI Integration</h3>
      <div className="builder">
        <Card>
          <div className="stack">
            <Field label="1. Select your product">
              <select value={product} onChange={(e) => setProduct(e.target.value)}>
                {AI_PRODUCTS.map((p) => <option key={p}>{p}</option>)}
              </select>
            </Field>
            <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
              <legend style={{ fontWeight: 600, color: 'var(--heading)', marginBottom: 'var(--space-2)' }}>2. Select AI features</legend>
              {AI_FEATURES.map((f) => (
                <label key={f} className="check"><input type="checkbox" checked={features.includes(f)} onChange={() => toggle(f)} />{f}</label>
              ))}
            </fieldset>
            <Field label="3. Describe your requirements">
              <textarea rows="4" value={notes} onChange={(e) => setNotes(e.target.value)} />
            </Field>
          </div>
        </Card>
        <Card>
          <h3>Your configuration</h3>
          <p><strong>Product:</strong> {product}</p>
          <p><strong>Features:</strong> {features.length ? features.join(', ') : 'None selected'}</p>
          {sent ? <p className="notice" role="status">Request received. We will get back to you.</p> : (
            <Button onClick={send} disabled={!features.length} style={{ alignSelf: 'flex-start' }}>Request AI Integration</Button>
          )}
        </Card>
      </div>
    </>
  );
}
