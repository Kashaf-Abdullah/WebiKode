import Section, { SectionHeader } from '../../components/ui/Section.jsx';
import FaqList from '../../components/FaqList.jsx';
import { HOME_FAQ } from '../../data/faq.js';

export default function HomeFaq() {
  return (
    <Section id="faq">
      <div className="container--narrow" style={{ margin: '0 auto' }}>
        <SectionHeader eyebrow="FAQ" title="Frequently asked questions" />
        <FaqList items={HOME_FAQ} />
      </div>
    </Section>
  );
}
