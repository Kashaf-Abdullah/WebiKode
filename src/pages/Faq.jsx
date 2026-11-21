import PageHero from '../components/PageHero.jsx';
import FaqList from '../components/FaqList.jsx';
import { FAQ_PAGE } from '../data/faq.js';

export default function Faq() {
  return (
    <>
      <PageHero title="Frequently asked questions" text="Quick answers about buying and selling on Webikode." />
      <div className="container container--narrow" style={{ paddingBottom: 'var(--section-y)' }}><FaqList items={FAQ_PAGE} /></div>
    </>
  );
}
