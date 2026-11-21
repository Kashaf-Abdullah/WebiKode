import Section, { SectionHeader } from '../../components/ui/Section.jsx';
import { Card } from '../../components/ui/Card.jsx';
import { WHY_POINTS } from '../../data/home.js';

export default function WhyWebikode() {
  return (
    <Section id="why" band>
      <SectionHeader eyebrow="Why Webikode" title="Why choose Webikode?" />
      <div className="grid grid--3">{WHY_POINTS.map((p) => <Card key={p}><h3>{p}</h3></Card>)}</div>
    </Section>
  );
}
