import { useState } from 'react';
import Section from '../../components/ui/Section.jsx';
import { Card } from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';
import { submitSubmission } from '../../lib/submissions.js';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await submitSubmission({ type: 'newsletter', email });
      setDone(true);
    } catch (submissionError) {
      setError(submissionError.message || 'We could not complete your signup. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Section id="newsletter">
      <Card className="newsletter">
        <h2>Stay in the loop</h2>
        <p>Get updates about new products, launches, offers and AI tools.</p>
        {done ? <p className="notice" role="status">Thanks, we received your signup.</p> : (
          <form className="search" onSubmit={submit}>
            <input type="email" required maxLength="254" aria-label="Email address" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Button type="submit" disabled={submitting}>{submitting ? 'Submitting…' : 'Subscribe'}</Button>
            {error && <p className="form-error" role="alert">{error}</p>}
          </form>
        )}
      </Card>
    </Section>
  );
}
