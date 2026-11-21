export const BRAND = { name: 'webikode', announcement: 'Introducing Webikode: Digital products built for the future →' };

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Explore Products', to: '/#featured' },
  { label: 'Categories', to: '/#categories' },
  { label: 'Pricing', to: '/#pricing' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

// TODO: point these at real auth pages once they exist.
export const NAV_ACTIONS = { login: { label: 'Login', to: '/contact' }, cta: { label: 'Get Started →', to: '/contact' } };

export const FOOTER_COLUMNS = [
  { title: 'Company', links: [['About', '/about'], ['Contact', '/contact'], ['Careers', '#']] },
  { title: 'Explore', links: [['All Products', '/#featured'], ['Categories', '/#categories'], ['New Releases', '/#latest']] },
  { title: 'Resources', links: [['Blog', '#'], ['Documentation', '#'], ['Help Center', '/faq']] },
  { title: 'Legal', links: [['Privacy Policy', '#'], ['Terms & Conditions', '#'], ['Refund Policy', '#']] },
  { title: 'Social', links: [['X / Twitter', '#'], ['LinkedIn', '#'], ['YouTube', '#']] },
];
