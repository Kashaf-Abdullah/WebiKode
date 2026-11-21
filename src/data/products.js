// Placeholder catalogue: replace with API data later.
export const PRODUCT_TABS = [
  { id: 'best', label: 'Best-selling' },
  { id: 'new', label: 'New launches' },
  { id: 'trending', label: 'Trending' },
  { id: 'editor', label: 'Editor’s picks' },
];

const base = { category: '[Category]', description: '[Short description]', price: '[$ price]', rating: '[rating]', reviews: '[reviews]' };

export const PRODUCTS = [
  { id: 1, name: '[Product name]', tone: 1, collections: ['best', 'new', 'trending', 'editor'], ...base },
  { id: 2, name: '[Product name]', tone: 2, collections: ['best', 'new', 'trending', 'editor'], ...base },
  { id: 3, name: '[Product name]', tone: 3, collections: ['best', 'new', 'trending', 'editor'], ...base },
  { id: 4, name: '[Product name]', tone: 2, collections: ['best', 'new', 'trending', 'editor'], ...base },
];

export const LAUNCHES = [
  { ...base, id: 11, name: '[New product]', category: 'New launch', tone: 1 },
  { ...base, id: 12, name: '[New product]', category: 'New launch', tone: 2 },
  { ...base, id: 13, name: '[Product update]', category: 'Update', tone: 3 },
];

export const PORTFOLIO_FILTERS = ['All', 'Dashboards', 'E-commerce', 'Tools'];
export const PORTFOLIO_ITEMS = [
  ['Dashboards', 1], ['E-commerce', 2], ['Tools', 3], ['Dashboards', 2], ['E-commerce', 1], ['Tools', 3],
].map(([category, tone], i) => ({ id: i, category, tone, name: '[Project name]', description: '[One line about the app]' }));
