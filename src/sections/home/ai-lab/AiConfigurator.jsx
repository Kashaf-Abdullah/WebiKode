import { useState } from 'react';
import { Card } from '../../../components/ui/Card.jsx';
import Field from '../../../components/ui/Field.jsx';
import Button from '../../../components/ui/Button.jsx';
import { AI_PRODUCTS, AI_FEATURES } from '../../../data/home.js';
import { submitSubmission } from '../../../lib/submissions.js';

export default function AiConfigurator() {
  const [product, setProduct] = useState(AI_PRODUCTS[0]);
  const [features, setFeatures] = useState(['AI Chatbot', 'AI Automation']);
  const [notes, setNotes] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const toggle = (f) => setFeatures((cur) => (cur.includes(f) ? cur.filter((x) => x !== f) : [...cur, f]));
  const send = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await submitSubmission({ type: 'ai-configurator', product, features, notes, name, email });
      setSent(true);
    } catch (submissionError) {
      setError(submissionError.message || 'We could not send your request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <h3 className="subhead">Configure Your AI Integration</h3>
      <div className="builder">
        <Card>
          <form className="stack" onSubmit={send}>
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
              <textarea rows="4" maxLength="5000" value={notes} onChange={(e) => setNotes(e.target.value)} />
            </Field>
            <Field label="Your name"><input type="text" required maxLength="120" value={name} onChange={(e) => setName(e.target.value)} /></Field>
            <Field label="Your email"><input type="email" required maxLength="254" value={email} onChange={(e) => setEmail(e.target.value)} /></Field>
            {error && <p className="form-error" role="alert">{error}</p>}
            {sent ? <p className="notice" role="status">Request sent. We will get back to you.</p> : (
              <Button type="submit" disabled={!features.length || submitting} style={{ alignSelf: 'flex-start' }}>
                {submitting ? 'Sending…' : 'Request AI Integration'}
              </Button>
            )}
          </form>
        </Card>
        <Card>
          <h3>Your configuration</h3>
          <p><strong>Product:</strong> {product}</p>
          <p><strong>Features:</strong> {features.length ? features.join(', ') : 'None selected'}</p>
        </Card>
      </div>
    </>
  );
}
