import Section, { SectionHeader } from '../../components/ui/Section.jsx';
import { Card, Tile } from '../../components/ui/Card.jsx';
import { CATEGORIES } from '../../data/home.js';

export default function Categories() {
  return (
    <Section id="categories">
      <SectionHeader eyebrow="Categories" title="Browse categories" />
      <div className="grid grid--3">
        {CATEGORIES.map(([name, text]) => (
          <Card key={name}><Tile tone={2} icon /><h3>{name}</h3><p>{text}</p></Card>
        ))}
      </div>
    </Section>
  );
}
