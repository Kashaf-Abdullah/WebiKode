import { Link } from 'react-router-dom';

// Internal paths ("/about", "/#faq") use the router; anything else is a plain anchor.
export default function AppLink({ to = '#', ...props }) {
  return to.startsWith('/') ? <Link to={to} {...props} /> : <a href={to} {...props} />;
}
