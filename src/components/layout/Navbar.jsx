import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { BRAND, NAV_LINKS, NAV_ACTIONS } from '../../data/navigation.js';
import Button from '../ui/Button.jsx';
import ThemeToggle from './ThemeToggle.jsx';

export default function Navbar({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="logo" onClick={close}>{BRAND.name}<span className="logo__dot">.</span></Link>
        <button type="button" className="navbar__burger" aria-expanded={open} aria-controls="nav-menu" aria-label="Toggle menu" onClick={() => setOpen((o) => !o)}>
          {open ? '✕' : '☰'}
        </button>
        <nav id="nav-menu" className={`navbar__menu${open ? ' is-open' : ''}`} aria-label="Main">
          {NAV_LINKS.map(({ label, to }) =>
            to.includes('#') ? (
              <Link key={label} to={to} onClick={close}>{label}</Link>
            ) : (
              <NavLink key={label} to={to} end={to === '/'} className={({ isActive }) => (isActive ? 'is-active' : undefined)} onClick={close}>{label}</NavLink>
            )
          )}
          <Link to={NAV_ACTIONS.login.to} onClick={close}>{NAV_ACTIONS.login.label}</Link>
          <Button to={NAV_ACTIONS.cta.to} size="sm" onClick={close}>{NAV_ACTIONS.cta.label}</Button>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </nav>
      </div>
    </header>
  );
}
