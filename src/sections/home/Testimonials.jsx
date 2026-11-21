import Section, { SectionHeader } from '../../components/ui/Section.jsx';
import { Card } from '../../components/ui/Card.jsx';
import { TESTIMONIALS } from '../../data/home.js';

export default function Testimonials() {
  return (
    <Section id="reviews" band>
      <SectionHeader eyebrow="Reviews" title="Testimonials & customer reviews" text="Genuine customer feedback, ratings and product experiences." />
      <div className="grid grid--3">
        {TESTIMONIALS.map((t) => <Card key={t.id}><p>{t.quote}</p><p><strong>{t.meta}</strong></p></Card>)}
      </div>
    </Section>
  );
}
