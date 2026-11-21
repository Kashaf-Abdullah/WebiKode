import AppLink from '../AppLink.jsx';
import { BRAND, FOOTER_COLUMNS } from '../../data/navigation.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="logo" style={{ marginBottom: 'var(--space-5)' }}>{BRAND.name}<span className="logo__dot">.</span></p>
        <div className="footer__grid">
          {FOOTER_COLUMNS.map(({ title, links }) => (
            <div key={title}>
              <h3>{title}</h3>
              {links.map(([label, to]) => <AppLink key={label} to={to}>{label}</AppLink>)}
            </div>
          ))}
        </div>
        <p className="footer__copy">Copyright © Webikode</p>
      </div>
    </footer>
  );
}
