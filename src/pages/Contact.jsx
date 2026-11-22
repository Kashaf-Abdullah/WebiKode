import { useState } from 'react';
import PageHero from '../components/PageHero.jsx';
import { Card } from '../components/ui/Card.jsx';
import Field from '../components/ui/Field.jsx';
import Button from '../components/ui/Button.jsx';
import { submitSubmission } from '../lib/submissions.js';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await submitSubmission({ type: 'contact', ...form });
      setSent(true);
    } catch (submissionError) {
      setError(submissionError.message || 'We could not send your message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <PageHero title="Get in touch" text="Questions, feedback or partnership ideas? Send us a message." />
      <div className="container contact">
        <div className="stack"><h3>Reach us directly</h3><p>kashafabdullah01@gmail.com</p><p>[Phone number]</p><p>[Business address]</p></div>
        <Card>
          {sent ? <p className="notice" role="status">Thanks {form.name || 'for reaching out'}, we will reply soon.</p> : (
            <form className="stack" onSubmit={submit}>
              <Field label="Name"><input type="text" required maxLength="120" value={form.name} onChange={set('name')} /></Field>
              <Field label="Email"><input type="email" required maxLength="254" value={form.email} onChange={set('email')} /></Field>
              <Field label="Message"><textarea rows="5" required maxLength="5000" value={form.message} onChange={set('message')} /></Field>
              {error && <p className="form-error" role="alert">{error}</p>}
              <Button type="submit" disabled={submitting} style={{ alignSelf: 'flex-start' }}>
                {submitting ? 'Sending…' : 'Send message'}
              </Button>
            </form>
          )}
        </Card>
      </div>
    </>
  );
}
