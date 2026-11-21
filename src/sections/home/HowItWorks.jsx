import Section, { SectionHeader } from '../../components/ui/Section.jsx';
import { Card } from '../../components/ui/Card.jsx';
import { STEPS } from '../../data/home.js';

export default function HowItWorks() {
  return (
    <Section id="how-it-works">
      <SectionHeader eyebrow="How it works" title="How it works" />
      <div className="grid grid--4">{STEPS.map(([t, d]) => <Card key={t}><h3>{t}</h3><p>{d}</p></Card>)}</div>
    </Section>
  );
}
