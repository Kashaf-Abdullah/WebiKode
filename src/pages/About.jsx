import PageHero from '../components/PageHero.jsx';
import Section, { SectionHeader } from '../components/ui/Section.jsx';
import { Card, Tile } from '../components/ui/Card.jsx';

const VALUES = [['Quality', 'Listings are reviewed so the catalogue stays useful.'], ['Fairness', 'Clear pricing and clear terms for buyers and sellers.'], ['Support', 'Real people to help when something goes wrong.']];
const TEAM = [1, 2, 3].map((tone) => ({ tone, name: '[Name]', role: '[Role]' }));

export default function About() {
  return (
    <>
      <PageHero title="We help builders get paid for what they ship." text="Webikode started with a simple idea: good digital products should be easy to find, fair to buy and simple to sell. [Add your story here.]" />
      <div className="container"><div className="tile tile--2" style={{ height: 'clamp(180px, 30vw, 320px)' }} aria-hidden="true" /></div>
      <Section band>
        <SectionHeader title="What we value" />
        <div className="grid grid--3">{VALUES.map(([t, d]) => <Card key={t}><h3>{t}</h3><p>{d}</p></Card>)}</div>
      </Section>
      <Section>
        <SectionHeader title="The team" />
        <div className="grid grid--3">{TEAM.map((m, i) => <Card key={i}><Tile tone={m.tone} /><h3>{m.name}</h3><p>{m.role}</p></Card>)}</div>
      </Section>
    </>
  );
}
