import { useState } from 'react';
import Section from '../../components/ui/Section.jsx';
import { Card } from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const submit = (e) => { e.preventDefault(); setDone(true); /* TODO: call your newsletter API */ };
  return (
    <Section id="newsletter">
      <Card className="newsletter">
        <h2>Stay in the loop</h2>
        <p>Get updates about new products, launches, offers and AI tools.</p>
        {done ? <p className="notice" role="status">Thanks, you are subscribed.</p> : (
          <form className="search" onSubmit={submit}>
            <input type="email" required aria-label="Email address" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Button type="submit">Subscribe</Button>
          </form>
        )}
      </Card>
    </Section>
  );
}
