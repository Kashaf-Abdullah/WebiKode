import PageHero from '../components/PageHero.jsx';
import Button from '../components/ui/Button.jsx';

export default function NotFound() {
  return (
    <>
      <PageHero title="Page not found" text="This page does not exist. Head back to the homepage." />
      <div className="container" style={{ paddingBottom: 'var(--section-y)' }}><Button to="/">Go to homepage</Button></div>
    </>
  );
}
