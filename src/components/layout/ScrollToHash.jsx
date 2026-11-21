import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Scrolls to "#section" links, or to the top on normal page changes.
export default function ScrollToHash() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const el = hash && document.getElementById(hash.slice(1));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}
