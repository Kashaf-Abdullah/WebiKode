import Section, { SectionHeader } from '../../components/ui/Section.jsx';
import { Card } from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';
import { FREE_TOOLS } from '../../data/home.js';

export default function FreeTools() {
  return (
    <Section id="free-tools" band>
      <SectionHeader eyebrow="Free Tools" title="Free AI tools and mini web utilities" text="Try them with no purchase needed. Great tools bring people in, and the best ones lead to our paid products." />
      <div className="grid grid--4">
        {FREE_TOOLS.map((t) => (
          <Card key={t.id}>
            <span className="tag">Free</span><h3>{t.name}</h3><p>{t.description}</p>
            <Button variant="light" size="sm" to="#" style={{ alignSelf: 'flex-start' }}>Use for free</Button>
          </Card>
        ))}
      </div>
      <div style={{ marginTop: 'var(--space-6)' }}><Button variant="light" to="#">Explore all free tools →</Button></div>
    </Section>
  );
}
