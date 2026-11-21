import { useState } from 'react';
import PageHero from '../components/PageHero.jsx';
import { Card } from '../components/ui/Card.jsx';
import Field from '../components/ui/Field.jsx';
import Button from '../components/ui/Button.jsx';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const submit = (e) => { e.preventDefault(); setSent(true); /* TODO: POST `form` to your backend */ };
  return (
    <>
      <PageHero title="Get in touch" text="Questions, feedback or partnership ideas? Send us a message." />
      <div className="container contact">
        <div className="stack"><h3>Reach us directly</h3><p>[your@email.com]</p><p>[Phone number]</p><p>[Business address]</p></div>
        <Card>
          {sent ? <p className="notice" role="status">Thanks {form.name || 'for reaching out'}, we will reply soon.</p> : (
            <form className="stack" onSubmit={submit}>
              <Field label="Name"><input type="text" required value={form.name} onChange={set('name')} /></Field>
              <Field label="Email"><input type="email" required value={form.email} onChange={set('email')} /></Field>
              <Field label="Message"><textarea rows="5" required value={form.message} onChange={set('message')} /></Field>
              <Button type="submit" style={{ alignSelf: 'flex-start' }}>Send message</Button>
            </form>
          )}
        </Card>
      </div>
    </>
  );
}
