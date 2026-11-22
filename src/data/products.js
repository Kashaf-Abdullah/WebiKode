// Placeholder catalogue: replace with API data later.
const projectImageFiles = import.meta.glob('./**/*.png', { eager: true, import: 'default' });
const getProjectImages = (folder) => Object.entries(projectImageFiles)
  .filter(([path]) => path.startsWith(`./${folder}/`))
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, image]) => image);

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

export const PORTFOLIO_FILTERS = ['All', 'Education', 'Communication', 'Productivity', 'Finance'];
export const PORTFOLIO_ITEMS = [
  {
    slug: 'mentoraloop',
    category: 'Education',
    tone: 1,
    images: getProjectImages('01-mentoraloop'),
    name: 'MentoraLoop',
    summary: 'A mentoring platform that helps learners connect with experienced guides and build meaningful learning relationships.',
    description: [
      'MentoraLoop is a mentoring platform designed to bring learners and experienced mentors together in one place. It offers a focused online experience for people looking for guidance as they work toward their learning and career goals.',
      'The platform makes mentorship feel approachable and organized, giving learners a dedicated place to explore guidance and take the next step in their personal development.',
    ],
    demoUrl: 'https://mentoraloop-platform.vercel.app/',
  },
  {
    slug: 'edutech',
    category: 'Education',
    tone: 2,
    images: getProjectImages('02-edutech'),
    name: 'EduPak',
    summary: 'An EdTech experience built to make digital learning and educational resources easy to explore online.',
    description: [
      'EduPak is an education technology platform that brings digital learning into an accessible online experience. It is designed to help learners discover educational content and continue their learning journey from one place.',
      'With a clear, learner-focused interface, EduPak presents education as an engaging experience that can be accessed whenever users are ready to study.',
    ],
    demoUrl: 'https://edutech-platform-tech.vercel.app/',
  },
  {
    slug: 'chatgenie',
    category: 'Communication',
    tone: 3,
    images: getProjectImages('03-chatgenie'),
    name: 'ChatGenie',
    summary: 'A conversational chat app with a straightforward interface for asking questions and getting helpful responses.',
    description: [
      'ChatGenie is a web-based chat experience centered around natural, simple conversations. Its interface gives users a direct way to ask questions and interact with a conversational assistant.',
      'The project focuses on keeping the chat experience clear and easy to use, so users can spend less time navigating and more time getting value from each conversation.',
    ],
    demoUrl: 'https://chatgenie-web-platform.vercel.app/',
  },
  {
    slug: 'project-management-tool',
    category: 'Productivity',
    tone: 2,
    images: getProjectImages('04-project-tool'),
    name: 'Project Management Tool',
    summary: 'A productivity app for organizing projects and keeping tasks and ongoing work in one place.',
    description: [
      'Project Management Tool is a web app designed to help users keep projects and day-to-day work organized. It brings project planning into one dedicated workspace, making it easier to keep track of what needs attention.',
      'The interface is built around a practical workflow: users can focus on their projects, follow progress, and maintain a clearer view of their work.',
    ],
    demoUrl: 'https://project-mangement-tool-tech.vercel.app/',
  },
  {
    slug: 'personal-finance-tracker',
    category: 'Finance',
    tone: 1,
    images: getProjectImages('05-finance-tracker'),
    name: 'Personal Finance & Expense Tracker',
    summary: 'A personal finance app for recording expenses, monitoring finances, and viewing helpful analytics.',
    description: [
      'Personal Finance & Expense Tracker helps users keep a closer eye on their money by bringing personal finance tracking and expense analytics into one app. It is designed to make everyday financial activity easier to review.',
      'By presenting spending information in a dedicated dashboard experience, the project helps users understand their finances and make more informed decisions about their budgets.',
    ],
    demoUrl: 'https://personal-finance-and-expense-tracker.vercel.app/login',
  },
];
